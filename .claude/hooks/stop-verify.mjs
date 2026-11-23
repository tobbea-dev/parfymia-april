#!/usr/bin/env node
// Stop: "klart" gäller först när scripts/verify.sh är grön.
// Körs bara om temafiler har ändrats jämfört med main.
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

let input = {};
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  // Ingen input — kör ändå.
}
// Claude har redan fått felet en gång den här vändan; blockera inte i en loop.
if (input.stop_hook_active) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const git = (...args) => spawnSync('git', args, { cwd: root, encoding: 'utf8' }).stdout ?? '';

const changed = [
  ...git('status', '--porcelain').split('\n').map((line) => line.slice(3)),
  ...git('diff', '--name-only', 'origin/main...HEAD').split('\n'),
].filter(Boolean);

const RELEVANT = /^(assets|blocks|config|layout|locales|sections|snippets|templates|scripts)\/|^\.theme-check\.yml$/;
if (!changed.some((file) => RELEVANT.test(file))) process.exit(0);

const result = spawnSync('bash', ['scripts/verify.sh'], { cwd: root, encoding: 'utf8' });
if (result.status !== 0) {
  const output = `${result.stdout}\n${result.stderr}`.trim().split('\n').slice(-60).join('\n');
  console.error(`scripts/verify.sh misslyckades — rätta innan du avslutar:\n${output}`);
  process.exit(2);
}
