import path from 'node:path';

export function formatTextReport(result) {
  if (result.findings.length === 0) {
    return `Symphony verify found no issues in ${result.files.length} file(s).`;
  }

  const lines = [];
  const grouped = new Map();

  for (const finding of result.findings) {
    const relativePath = path.relative(process.cwd(), finding.filePath) || finding.filePath;

    if (!grouped.has(relativePath)) {
      grouped.set(relativePath, []);
    }

    grouped.get(relativePath).push(finding);
  }

  lines.push(`Symphony verify found ${result.findings.length} issue(s) across ${grouped.size} file(s).`);
  lines.push('');

  for (const [filePath, findings] of grouped) {
    lines.push(filePath);

    for (const finding of findings) {
      lines.push(
        `  ${finding.severity} [${finding.code}] ${finding.line}:${finding.column} ${finding.message}`,
      );
    }

    lines.push('');
  }

  return lines.join('\n').trimEnd();
}

export function formatJsonReport(result) {
  return JSON.stringify(result, null, 2);
}
