# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats. Håll den kort: nuläge, inte historik (historiken finns i git).

## Senast (2026-11-11)

Agent-setupen är på plats: `CLAUDE.md`, `.claude/` (settings, hooks, fyra skills), `scripts/verify.sh`, `.theme-check.yml`, GitHub Actions-jobb, PR-mall, `DESIGN.md`, `docs/`. Inga temafiler har ändrats.

Agentteamet är tillagt ovanpå: sju agenter i `.claude/agents/`, skillen `/agent-team`, rollkatalog och loggar i `docs/agent-team/`. Mål ligger som ärenden i Linear-teamet Goal (`GOA-1` till `GOA-7`). En referensuppgift med nio inplanterade fel fångades 9 av 9 av tester, reviewer och security.

Baslinje för kontrollerna: JSON OK (67 filer), sv/en i synk, theme-check 0 fel / 28 varningar.

## Nästa steg

1. Fyll i **Riktning** i `DESIGN.md` — det blockerar brand-anpassningen.
2. Brand-anpassning av färger, typsnitt, logo (via theme editor + `settings_schema.json`).
3. Header-redesign.

## Öppna frågor / väntar på människa

- Agentteamet har inte kört ett riktigt mål än. `planner`, `theme-developer`, `i18n` och `docs-writer` är oprovade, och ingen förbättringsiteration är gjord.

- Installera Claude GitHub-appen + secret `ANTHROPIC_API_KEY` om `@claude` ska fungera i PR:er.
- Secret `SHOPIFY_CLI_THEME_TOKEN` (Theme Access) om CI ska pusha `main` till "Parfymia WIP" eller köra Lighthouse.
- Branch protection på `main` och `prod` med krav på grönt "Theme check".
- Nätverksåtkomst till `dev-parfymia.myshopify.com` i molnmiljön, annars kan `visual-review` bara köras lokalt.
- Finns en inverterad logotyp för mörka bakgrunder?
