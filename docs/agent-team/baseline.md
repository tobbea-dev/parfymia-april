# Baslinje

Mätt på orörd Horizon-import (commit `4d7f676`), 2026-11-11, innan agentteamet ändrat någon temafil.

## `bash scripts/verify.sh`

| Kontroll | Resultat |
|---|---|
| JSON-tolkning | 67 filer, 0 fel (`locales/`, `config/`, `templates/`, `sections/*.json`) |
| Paritet `sv.json` mot `en.default.json` | 0 nycklar saknas |
| Paritet `sv.schema.json` mot `en.default.schema.json` | 0 nycklar saknas |
| Theme-check (Shopify CLI 5.0.1, `theme-check:recommended`) | 307 filer, 0 fel, 28 varningar |

Godtagna paritetsluckor kan läggas i `scripts/locale-baseline.json`. Filen finns inte i dag eftersom inga luckor finns. Nya luckor ger fel.

## Ärvda theme-check-varningar

| Check | Antal | Filer |
|---|---|---|
| `ValidScopedCSSClass` | 24 | `sections/predictive-search.liquid` (7), `snippets/predictive-search-products-list.liquid` (9), `snippets/cart-summary.liquid` (2), `snippets/predictive-search-resource-carousel.liquid` (2), `sections/media-with-content.liquid`, `sections/product-information.liquid`, `sections/slideshow.liquid`, `snippets/search-modal.liquid` (1 vardera) |
| `UnusedDocParam` | 4 | `snippets/divider.liquid` |

Alla kommer från Horizon. CI fallerar på fel, inte på varningar. Testaren räknar fler än 28 varningar, eller varningar i andra filer än dessa, som fynd.

## Negativa test av verifieringen

| Test | Förväntat | Utfall |
|---|---|---|
| Ta bort `accessibility.close_dialog` ur `sv.json` | `FAIL parity`, felkod 1 | som förväntat |
| Lägg in trasig `templates/zz-broken.json` | `FAIL json` | som förväntat |

## Vad baslinjen inte täcker

- Utseende och beteende i butiken och theme editor. Ingen butiksinloggning finns i molnmiljön.
- Om de svenska texterna är bra svenska. Paritet mäter bara att nyckeln finns.
- Prestanda och tillgänglighet i renderad sida.
