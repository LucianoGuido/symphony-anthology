import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(rootDir, 'packages/create-symphony-anthology/bin/create-symphony-anthology.mjs');

const expectations = {
  html: ['index.html', 'styles/symphony.core.css', 'README.md'],
  astro: ['package.json', 'src/pages/index.astro', 'src/styles/symphony.core.css'],
  next: ['package.json', 'app/page.jsx', 'app/symphony.core.css'],
};

const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'create-symphony-anthology-'));

try {
  for (const template of Object.keys(expectations)) {
    const projectName = `${template}-starter`;
    const targetDir = path.join(tempRoot, projectName);

    await execFileAsync(process.execPath, [cliPath, targetDir, '--template', template], {
      cwd: rootDir,
    });

    for (const relativeFile of expectations[template]) {
      const absoluteFile = path.join(targetDir, relativeFile);
      await fs.access(absoluteFile);
      const content = await fs.readFile(absoluteFile, 'utf8');
      assert.ok(!content.includes('{{PROJECT_NAME}}'), `${relativeFile} still contains placeholders`);
    }
  }

  console.log('create-symphony-anthology smoke test passed.');
} finally {
  await fs.rm(tempRoot, { recursive: true, force: true });
}
