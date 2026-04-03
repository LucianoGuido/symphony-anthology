import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const requiredFiles = [
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
];

for (const relativeFile of requiredFiles) {
  const absoluteFile = path.resolve(rootDir, relativeFile);

  if (!fs.existsSync(absoluteFile)) {
    throw new Error(`Required artifact is missing: ${relativeFile}`);
  }
}

const cssFiles = requiredFiles.filter((file) => file.endsWith('.css'));

for (const relativeFile of cssFiles) {
  const contents = fs.readFileSync(path.resolve(rootDir, relativeFile), 'utf8');

  if (/@import\s+['"]\.\.?\//.test(contents) || /@import\s+url\(['"]\.\.?\//.test(contents)) {
    throw new Error(`Relative CSS imports leaked into build artifact: ${relativeFile}`);
  }
}

console.log('Verified dist artifacts and CSS import resolution.');
