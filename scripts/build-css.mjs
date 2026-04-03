import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const builds = [
  {
    input: 'src/symphony.css',
    output: 'dist/symphony.css',
    minified: 'dist/symphony.min.css',
  },
  {
    input: 'src/symphony.core.css',
    output: 'dist/symphony.core.css',
    minified: 'dist/symphony.core.min.css',
  },
  {
    input: 'src/compat/legacy.css',
    output: 'dist/symphony.compat.css',
    minified: 'dist/symphony.compat.min.css',
  },
  {
    input: 'src/themes/anthology/theme.css',
    output: 'dist/themes/anthology/anthology.css',
    minified: 'dist/themes/anthology/anthology.min.css',
  },
];

const importPattern = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?\s*;/g;

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

function bundleCss(filePath, stack = []) {
  const absolutePath = path.resolve(rootDir, filePath);

  if (stack.includes(absolutePath)) {
    throw new Error(`Circular CSS import detected: ${[...stack, absolutePath].join(' -> ')}`);
  }

  const source = read(absolutePath);
  const nextStack = [...stack, absolutePath];

  return source.replace(importPattern, (statement, request) => {
    if (
      request.startsWith('http://') ||
      request.startsWith('https://') ||
      request.startsWith('data:')
    ) {
      return statement;
    }

    const importedPath = path.resolve(path.dirname(absolutePath), request);

    if (!fs.existsSync(importedPath)) {
      throw new Error(`Missing CSS import "${request}" from ${path.relative(rootDir, absolutePath)}`);
    }

    const relativeLabel = path.relative(rootDir, importedPath);
    const bundledImport = bundleCss(path.relative(rootDir, importedPath), nextStack);

    return `/* Begin ${relativeLabel} */\n${bundledImport}\n/* End ${relativeLabel} */`;
  });
}

function minifyCss(css) {
  let output = '';
  let inComment = false;
  let stringQuote = null;

  for (let index = 0; index < css.length; index += 1) {
    const current = css[index];
    const next = css[index + 1];

    if (inComment) {
      if (current === '*' && next === '/') {
        inComment = false;
        index += 1;
      }
      continue;
    }

    if (!stringQuote && current === '/' && next === '*') {
      inComment = true;
      index += 1;
      continue;
    }

    if (stringQuote) {
      output += current;

      if (current === stringQuote && css[index - 1] !== '\\') {
        stringQuote = null;
      }
      continue;
    }

    if (current === '"' || current === "'") {
      stringQuote = current;
      output += current;
      continue;
    }

    output += current;
  }

  return output
    .replace(/\n+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
    .concat('\n');
}

function writeOutput(outputPath, contents) {
  const absoluteOutput = path.resolve(rootDir, outputPath);
  fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });
  fs.writeFileSync(absoluteOutput, contents);
}

for (const build of builds) {
  const bundled = bundleCss(build.input);
  writeOutput(build.output, bundled);
  writeOutput(build.minified, minifyCss(bundled));
}

console.log('Built CSS artifacts:');
for (const build of builds) {
  console.log(`- ${build.output}`);
  console.log(`- ${build.minified}`);
}
