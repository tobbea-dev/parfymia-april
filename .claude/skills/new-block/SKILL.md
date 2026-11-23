---
name: new-block
description: Skapa ett nytt block eller en ny sektion i Parfymia-temat enligt Horizons block-modell. Använd när en ny redigerbar komponent ska byggas (t.ex. doftnoter på produktsidan, kategoribanner, USP-rad) eller när hårdkodat innehåll ska göras redigerbart i theme editor.
---

# new-block

## Innan du skriver kod

1. Läs `DESIGN.md`.
2. Hitta det närmaste befintliga blocket i `blocks/` och utgå från dess struktur — uppfinn inte ett eget mönster. Bra förlagor: `blocks/accordion.liquid` och `blocks/review.liquid` (markup direkt i blocket), `blocks/text.liquid` (blocket delegerar till en snippet med `{% render 'text', block: block %}`).
3. Avgör nivå: **block** (`blocks/`) om det ska kunna placeras i flera sektioner — förstahandsvalet. **Sektion** (`sections/`) bara för helsides-byggstenar.

## Filer som hör ihop

| Fil | Innehåll |
|---|---|
| `blocks/<namn>.liquid` | Markup + `{% schema %}` |
| `assets/<namn>.css` | Stilar, laddas med `{{ '<namn>.css' \| asset_url \| stylesheet_tag }}` |
| `assets/<namn>.js` | Bara vid interaktivitet: web component (`class extends HTMLElement`), ES2020+, inget build-steg |
| `locales/en.default.json` + `locales/sv.json` | Text som kunden ser |
| `locales/en.default.schema.json` + `locales/sv.schema.json` | Etiketter i theme editor (`t:`-nycklar i schemat) |

## Krav

- **Schema först.** Text, bild, länk och färg som handlaren kan vilja ändra ska vara en setting, inte hårdkodad. Stora bilder: `image_picker`.
- **All synlig text via `| t`.** Ingen svensk eller engelsk text direkt i Liquid.
- **Inga inline-styles, inga hårdkodade färger eller typsnitt.** Använd Horizons tokens (`var(--color-foreground)`, `var(--font-body--family)` …) från `assets/base.css`.
- Rotelementet ska ha `{{ block.shopify_attributes }}` så att blocket går att markera i theme editor — i blockfilen, eller i snippeten om blocket delegerar dit (Horizon-block har ofta `"tag": null` och måste då skriva ut attributen själva).
- Rör inte `config/settings_data.json` (blockeras av hook). Nya globala inställningar hör hemma i `config/settings_schema.json`.
- Tillgänglighet: semantiska element, `alt` på bilder, synligt fokus, fungerar med tangentbord.

## Avsluta

1. `scripts/verify.sh` grön.
2. Skärmdumpar enligt skill `visual-review` om dev-storen går att nå.
3. Notera blocket i `HANDOFF.md`.
