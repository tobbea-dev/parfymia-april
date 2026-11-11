# 0002 — Brand: färger och typsnitt

Datum: 2026-11-11

## Beslut

- **Känsla:** exklusiv parfymeri.
- **Accentfärg:** salviagrön `#5f7161`, med en grönsvart `#1f2421` i stället för ren svart och varma neutraler (elfenben, sand) som tonade bakgrunder.
- **Typografi:** Playfair Display 400 i rubriker, Inter kvar i brödtext och underrubriker.

Fullständig palett och schemaindelning står i `DESIGN.md`.

## Engångsundantag: `config/settings_data.json` ändrad i kod

Regeln i `AGENTS.md` är att `settings_data.json` ägs av theme editor, och hooken `guard-files.mjs` blockerar handredigering. Färgscheman och typsnitt kan bara lagras där, så repo-ägaren godkände ett engångsundantag för den här ändringen.

Hur det gjordes:

- Ändringen skrevs av ett skript som bytte ut de sju färgschemanas värden och `type_heading_font`. Filen serialiserades om i Shopifys eget format, så diffen innehåller bara värdeändringar.
- Kontrollerat efteråt: 200 ändrade nycklar, alla under `current.color_schemes` utom `current.type_heading_font`. `presets` är orörd.
- Hooken är oförändrad. Undantaget gäller den här ändringen, inte framtida.

## Konsekvenser

- **Pusha till dev-storen före nästa `theme pull`.** En pull från ett tema som inte har de här värdena skriver över dem.
- Typsnittsnamnet `playfair_display_n4` kunde inte slås upp mot Shopifys typsnittsbibliotek från sessionen (ingen åtkomst till shopify.dev). Bekräfta i theme editor efter första push att rubrikerna visas i Playfair Display.
- Schema 4 var tidigare ljusblått och är nu sand. Sektioner som använde det för att sticka ut får en lugnare ton.
- Den inverterade logotypen saknas fortfarande; nuvarande logotyp kan bli svårläst på schema 5 och 6.
