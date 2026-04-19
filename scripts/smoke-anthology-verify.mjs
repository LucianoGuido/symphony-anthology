import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(rootDir, 'packages/anthology-verify/bin/anthology-verify.mjs');
const goodFixture = path.join(rootDir, 'packages/anthology-verify/fixtures/good.html');
const badFixture = path.join(rootDir, 'packages/anthology-verify/fixtures/bad.html');

const goodResult = await execFileAsync(process.execPath, [cliPath, goodFixture], {
  cwd: rootDir,
});

assert.match(goodResult.stdout, /no issues/i);

let badFailed = false;

try {
  await execFileAsync(process.execPath, [cliPath, badFixture, '--strict', '--format', 'json'], {
    cwd: rootDir,
  });
} catch (error) {
  badFailed = true;
  const report = JSON.parse(error.stdout);
  const codes = new Set(report.findings.map((finding) => finding.code));
  assert.ok(codes.has('form-control-unlabeled'));
  assert.ok(codes.has('image-alt-missing'));
  assert.ok(codes.has('button-type-missing'));
}

assert.ok(badFailed, 'Bad fixture should fail verification.');

console.log('anthology-verify smoke test passed.');
