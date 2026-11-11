#!/usr/bin/env node
// Verkställer regeln i AGENTS.md: alla strängar ska finnas i både
// locales/en.default.json och locales/sv.json (samt *.schema.json).
//
// Kända avvikelser från Horizon-baslinjen ligger i scripts/locale-baseline.json
// och rapporteras inte. Bara NYA avvikelser fäller kontrollen.
//
//   node scripts/check-locales.mjs                  kontrollera
//   node scripts/check-locales.mjs --update-baseline  skriv om baslinjen
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { readJsonc } from './lib/jsonc.mjs';

const PAIRS = [
  ['locales/en.default.json', 'locales/sv.json'],
  ['locales/en.default.schema.json', 'locales/sv.schema.json'],
];
const BASELINE = 'scripts/locale-baseline.json';
// Pluralformer skiljer sig mellan språk och är inga riktiga nycklar.
const PLURALS = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);

function keys(obj, prefix = '', out = new Set()) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object') {
      const children = Object.keys(value);
      if (children.length && children.every((child) => PLURALS.has(child))) {
        out.add(prefix + key);
      } else {
        keys(value, `${prefix}${key}.`, out);
      }
    } else {
      out.add(prefix + key);
    }
  }
  return out;
}

const found = {};
for (const [enPath, svPath] of PAIRS) {
  const en = keys(readJsonc(enPath));
  const sv = keys(readJsonc(svPath));
  found[svPath] = [...en].filter((key) => !sv.has(key)).sort();
  found[enPath] = [...sv].filter((key) => !en.has(key)).sort();
}

if (process.argv.includes('--update-baseline')) {
  writeFileSync(BASELINE, `${JSON.stringify(found, null, 2)}\n`);
  console.log(`Baslinje uppdaterad: ${BASELINE}`);
  process.exit(0);
}

const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {};
let failed = 0;
let known = 0;

for (const [file, missing] of Object.entries(found)) {
  const accepted = new Set(baseline[file] ?? []);
  const fresh = missing.filter((key) => !accepted.has(key));
  known += missing.length - fresh.length;
  if (fresh.length) {
    failed += fresh.length;
    console.error(`✗ ${file} saknar ${fresh.length} nyckel/nycklar:`);
    for (const key of fresh) console.error(`    ${key}`);
  }
}

if (failed) {
  console.error('\nLägg till strängarna i båda språkfilerna (se AGENTS.md → Översättningar).');
  process.exit(1);
}
console.log(`✓ Översättningar: sv och en i synk${known ? ` (${known} kända avvikelser i baslinjen)` : ''}`);
