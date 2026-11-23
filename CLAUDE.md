# CLAUDE.md

Projektregler, konventioner och branch-strategi finns i AGENTS.md — en källa för alla agenter:

@AGENTS.md

## Claude-specifikt

- **Läs först:** `HANDOFF.md` (var förra sessionen slutade) och `DESIGN.md` (färg, typografi, form).
- **Klart betyder verifierat:** `scripts/verify.sh` ska vara grön. Stop-hooken kör den automatiskt när temafiler ändrats.
- **Uppdatera `HANDOFF.md`** innan du avslutar en session där något ändrats.
- **Shopify-fakta slås upp, gissas inte:** använd Shopify AI Toolkit (MCP-servern `shopify-dev`, `.mcp.json`) för Liquid-objekt, filter och schema, och Shopify CLI för allt som körs mot temat eller en butik.
- **Använd inte Shopify-kopplingen i Claude** (verktyg som börjar med `mcp__Shopify__`). Se `docs/decisions/0003-shopify-ai-toolkit-och-cli.md`.

## Projekt-skills (`.claude/skills/`)

| Skill | När |
|---|---|
| `theme-verify` | Köra och tolka kontrollerna |
| `new-block` | Nytt block eller ny sektion enligt Horizon-modellen |
| `visual-review` | Skärmdumpar i tre bredder före PR |
| `agent-team` | Köra ett mål ur Linear-teamet Goal (`/agent-team GOA-<nr>`) genom planering, implementation, test och oberoende granskning. Agenter i `.claude/agents/`, roller i `docs/agent-team/roles.md` |
| `prod-release` | Produktionssläpp — startas bara av en människa (`/prod-release`) |

## Skydd (`.claude/settings.json` + `.claude/hooks/`)

Hooks blockerar: kommandon mot live-storen, `--live`/`--allow-live`, force-push, push till `main`/`prod`, manuella ändringar i `config/settings_data.json`. Blir du blockerad — försök inte kringgå det, förklara vad som behövs och låt en människa avgöra.
