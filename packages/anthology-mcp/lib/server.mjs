import { callTool, listResources, listTools, readResource } from './catalog.mjs';

const DEFAULT_PROTOCOL_VERSION = '2025-03-26';

function writeMessage(output, message) {
  const body = JSON.stringify(message);
  output.write(`Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n${body}`);
}

function createError(id, code, message, data) {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
      ...(data === undefined ? {} : { data }),
    },
  };
}

async function handleRequest(message) {
  switch (message.method) {
    case 'initialize':
      return {
        protocolVersion: message.params?.protocolVersion ?? DEFAULT_PROTOCOL_VERSION,
        capabilities: {
          tools: {
            listChanged: false,
          },
          resources: {
            listChanged: false,
            subscribe: false,
          },
        },
        serverInfo: {
          name: 'anthology-mcp',
          version: '0.1.0',
        },
      };
    case 'ping':
      return {};
    case 'tools/list':
      return {
        tools: listTools(),
      };
    case 'tools/call':
      return callTool(message.params?.name, message.params?.arguments);
    case 'resources/list':
      return {
        resources: await listResources(),
      };
    case 'resources/read':
      return readResource(message.params?.uri);
    case 'prompts/list':
      return {
        prompts: [],
      };
    case 'notifications/initialized':
      return null;
    default:
      throw Object.assign(new Error(`Method not found: ${message.method}`), {
        code: -32601,
      });
  }
}

export function startServer({
  input = process.stdin,
  output = process.stdout,
  error = process.stderr,
} = {}) {
  let buffer = Buffer.alloc(0);

  // MCP uses Content-Length framing like JSON-RPC over stdio.
  input.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)]);

    while (true) {
      const headerEnd = buffer.indexOf('\r\n\r\n');

      if (headerEnd === -1) {
        return;
      }

      const header = buffer.slice(0, headerEnd).toString('utf8');
      const contentLengthMatch = header.match(/Content-Length:\s*(\d+)/i);

      if (!contentLengthMatch) {
        error.write(`anthology-mcp: missing Content-Length header\n`);
        buffer = Buffer.alloc(0);
        return;
      }

      const contentLength = Number(contentLengthMatch[1]);
      const messageEnd = headerEnd + 4 + contentLength;

      if (buffer.length < messageEnd) {
        return;
      }

      const body = buffer.slice(headerEnd + 4, messageEnd).toString('utf8');
      buffer = buffer.slice(messageEnd);

      let message;

      try {
        message = JSON.parse(body);
      } catch (parseError) {
        writeMessage(output, createError(null, -32700, 'Parse error', parseError.message));
        continue;
      }

      if (!message.method) {
        continue;
      }

      void handleRequest(message)
        .then((result) => {
          if (!Object.hasOwn(message, 'id') || result === null) {
            return;
          }

          writeMessage(output, {
            jsonrpc: '2.0',
            id: message.id,
            result,
          });
        })
        .catch((requestError) => {
          if (!Object.hasOwn(message, 'id')) {
            error.write(`anthology-mcp: ${requestError.message}\n`);
            return;
          }

          writeMessage(
            output,
            createError(
              message.id,
              requestError.code ?? -32000,
              requestError.message,
              requestError.data,
            ),
          );
        });
    }
  });

  input.on('error', (streamError) => {
    error.write(`anthology-mcp: ${streamError.message}\n`);
  });
}
