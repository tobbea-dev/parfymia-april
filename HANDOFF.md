# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats. Håll den kort: nuläge, inte historik (historiken finns i git).

## Senast (2026-11-12)

**GOA-3 Header-redesign: koden är klar och granskad, inget är kontrollerat i en butik.**

- Ny sektion `sections/header-topbar.liquid` för header-gruppen, med blocken `_usp-item` (ikon, text, valfri länk) och `_shortcut-link` (text, länk, framhäv).
- Ny inställning i headern, "Sökvisning på dator": ikon (standard) eller fält. Fältet är en knapp som öppnar den befintliga sökmodalen.
- Åtta nya editor-etiketter i alla 20 `locales/*.schema.json`.
- Kontroller: verify grön (theme-check 0 fel, 28 varningar som i baslinjen), Shopify AI Toolkit VALID, granskaren GODKÄND efter en rättningsomgång. Se `docs/agent-team/runs/2026-11-11-GOA-3.md`.

**Toppfältet syns inte av sig självt.** `sections/header-group.json` ägs av theme editor, så sektionen måste läggas till där och dras ovanför headern.

Beslut: Shopify AI Toolkit och Shopify CLI är verktygen för Shopify-arbete (`docs/decisions/0002-shopify-ai-toolkit-och-cli.md`).

Sedan tidigare: agentteamet (sju agenter, `/agent-team`, Linear-teamet Goal), och GOA-2 där färger och logo behålls och rubriktypsnittet ska bytas till en serif i theme editor.

## Nästa steg

1. Fyll i **Riktning** i `DESIGN.md` — det blockerar brand-anpassningen.
2. Brand-anpassning av färger, typsnitt, logo (via theme editor + `settings_schema.json`).
3. Header-redesign.

## Öppna frågor / väntar på människa

- **GOA-3, i theme editor:** logo i mitten, meny på nedre raden och i mitten, sökvisning "fält", lägg till toppfältet ovanför headern, fyll i USP:ar, genvägar och meddelandetext. Kontrollera mobil och dator.
- **Butik för förhandsvisning:** `6m05q1-6x.myshopify.com` angavs för GOA-3 och har inte använts än: molnmiljön når den inte och har ingen inloggning. `kpm6zp-2n.myshopify.com` **ska inte användas** (beslut av ägaren 2026-11-12); den hör till ett annat projekt.
- **GOA-2:** välj serif för rubriker i theme editor.

- Agentteamet har inte kört ett riktigt mål än. `planner`, `theme-developer`, `i18n` och `docs-writer` är oprovade, och ingen förbättringsiteration är gjord.

- Installera Claude GitHub-appen + secret `ANTHROPIC_API_KEY` om `@claude` ska fungera i PR:er.
- Secret `SHOPIFY_CLI_THEME_TOKEN` (Theme Access) om CI ska pusha `main` till "Parfymia WIP" eller köra Lighthouse.
- Branch protection på `main` och `prod` med krav på grönt "Theme check".
- Nätverksåtkomst till `dev-parfymia.myshopify.com` i molnmiljön, annars kan `visual-review` bara köras lokalt.
- Finns en inverterad logotyp för mörka bakgrunder?
