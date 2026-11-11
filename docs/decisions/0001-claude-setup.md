# 0001 — Agent-setup för Claude Code

Datum: 2026-11-11

## Bakgrund

Repot hade `AGENTS.md` och `README.md` men inget som verkställde reglerna. Arbete sker från flera ingångar (terminal, webb, mobil, PR), ofta i molncontainrar som inte har något minne mellan sessioner.

## Beslut

1. **En regelkälla.** `AGENTS.md` är sanningen; `CLAUDE.md` importerar den och lägger bara till Claude-specifikt.
2. **Regler som kan verkställas ska verkställas av kod, inte av text.** Hooks i `.claude/hooks/` blockerar live-storen, force-push, push till `main`/`prod` och ändringar i `config/settings_data.json`.
3. **Ett verifieringskommando.** `scripts/verify.sh` körs av människor, av Stop-hooken och av CI — samma kontroll överallt.
4. **theme-check: fel fäller, varningar inte.** Horizon-baslinjen har 28 varningar i orörd kod. Att rätta dem alla skulle ge diff mot upstream och försvåra uppgraderingar.
5. **Inga beroenden i repot.** Skripten är ren Node/bash utan `package.json`. Shopify CLI installeras globalt (SessionStart-hook i molnet, manuellt lokalt). Temat förblir build-fritt.
6. **Minne ligger i git.** `HANDOFF.md`, `DESIGN.md` och `docs/` ersätter lokalt agentminne.
7. **Produktion är manuell.** Skillen `prod-release` kan bara startas av en människa och låter människan köra allt mot live-storen.
8. **Få, projektspecifika skills.** Generell Liquid- och Shopify-kunskap kommer från plugins och MCP-servern `shopify-dev`; repot innehåller bara det som är unikt för Parfymia.

## Medvetet utelämnat

- Andra AI-granskare (Codex/Gemini CLI) — kan läggas till som CI-steg senare.
- Vercel/Cloudflare, video-, ljud- och bild-API:er — inte relevant för ett Shopify-tema.
- `@claude` i PR:er, auto-deploy till dev-storen, Lighthouse CI — kräver secrets som bara repo-ägaren kan lägga in (se `HANDOFF.md`).

## Konsekvenser

- En agent som blockeras av en hook ska stanna och förklara, inte gå runt.
- Nya strängar utan svensk översättning fäller CI.
- Ändras theme-inställningar i editorn ska `DESIGN.md` uppdateras.
