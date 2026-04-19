import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npmCache = path.join(os.tmpdir(), 'symphony-anthology-subpackages-npm-cache');

const packageChecks = [
  {
    directory: 'packages/create-symphony-anthology',
    expectedFiles: [
      'package.json',
      'README.md',
      'bin/create-symphony-anthology.mjs',
      'lib/create-project.mjs',
      'lib/templates.mjs',
      'templates/html/index.html',
      'templates/astro/package.json',
      'templates/next/package.json',
    ],
  },
  {
    directory: 'packages/anthology-schema',
    expectedFiles: [
      'package.json',
      'README.md',
      'dist/schema.json',
      'dist/schema-presets.json',
      'dist/tokens.json',
    ],
  },
  {
    directory: 'packages/anthology-verify',
    expectedFiles: [
      'package.json',
      'README.md',
      'bin/anthology-verify.mjs',
      'lib/checks.mjs',
      'lib/html-model.mjs',
      'lib/reporters.mjs',
      'lib/verify-path.mjs',
    ],
  },
  {
    directory: 'packages/anthology-mcp',
    expectedFiles: [
      'package.json',
      'README.md',
      'bin/anthology-mcp.mjs',
      'lib/catalog.mjs',
      'lib/fix-guides.mjs',
      'lib/server.mjs',
      'dist/tokens.json',
      'dist/schema.json',
      'dist/schema-presets.json',
      'recipes/hero-cta.md',
      'recipes/conservatory-finding-to-fix.md',
    ],
  },
];

for (const packageCheck of packageChecks) {
  const cwd = path.join(rootDir, packageCheck.directory);
  const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
    cwd,
    env: {
      ...process.env,
      npm_config_cache: npmCache,
    },
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    throw new Error(`npm pack --dry-run failed for ${packageCheck.directory}\n${result.stderr || result.stdout}`);
  }

  const report = JSON.parse(result.stdout);
  const fileSet = new Set(report[0]?.files?.map((entry) => entry.path));

  for (const expectedFile of packageCheck.expectedFiles) {
    assert.ok(fileSet.has(expectedFile), `${packageCheck.directory} is missing ${expectedFile} in npm pack output`);
  }
}

console.log('publishable package smoke test passed.');
