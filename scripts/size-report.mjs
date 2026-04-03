import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const files = [
  'dist/symphony.min.css',
  'dist/symphony.core.min.css',
  'dist/symphony.compat.min.css',
  'dist/themes/anthology/anthology.min.css',
];

for (const relativeFile of files) {
  const absoluteFile = path.resolve(rootDir, relativeFile);
  const contents = fs.readFileSync(absoluteFile);
  const gzip = zlib.gzipSync(contents, { level: 9 });

  console.log(`${relativeFile}`);
  console.log(`  bytes: ${contents.length}`);
  console.log(`  gzip: ${gzip.length}`);
}
