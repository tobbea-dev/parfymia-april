# Minne

Bara verifierade beslut och fakta, med hänvisning till bevis. Antaganden och planer hör inte hemma här.

| Datum | Fakta eller beslut | Bevis |
|---|---|---|
| 2026-11-11 | Shopifys locale-filer är JSON med kommentarer och avslutande kommatecken. Vanlig `json.loads` fallerar på `en.default.json`. Använd `load()` i `scripts/verify.py`. | `scripts/verify.py`, `baseline.md` |
| 2026-11-11 | `sv.json` och `sv.schema.json` har redan alla nycklar som de engelska filerna har. | `baseline.md` |
| 2026-11-11 | Orörd Horizon ger 0 fel och 28 varningar i theme-check. | `baseline.md` |
| 2026-11-11 | Shopify CLI finns inte i molnmiljön. Theme-check körs i CI, lokalt ger `verify.sh` en SKIP-rad. | `scripts/verify.sh`, `.github/workflows/theme-check.yml` |
| 2026-11-11 | Horizon har ingen hårdkodad användarvänd text i `sections/`, `blocks/`, `snippets/`, `layout/`. Svenskan är komplett på nyckelnivå. Punkten "Översättning till svenska" handlar därmed om ton och butiksinställning, inte om saknade strängar. | `runs/2026-11-11-pilot-01.md` |
| 2026-11-11 | `UnusedDocParam` i `snippets/divider.liquid` är falsklarm. Rätta inte. | `runs/2026-11-11-pilot-01.md` |
| 2026-11-11 | Granskare och säkerhetsagent fångar 9 av 9 fel i `benchmarks/seeded-review-01.diff`. | `runs/2026-11-11-pilot-01.md` |
