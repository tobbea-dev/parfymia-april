// Minimal JSONC-läsare utan beroenden.
// Shopify-teman har /* */-header i templates/config och //-kommentarer i locales.
import { readFileSync } from 'node:fs';

export function stripComments(src) {
  let out = '';
  let i = 0;
  let inString = false;
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (inString) {
      out += c;
      if (c === '\\') {
        out += n ?? '';
        i += 2;
        continue;
      }
      if (c === '"') inString = false;
      i++;
    } else if (c === '"') {
      inString = true;
      out += c;
      i++;
    } else if (c === '/' && n === '/') {
      while (i < src.length && src[i] !== '\n') i++;
    } else if (c === '/' && n === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? src.length : end + 2;
      // Behåll radbrytningar så att radnummer i felmeddelanden stämmer.
      out += src.slice(i, stop).replace(/[^\n]/g, '');
      i = stop;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

export function parseJsonc(src) {
  // Tillåt avslutande kommatecken, vilket Shopify också accepterar.
  return JSON.parse(stripComments(src).replace(/,(\s*[}\]])/g, '$1'));
}

export function readJsonc(path) {
  return parseJsonc(readFileSync(path, 'utf8'));
}
