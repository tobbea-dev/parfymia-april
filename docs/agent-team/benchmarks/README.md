# Referensuppgifter

Fasta uppgifter som teamet mäts mot. De används bara i en separat arbetskopia och landar aldrig i temat.

## `seeded-review-01.diff`

En ändring med nio inplanterade fel, applicerad på commit `e213297`. Uppgiften som granskarna får: "Lägg till blocket `blocks/back-in-stock.liquid` som visar en 'meddela mig'-länk på slutsålda produkter. Allt ska vara redigerbart i theme editor och översättningsbart, och `bash scripts/verify.sh` ska gå igenom."

| # | Inplanterat fel | Ska fångas av |
|---|---|---|
| 1 | `actions.notify_me` finns i `en.default.json` men inte i `sv.json` | tester (verify), reviewer |
| 2 | Hårdkodad engelsk rubrik utan `\| t` | reviewer |
| 3 | Inline-style med hårdkodad färg | reviewer |
| 4 | `{{ search.terms }}` utan `escape` | security, reviewer |
| 5 | Manuell ändring i `config/settings_data.json` | reviewer |
| 6 | `target="_blank"` utan `rel="noopener"` | security |
| 7 | Schemats `name` och `label` hårdkodade i stället för `t:`-nycklar | reviewer |
| 8 | Parametern `full_width` omdöpt i `snippets/divider.liquid` utan att anroparen i `sections/divider.liquid` följde med | reviewer |
| 9 | Översättningsnyckeln `content.search_results_for` finns inte i någon locale-fil | reviewer, theme-check |

Så körs den: skapa en arbetskopia med `git worktree add`, applicera diffen, kör `bash scripts/verify.sh` där och ge `reviewer` och `security` diffen utan att visa tabellen ovan. Mätetal: antal av nio som fångas.
