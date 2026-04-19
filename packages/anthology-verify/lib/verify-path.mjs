import fs from 'node:fs/promises';
import path from 'node:path';

import { parseHtmlDocument } from './html-model.mjs';
import { runChecks } from './checks.mjs';

const supportedExtensions = new Set(['.html', '.htm', '.astro']);

async function collectFiles(targetPath) {
  const stat = await fs.stat(targetPath);

  if (stat.isFile()) {
    return supportedExtensions.has(path.extname(targetPath).toLowerCase()) ? [targetPath] : [];
  }

  const entries = await fs.readdir(targetPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files.sort();
}

export async function verifyPath(targetPath) {
  const absoluteTarget = path.resolve(process.cwd(), targetPath);
  const files = await collectFiles(absoluteTarget);
  const findings = [];

  for (const filePath of files) {
    const source = await fs.readFile(filePath, 'utf8');
    const model = parseHtmlDocument(source);
    findings.push(...runChecks(filePath, model));
  }

  return {
    targetPath: absoluteTarget,
    files,
    findings,
  };
}
