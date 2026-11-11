# CLAUDE.md

Projektregler, konventioner och branch-strategi finns i AGENTS.md — en källa för alla agenter:

@AGENTS.md

## Claude-specifikt

- **Läs först:** `HANDOFF.md` (var förra sessionen slutade) och `DESIGN.md` (färg, typografi, form).
- **Klart betyder verifierat:** `scripts/verify.sh` ska vara grön. Stop-hooken kör den automatiskt när temafiler ändrats.
- **Uppdatera `HANDOFF.md`** innan du avslutar en session där något ändrats.
- **Shopify-fakta slås upp, gissas inte:** använd MCP-servern `shopify-dev` (`.mcp.json`) för Liquid-objekt, filter och schema.

## Projekt-skills (`.claude/skills/`)

| Skill | När |
|---|---|
| `theme-verify` | Köra och tolka kontrollerna |
| `new-block` | Nytt block eller ny sektion enligt Horizon-modellen |
| `visual-review` | Skärmdumpar i tre bredder före PR |
| `prod-release` | Produktionssläpp — startas bara av en människa (`/prod-release`) |

## Skydd (`.claude/settings.json` + `.claude/hooks/`)

Hooks blockerar: kommandon mot live-storen, `--live`/`--allow-live`, force-push, push till `main`/`prod`, manuella ändringar i `config/settings_data.json`. Blir du blockerad — försök inte kringgå det, förklara vad som behövs och låt en människa avgöra.
