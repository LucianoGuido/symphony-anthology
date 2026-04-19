import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(rootDir, 'packages/anthology-mcp/bin/anthology-mcp.mjs');
const goodFixture = path.join(rootDir, 'packages/anthology-verify/fixtures/good.html');
const badFixture = path.join(rootDir, 'packages/anthology-verify/fixtures/bad.html');

function createProtocolClient(childProcess) {
  let buffer = Buffer.alloc(0);
  let nextId = 1;
  const pending = new Map();

  childProcess.stdout.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);

    while (true) {
      const headerEnd = buffer.indexOf('\r\n\r\n');

      if (headerEnd === -1) {
        return;
      }

      const header = buffer.slice(0, headerEnd).toString('utf8');
      const lengthMatch = header.match(/Content-Length:\s*(\d+)/i);

      if (!lengthMatch) {
        throw new Error(`MCP response missing Content-Length header: ${header}`);
      }

      const contentLength = Number(lengthMatch[1]);
      const messageEnd = headerEnd + 4 + contentLength;

      if (buffer.length < messageEnd) {
        return;
      }

      const body = buffer.slice(headerEnd + 4, messageEnd).toString('utf8');
      buffer = buffer.slice(messageEnd);

      const message = JSON.parse(body);

      if (!Object.hasOwn(message, 'id')) {
        continue;
      }

      const pendingRequest = pending.get(message.id);

      if (!pendingRequest) {
        continue;
      }

      pending.delete(message.id);

      if (message.error) {
        pendingRequest.reject(new Error(message.error.message));
        continue;
      }

      pendingRequest.resolve(message.result);
    }
  });

  childProcess.stderr.on('data', (chunk) => {
    const stderr = chunk.toString('utf8').trim();

    if (stderr) {
      process.stderr.write(`${stderr}\n`);
    }
  });

  function writeMessage(message) {
    const body = JSON.stringify(message);
    childProcess.stdin.write(`Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n${body}`);
  }

  function request(method, params) {
    const id = nextId;
    nextId += 1;

    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      writeMessage({
        jsonrpc: '2.0',
        id,
        method,
        params,
      });
    });
  }

  function notify(method, params) {
    writeMessage({
      jsonrpc: '2.0',
      method,
      params,
    });
  }

  return {
    notify,
    request,
  };
}

const child = spawn(process.execPath, [cliPath], {
  cwd: rootDir,
  stdio: ['pipe', 'pipe', 'pipe'],
});

const client = createProtocolClient(child);

try {
  const initializeResult = await client.request('initialize', {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: {
      name: 'anthology-mcp-smoke',
      version: '0.1.0',
    },
  });

  assert.ok(initializeResult.serverInfo?.name === 'anthology-mcp');
  assert.ok(initializeResult.capabilities?.tools);
  assert.ok(initializeResult.capabilities?.resources);

  client.notify('notifications/initialized', {});

  const toolsResult = await client.request('tools/list', {});
  const toolNames = new Set(toolsResult.tools.map((tool) => tool.name));

  assert.ok(toolNames.has('anthology_get_tokens'));
  assert.ok(toolNames.has('anthology_verify_path'));
  assert.ok(toolNames.has('anthology_suggest_fix'));

  const resourcesResult = await client.request('resources/list', {});
  const resourceUris = new Set(resourcesResult.resources.map((resource) => resource.uri));

  assert.ok(resourceUris.has('anthology://tokens'));
  assert.ok(resourceUris.has('anthology://schema'));
  assert.ok(resourceUris.has('anthology://recipes'));
  assert.ok(resourceUris.has('anthology://recipes/hero-cta'));

  const tokensResource = await client.request('resources/read', {
    uri: 'anthology://tokens',
  });

  assert.ok(tokensResource.contents[0]?.text.includes('"typography"'));
  assert.ok(tokensResource.contents[0]?.text.includes('"body"'));

  const recipeResult = await client.request('tools/call', {
    name: 'anthology_list_recipes',
    arguments: {
      query: 'hero',
    },
  });

  assert.ok(recipeResult.structuredContent.total >= 1);
  assert.ok(recipeResult.structuredContent.recipes.some((recipe) => recipe.slug === 'hero-cta'));

  const goodVerifyResult = await client.request('tools/call', {
    name: 'anthology_verify_path',
    arguments: {
      path: goodFixture,
    },
  });

  assert.equal(goodVerifyResult.structuredContent.counts.errors, 0);

  const badVerifyResult = await client.request('tools/call', {
    name: 'anthology_verify_path',
    arguments: {
      path: badFixture,
      strict: true,
    },
  });

  assert.ok(badVerifyResult.structuredContent.counts.errors > 0);
  assert.equal(badVerifyResult.structuredContent.wouldFail, true);

  const fixResult = await client.request('tools/call', {
    name: 'anthology_suggest_fix',
    arguments: {
      findingCode: 'action-group-no-primary',
    },
  });

  assert.equal(fixResult.structuredContent.findingCode, 'action-group-no-primary');
  assert.ok(fixResult.structuredContent.relevantRecipes.some((recipe) => recipe.slug === 'hero-cta'));

  await assert.rejects(
    client.request('tools/call', {
      name: 'anthology_verify_path',
      arguments: {
        path: '../outside-project.html',
      },
    }),
    /only supports files inside the current project/,
  );

  console.log('anthology-mcp smoke test passed.');
} finally {
  child.kill();
}
