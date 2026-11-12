# Minne

Bara verifierade beslut och fakta, med hänvisning till bevis. Antaganden och planer hör inte hemma här.

| Datum | Fakta eller beslut | Bevis |
|---|---|---|
| 2026-11-11 | Shopifys locale-filer är JSON med kommentarer och avslutande kommatecken. Vanlig `json.loads` fallerar på `en.default.json`. Använd `readJsonc` i `scripts/lib/jsonc.mjs`. | `scripts/lib/jsonc.mjs`, `baseline.md` |
| 2026-11-11 | `sv.json` och `sv.schema.json` har redan alla nycklar som de engelska filerna har. | `baseline.md` |
| 2026-11-11 | Orörd Horizon ger 0 fel och 28 varningar i theme-check. | `baseline.md` |
| 2026-11-11 | Shopify CLI finns inte i molnmiljön. Theme-check körs i CI, lokalt ger `verify.sh` en SKIP-rad. | `scripts/verify.sh`, `.github/workflows/theme-check.yml` |
| 2026-11-11 | Horizon har ingen hårdkodad användarvänd text i `sections/`, `blocks/`, `snippets/`, `layout/`. Svenskan är komplett på nyckelnivå. Punkten "Översättning till svenska" handlar därmed om ton och butiksinställning, inte om saknade strängar. | `runs/2026-11-11-pilot-01.md` |
| 2026-11-11 | `UnusedDocParam` i `snippets/divider.liquid` är falsklarm. Rätta inte. | `runs/2026-11-11-pilot-01.md` |
| 2026-11-11 | Granskare och säkerhetsagent fångar 9 av 9 fel i `benchmarks/seeded-review-01.diff`. | `runs/2026-11-11-pilot-01.md` |
| 2026-11-11 | Mål spåras i Linear-teamet Goal (`GOA`). GOA-1 är agentteamets infrastruktur, GOA-2 till GOA-7 är de öppna punkterna i `AGENTS.md`. | Linear GOA, `.claude/skills/agent-team/SKILL.md` |
| 2026-11-11 | Verifiering och spärrar kommer från PR #1 på `main` (`scripts/verify.sh` med `check-json.mjs` och `check-locales.mjs`, hooks i `.claude/hooks/`). Agentteamets egna dubbletter togs bort vid sammanslagningen. | `docs/decisions/0001-claude-setup.md`, merge-commit på PR #2 |
| 2026-11-12 | Shopify AI Toolkit (MCP `shopify-dev`) och Shopify CLI är de verktyg som används för Shopify-arbete. Toolkit för uppslag och `validate_theme`, CLI för theme-check, förhandsvisning och push. | `docs/decisions/0002-shopify-ai-toolkit-och-cli.md` |
| 2026-11-12 | En ny schema-nyckel måste finnas i alla 20 `locales/*.schema.json`, annars fäller theme-check med `MatchingTranslations`. `scripts/check-locales.mjs` kontrollerar bara sv och en. | `docs/agent-team/runs/2026-11-11-GOA-3.md` |
| 2026-11-12 | Shopify CLI installeras av SessionStart-hooken, så theme-check körs även lokalt i molnmiljön. | `scripts/verify.sh`-utskrift i GOA-3-körningen |
| 2026-11-12 | Butiken `kpm6zp-2n.myshopify.com` ska inte användas för Parfymia. Den hör till ett annat projekt. | Ägarens besked i sessionen, `HANDOFF.md` |
| 2026-11-12 | Butiksadresserna är inte klarlagda: `6m05q1-6x` uppges vara Lilixa, `ikw71x-m0` uppges vara Parfymia (dev eller live okänt). Pusha inte till någon av dem utan ägarens uttryckliga besked. | Ägarens uppgift i sessionen, inte verifierad mot Shopify |
| 2026-11-12 | Shopify-kopplingen i Claude (`mcp__Shopify__*`) ska inte användas, inte ens för att läsa. Bara Shopify AI Toolkit och Shopify CLI. | `docs/decisions/0002-shopify-ai-toolkit-och-cli.md` |
