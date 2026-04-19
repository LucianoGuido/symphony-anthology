import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const canonicalSource = 'metadata/anthology-metadata.json';

const outputs = [
  {
    key: 'tokens',
    targets: [
      'dist/tokens.json',
      'packages/anthology-schema/dist/tokens.json',
      'packages/anthology-mcp/dist/tokens.json',
    ],
  },
  {
    key: 'schema',
    targets: [
      'docs/symphony-schema.json',
      'packages/anthology-schema/dist/schema.json',
      'packages/anthology-mcp/dist/schema.json',
    ],
  },
  {
    key: 'schemaPresets',
    targets: [
      'docs/schema-presets.json',
      'packages/anthology-schema/dist/schema-presets.json',
      'packages/anthology-mcp/dist/schema-presets.json',
    ],
  },
];
const recipeSourceDir = path.resolve(rootDir, 'docs/recipes');
const recipeTargetDir = path.resolve(rootDir, 'packages/anthology-mcp/recipes');

const sourcePath = path.resolve(rootDir, canonicalSource);

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing metadata source: ${canonicalSource}`);
}

const canonical = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

for (const output of outputs) {
  const value = canonical?.outputs?.[output.key];

  if (!value) {
    throw new Error(`Missing metadata output in canonical source: ${output.key}`);
  }

  const contents = `${JSON.stringify(value, null, 2)}\n`;

  for (const target of output.targets) {
    const targetPath = path.resolve(rootDir, target);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, contents);
  }
}

if (fs.existsSync(recipeSourceDir)) {
  fs.rmSync(recipeTargetDir, { recursive: true, force: true });
  fs.mkdirSync(recipeTargetDir, { recursive: true });

  for (const entry of fs.readdirSync(recipeSourceDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue;
    }

    const sourcePath = path.join(recipeSourceDir, entry.name);
    const targetPath = path.join(recipeTargetDir, entry.name);
    fs.copyFileSync(sourcePath, targetPath);
  }
}

console.log('Built AI metadata artifacts and synced MCP recipes.');
