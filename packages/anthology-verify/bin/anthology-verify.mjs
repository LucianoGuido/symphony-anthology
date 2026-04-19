#!/usr/bin/env node

import { formatJsonReport, formatTextReport } from '../lib/reporters.mjs';
import { verifyPath } from '../lib/verify-path.mjs';

function printHelp() {
  console.log(`Usage: anthology-verify <path> [--format text|json] [--strict]

Examples:
  anthology-verify ./index.html
  anthology-verify ./docs --strict
  anthology-verify ./index.html --format json
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  let format = 'text';
  let strict = false;
  const positionals = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === '--strict') {
      strict = true;
      continue;
    }

    if (argument === '--format') {
      format = args[index + 1] ?? format;
      index += 1;
      continue;
    }

    if (argument.startsWith('--format=')) {
      format = argument.slice('--format='.length);
      continue;
    }

    positionals.push(argument);
  }

  const targetPath = positionals[0] ?? '.';
  const result = await verifyPath(targetPath);
  const errorCount = result.findings.filter((finding) => finding.severity === 'error').length;
  const warningCount = result.findings.filter((finding) => finding.severity === 'warning').length;

  if (format === 'json') {
    console.log(formatJsonReport(result));
  } else {
    console.log(formatTextReport(result));
  }

  if (errorCount > 0 || (strict && warningCount > 0)) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
