import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getTemplate, listTemplateNames } from './templates.mjs';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(moduleDir, '..');
const repoRoot = path.resolve(packageDir, '..', '..');
const templatesRoot = path.join(packageDir, 'templates');

const textFileExtensions = new Set([
  '.astro',
  '.css',
  '.gitignore',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.txt',
]);

function replacePlaceholders(content, projectName) {
  return content.replaceAll('{{PROJECT_NAME}}', projectName);
}

async function directoryHasFiles(directory) {
  try {
    const entries = await fs.readdir(directory);
    return entries.length > 0;
  } catch {
    return false;
  }
}

async function copyTemplateDirectory(sourceDir, targetDir, projectName) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyTemplateDirectory(sourcePath, targetPath, projectName);
      continue;
    }

    const extension = path.extname(entry.name);

    if (textFileExtensions.has(extension) || entry.name === '.gitignore') {
      const content = await fs.readFile(sourcePath, 'utf8');
      await fs.writeFile(targetPath, replacePlaceholders(content, projectName), 'utf8');
      continue;
    }

    await fs.copyFile(sourcePath, targetPath);
  }
}

async function copyTemplateAssets(template, targetDir) {
  for (const asset of template.assetCopies) {
    const sourcePath = path.join(repoRoot, asset.source);
    const destinationPath = path.join(targetDir, asset.destination);
    await fs.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.copyFile(sourcePath, destinationPath);
  }
}

export async function createProject({ targetDirectory, templateName, force = false }) {
  const template = getTemplate(templateName);

  if (!template) {
    throw new Error(`Unknown template "${templateName}". Available: ${listTemplateNames().join(', ')}`);
  }

  const resolvedTarget = path.resolve(process.cwd(), targetDirectory);
  const projectName = path.basename(resolvedTarget);

  if (await directoryHasFiles(resolvedTarget)) {
    if (!force) {
      throw new Error(`Target directory is not empty: ${resolvedTarget}`);
    }

    await fs.rm(resolvedTarget, { recursive: true, force: true });
  }

  const templateSource = path.join(templatesRoot, template.directory);
  await copyTemplateDirectory(templateSource, resolvedTarget, projectName);
  await copyTemplateAssets(template, resolvedTarget);

  return {
    projectName,
    targetDirectory: resolvedTarget,
    template,
  };
}
