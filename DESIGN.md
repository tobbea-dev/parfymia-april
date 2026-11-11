# DESIGN.md

Designunderlag för Parfymia-temat. Läses av agenter innan UI-arbete och används som facit i `visual-review`.

Värdena under **Nuläge** är utlästa ur `config/settings_data.json` (Horizon-exporten 28 apr 2026). De ändras i theme editor, inte i koden — uppdatera den här filen när de ändras.

## Riktning — Parfymia

> ⬜ Inte bestämt än. Fylls i under "Brand-anpassning" (se AGENTS.md → Aktuell status).

- **Känsla:** _t.ex. tre adjektiv_
- **Målgrupp:** _vem handlar, vad jämför de med_
- **Referenser:** _butiker/varumärken vi vill likna och inte likna_
- **Primärfärg / accent:** _
- **Typsnitt rubrik / brödtext:** _
- **Bildspråk:** _produkt på vit botten, livsstil, närbilder …_
- **Ton i text:** _du-tilltal? saklig, lekfull, exklusiv?_

## Nuläge

### Logotyp
`Logga_Parfymia_sm.png` — höjd 36 px desktop, 28 px mobil. Samma fil för ljus och mörk bakgrund (ingen inverterad variant än).

### Färgscheman

| Schema | Bakgrund | Text | Primär knapp (bg / text) | Kant |
|---|---|---|---|---|
| scheme-1 | `#ffffff` | `#000000cf` | `#000000` / `#ffffff` | `#0000000f` |
| scheme-2 | `#f5f5f5` | `#000000cf` | `#000000` / `#ffffff` | `#dfdfdf` |
| scheme-3 | `#eef1ea` | `#000000cf` | `#000000` / `#ffffff` | `#000000cf` |
| scheme-4 | `#e1edf5` | `#000000cf` | `#000000` / `#ffffff` | `#1d368680` |
| scheme-5 | `#333333` | `#ffffff` | `#ffffff` / `#000000` | `#ffffffb0` |
| scheme-6 | transparent | `#ffffff` | `#ffffff` / `#000000` | `#e6e6e6` |

Detta är Horizons standardpalett: svartvit, ingen varumärkesfärg.

### Typografi

Inter i hela temat: brödtext 400, underrubrik 500, rubrik och accent 700.

| Nivå | Storlek | Typsnitt |
|---|---|---|
| H1 | 56 px | rubrik |
| H2 | 48 px | rubrik |
| H3 | 32 px | rubrik |
| H4 | 24 px | rubrik |
| H5 | 14 px | underrubrik |
| H6 | 12 px | underrubrik |
| Brödtext | 14 px | brödtext |

### Form

| Element | Hörnradie |
|---|---|
| Knappar (primär/sekundär), popover, variantknappar | 14 px |
| Kort, inmatningsfält | 4 px |
| Produktbild | 0 px |
| Badge | 100 px (pill) |
| Färgprov | 32 px |

Sidbredd: `narrow`. Ingen hover-effekt på kort.

## Regler för kod

- Använd Horizons CSS-variabler (`var(--color-foreground)`, `var(--color-background)`, `var(--font-heading--family)` …) — de följer aktivt färgschema. Hårdkoda aldrig hex-värden eller typsnittsnamn.
- Nya designvärden som handlaren ska kunna ändra: lägg till i `config/settings_schema.json`.
- Mobil först. Kontrollera 390 / 768 / 1280 px.
