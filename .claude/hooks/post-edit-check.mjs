#!/usr/bin/env node
// PostToolUse (Edit/Write): snabb kontroll av just den fil som ändrades.
// Exit 2 skickar felet tillbaka till Claude så att det rättas direkt.
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { relative, resolve } from 'node:path';

let filePath = '';
try {
  filePath = JSON.parse(readFileSync(0, 'utf8')).tool_input?.file_path ?? '';
} catch {
  process.exit(0);
}
if (!filePath) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const abs = resolve(root, filePath);
const rel = relative(root, abs);
const THEME_DIRS = /^(assets|blocks|config|layout|locales|sections|snippets|templates)\//;
if (rel.startsWith('..') || !THEME_DIRS.test(rel)) process.exit(0);

const run = (cmd, args) => spawnSync(cmd, args, { cwd: root, encoding: 'utf8' });
const problems = [];

if (rel.endsWith('.json')) {
  const json = run('node', ['scripts/check-json.mjs', rel]);
  if (json.status !== 0) problems.push(json.stderr.trim());

  if (/^locales\/(en\.default|sv)(\.schema)?\.json$/.test(rel)) {
    const locales = run('node', ['scripts/check-locales.mjs']);
    if (locales.status !== 0) problems.push(locales.stderr.trim());
  }
}

if (rel.endsWith('.liquid')) {
  const check = run('shopify', ['theme', 'check', '--output', 'json', '--path', '.']);
  // Saknas Shopify CLI hoppar vi över; Stop-hooken och CI fångar det i stället.
  if (!check.error && check.stdout) {
    try {
      const errors = JSON.parse(check.stdout).issues.filter(
        (issue) => issue.severity === 'error' && resolve(issue.filePath) === abs,
      );
      for (const issue of errors) {
        problems.push(`${rel}:${issue.startRow + 1} [${issue.check}] ${issue.message}`);
      }
    } catch {
      // Oväntat format från CLI:t — låt Stop-hooken avgöra.
    }
  }
}

if (problems.length) {
  console.error(`Kontroll efter ändring av ${rel} misslyckades:\n${problems.join('\n')}`);
  process.exit(2);
}
