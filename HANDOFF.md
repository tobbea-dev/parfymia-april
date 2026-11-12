# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats. Håll den kort: nuläge, inte historik (historiken finns i git).

## Senast (2026-11-11)

Brand-anpassning, del 1: nya färgscheman (salviagrön accent, grönsvart text, varma neutraler) och Playfair Display i rubriker. Riktningen står i `DESIGN.md`, beslutet i `docs/decisions/0002-brand-farger-och-typsnitt.md`.

`config/settings_data.json` ändrades i kod som ett godkänt engångsundantag. Inga Liquid-, CSS- eller JS-filer är ändrade.

Kontroller: `scripts/verify.sh` grön. **Inte visuellt verifierat** — dev-storen nås inte från molnsessionen.

## Nästa steg

1. Pusha branchen till dev-storen som opublicerat tema och titta på startsida, produktsida, kollektion och varukorg i 390/768/1280 px. Gör detta **innan** någon kör `theme pull`.
2. Bekräfta i förhandsgranskningen att rubrikerna visas i Playfair Display (typsnittsnamnet är kontrollerat mot Shopifys dokumentation, renderingen är inte sedd).
3. Ladda upp en inverterad logotyp för mörka scheman (theme editor → Logo).
4. Ta ställning till hörnradier (förslag i `DESIGN.md` → Riktning).
5. Därefter: header-redesign (PAR-8).

## Öppna frågor / väntar på människa

- Målgrupp, referenser, bildspråk och ton är inte ifyllda i `DESIGN.md`.
- Installera Claude GitHub-appen + secret `ANTHROPIC_API_KEY` om `@claude` ska fungera i PR:er.
- Secret `SHOPIFY_CLI_THEME_TOKEN` (Theme Access) om CI ska pusha `main` till "Parfymia WIP" eller köra Lighthouse.
- Branch protection på `main` och `prod` med krav på grönt "Theme check".
- Nätverksåtkomst till `dev-parfymia.myshopify.com` i molnmiljön, annars kan `visual-review` bara köras lokalt.
