#!/usr/bin/env node
// PreToolUse (Bash): stoppar kommandon som aldrig ska köras av en agent.
// Exit 2 = blockera; stderr visas för Claude.
import { readFileSync } from 'node:fs';

let command = '';
try {
  command = JSON.parse(readFileSync(0, 'utf8')).tool_input?.command ?? '';
} catch {
  process.exit(0);
}

const LIVE_STORE = /(www\.)?parfymia\.com/i;

const rules = [
  {
    test: (c) => /\bshopify\b/.test(c) && LIVE_STORE.test(c.replace(/dev-parfymia\.myshopify\.com/gi, '')),
    why: 'Kommandot riktar sig mot live-storen (www.parfymia.com). Produktion hanteras av en människa — se skill "prod-release".',
  },
  {
    test: (c) => /\bshopify\s+theme\s+(push|publish|delete)\b[^\n;|&]*--(live|allow-live)\b/.test(c),
    why: '--live/--allow-live skriver över det publicerade temat. Pusha som opublicerat tema i stället (--unpublished --theme="Parfymia WIP").',
  },
  {
    test: (c) => /\bshopify\s+theme\s+publish\b/.test(c),
    why: 'Att publicera ett tema görs av en människa.',
  },
  {
    test: (c) => /\bgit\s+push\b[^\n;|&]*(\s--force(?!-with-lease)\b|\s-[a-zA-Z]*f[a-zA-Z]*(\s|$))/.test(c),
    why: 'Force-push är blockerat. Använd --force-with-lease på din egen feature-branch om det verkligen behövs.',
  },
  {
    test: (c) => /\bgit\s+push\b[^\n;|&]*[\s:+](main|prod)(\s|$)/.test(c),
    why: 'Aldrig push direkt till main eller prod — öppna en PR från en feature-branch (AGENTS.md → Branch-strategi).',
  },
  {
    test: (c) =>
      /\brm\s+(-[a-zA-Z]*\s+)*-[a-zA-Z]*[rR][a-zA-Z]*\b/.test(c) &&
      /\brm\s[^\n;|&]*\s(\/|~|\$HOME|\.\.|\.|\*|\.git)\/?(\s|$)/.test(c),
    why: 'Rekursiv radering av rot, hemkatalog, repo-rot eller .git är blockerad. Ange en specifik undermapp.',
  },
];

for (const rule of rules) {
  if (rule.test(command)) {
    console.error(`Blockerat av .claude/hooks/guard-bash.mjs: ${rule.why}`);
    process.exit(2);
  }
}
