import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const assets = [
  {
    source: 'metadata/tokens.json',
    targets: ['dist/tokens.json'],
  },
  {
    source: 'metadata/symphony-schema.json',
    targets: ['docs/symphony-schema.json'],
  },
  {
    source: 'metadata/schema-presets.json',
    targets: ['docs/schema-presets.json'],
  },
];

for (const asset of assets) {
  const sourcePath = path.resolve(rootDir, asset.source);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing metadata source: ${asset.source}`);
  }

  const contents = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');

  for (const target of asset.targets) {
    const targetPath = path.resolve(rootDir, target);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, contents);
  }
}

console.log('Built AI metadata artifacts.');
