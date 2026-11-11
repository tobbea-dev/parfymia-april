#!/usr/bin/env node
// Helsidesbilder i tre bredder. Kräver Playwright (förinstallerat i Claude Code
// i molnet; lokalt: npx playwright install chromium).
//   node screenshot.mjs <bas-url> [sökväg ...]
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const [base, ...paths] = process.argv.slice(2);
if (!base) {
  console.error('Användning: node screenshot.mjs <preview-url> [/sökväg ...]');
  process.exit(1);
}
if (/(^|\/\/)(www\.)?parfymia\.com/i.test(base)) {
  console.error('Granska mot dev-storen eller lokal preview, inte live-storen.');
  process.exit(1);
}

const { chromium } = createRequire(import.meta.url)('playwright');
const WIDTHS = { mobil: 390, surfplatta: 768, desktop: 1280 };
const outDir = '.cache/visual-review';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const path of paths.length ? paths : ['/']) {
  const url = new URL(path, base).href;
  const slug = path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'start';
  for (const [name, width] of Object.entries(WIDTHS)) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
    const file = `${outDir}/${slug}-${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${file}  (${name}, HTTP ${response?.status() ?? '?'}, ${page.url()})`);
    await page.close();
  }
}
await browser.close();
