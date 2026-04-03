import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const npmCache = path.join(os.tmpdir(), 'symphony-anthology-npm-cache');

const pack = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: rootDir,
  env: {
    ...process.env,
    npm_config_cache: npmCache,
  },
  encoding: 'utf8',
});

if (pack.status !== 0) {
  throw new Error(pack.stderr || pack.stdout || 'npm pack --dry-run failed');
}

const report = JSON.parse(pack.stdout);
const fileSet = new Set(report[0]?.files?.map((entry) => entry.path));

const expectedPackageFiles = [
  'dist/symphony.css',
  'dist/symphony.min.css',
  'dist/symphony.core.css',
  'dist/symphony.core.min.css',
  'dist/symphony.compat.css',
  'dist/symphony.compat.min.css',
  'dist/themes/anthology/anthology.css',
  'dist/themes/anthology/anthology.min.css',
  'dist/tokens.json',
  'docs/symphony-schema.json',
  'docs/schema-presets.json',
  'docs/AI_INTEGRATION.md',
  'docs/MIGRATION.md',
  'CONTRIBUTING.md',
];

for (const expectedFile of expectedPackageFiles) {
  if (!fileSet.has(expectedFile)) {
    throw new Error(`Pack smoke test missing expected file: ${expectedFile}`);
  }
}

console.log('npm pack smoke test passed.');
