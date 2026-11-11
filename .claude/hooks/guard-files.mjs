#!/usr/bin/env node
// PreToolUse (Edit/Write): skyddar filer som inte ska redigeras för hand.
import { readFileSync } from 'node:fs';
import { basename, relative, resolve } from 'node:path';

let filePath = '';
try {
  filePath = JSON.parse(readFileSync(0, 'utf8')).tool_input?.file_path ?? '';
} catch {
  process.exit(0);
}
if (!filePath) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const rel = relative(root, resolve(root, filePath));

if (rel === 'config/settings_data.json') {
  console.error(
    'Blockerat: config/settings_data.json ägs av theme editor (AGENTS.md). ' +
      'Ändra i theme editor och hämta med `shopify theme pull`, eller lägg nya inställningar i config/settings_schema.json.',
  );
  process.exit(2);
}

if (/^\.env(\..+)?$/.test(basename(rel))) {
  console.error('Blockerat: .env-filer innehåller hemligheter och redigeras inte av agenter.');
  process.exit(2);
}
