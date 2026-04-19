#!/usr/bin/env node

import path from 'node:path';

import { createProject } from '../lib/create-project.mjs';
import { listTemplateNames } from '../lib/templates.mjs';

function printHelp() {
  console.log(`Usage: create-symphony-anthology <project-directory> [--template html|astro|next] [--force]

Templates:
  ${listTemplateNames().join(', ')}
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  let templateName = 'html';
  let force = false;
  const positionals = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === '--force') {
      force = true;
      continue;
    }

    if (argument === '--template') {
      templateName = args[index + 1] ?? templateName;
      index += 1;
      continue;
    }

    if (argument.startsWith('--template=')) {
      templateName = argument.slice('--template='.length);
      continue;
    }

    positionals.push(argument);
  }

  const targetDirectory = positionals[0];

  if (!targetDirectory) {
    printHelp();
    process.exit(1);
  }

  const result = await createProject({
    targetDirectory,
    templateName,
    force,
  });

  const relativeTarget = path.relative(process.cwd(), result.targetDirectory) || '.';

  console.log(`Created ${result.template.label} starter in ${relativeTarget}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${relativeTarget}`);

  for (const step of result.template.nextSteps) {
    console.log(`  ${step}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
