import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npmCache = path.join(os.tmpdir(), 'symphony-anthology-release-dry-run-cache');

const packageDirectories = [
  '.',
  'packages/create-symphony-anthology',
  'packages/anthology-schema',
  'packages/anthology-verify',
  'packages/anthology-mcp',
];

for (const packageDirectory of packageDirectories) {
  const cwd = path.join(rootDir, packageDirectory);
  const result = spawnSync('npm', ['publish', '--dry-run'], {
    cwd,
    env: {
      ...process.env,
      npm_config_cache: npmCache,
    },
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    throw new Error(`npm publish --dry-run failed for ${packageDirectory}\n${result.stderr || result.stdout}`);
  }
}

console.log('release dry-run smoke test passed.');
