import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const htmlFiles = [
  'index.html',
  'docs/index.html',
  'docs/examples/landing-page.html',
  'docs/examples/ai-first-demo.html',
  'testing/index.html',
  'testing/preview.html',
];

const localReferencePattern = /\b(?:href|src)="([^"]+)"/g;

for (const relativeFile of htmlFiles) {
  const absoluteFile = path.resolve(rootDir, relativeFile);
  const html = fs.readFileSync(absoluteFile, 'utf8');

  let match;
  while ((match = localReferencePattern.exec(html)) !== null) {
    const reference = match[1];

    if (
      reference.startsWith('http://') ||
      reference.startsWith('https://') ||
      reference.startsWith('mailto:') ||
      reference.startsWith('#') ||
      reference.startsWith('data:')
    ) {
      continue;
    }

    const resolved = path.resolve(path.dirname(absoluteFile), reference);

    if (!fs.existsSync(resolved)) {
      throw new Error(`Broken local reference in ${relativeFile}: ${reference}`);
    }
  }
}

console.log('Verified local documentation asset references.');

const homepagePath = path.resolve(rootDir, 'index.html');
const homepage = fs.readFileSync(homepagePath, 'utf8');
const testingFiles = ['testing/index.html', 'testing/preview.html'];

if (/<style[\s>]/i.test(homepage)) {
  throw new Error('index.html must not contain a <style> block');
}

if (/\sstyle=/.test(homepage)) {
  throw new Error('index.html must not contain inline style attributes');
}

const classMatches = [...homepage.matchAll(/\bclass="([^"]+)"/g)];
const allowedClasses = new Set(['container', 'prose']);

for (const match of classMatches) {
  const classes = match[1].split(/\s+/).filter(Boolean);

  for (const className of classes) {
    if (!allowedClasses.has(className)) {
      throw new Error(`index.html uses a non-whitelisted class: ${className}`);
    }
  }
}

console.log('Verified homepage semantic-first restrictions.');

for (const relativeFile of testingFiles) {
  const absoluteFile = path.resolve(rootDir, relativeFile);
  const html = fs.readFileSync(absoluteFile, 'utf8');

  if (/<style[\s>]/i.test(html)) {
    throw new Error(`${relativeFile} must not contain a <style> block`);
  }

  if (/\sstyle=/.test(html)) {
    throw new Error(`${relativeFile} must not contain inline style attributes`);
  }
}

console.log('Verified testing pages avoid inline styles.');
