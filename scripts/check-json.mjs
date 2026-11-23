#!/usr/bin/env node
// Kontrollerar att temats JSON-filer går att tolka.
// Användning: node scripts/check-json.mjs [fil ...]   (utan argument: hela temat)
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { readJsonc } from './lib/jsonc.mjs';

const DIRS = ['config', 'locales', 'templates', 'sections'];

function allFiles() {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.json')) files.push(path);
    }
  };
  for (const dir of DIRS) if (existsSync(dir)) walk(dir);
  return files;
}

const files = process.argv.length > 2 ? process.argv.slice(2) : allFiles();
let failed = 0;

for (const file of files) {
  try {
    readJsonc(file);
  } catch (error) {
    failed++;
    console.error(`✗ ${file}: ${error.message}`);
  }
}

if (failed) {
  console.error(`\n${failed} JSON-fil(er) går inte att tolka.`);
  process.exit(1);
}
console.log(`✓ JSON: ${files.length} fil(er) OK`);
