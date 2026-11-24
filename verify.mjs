#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const repoDir = '/root/neon-status-entry';
const outputDir = '/output';

function runOnce() {
  execSync('npx tsx main.ts', { cwd: repoDir, stdio: 'pipe' });
  return readFileSync(join(outputDir, 'entry.txt'));
}

const run1 = runOnce();
const run2 = runOnce();

if (run1.equals(run2)) {
  console.log('✓ Deterministic: two runs produce byte-identical output');
  console.log(`Output (${run1.length} bytes): ${run1.toString('utf-8')}`);
  process.exit(0);
} else {
  console.error('✗ Non-deterministic: runs differ');
  console.error(`Run 1 (${run1.length} bytes): ${run1.toString('utf-8')}`);
  console.error(`Run 2 (${run2.length} bytes): ${run2.toString('utf-8')}`);
  process.exit(1);
}