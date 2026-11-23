---
name: visual-review
description: Ta skärmdumpar av Parfymia-temat i tre bredder (mobil, surfplatta, desktop) och granska dem mot DESIGN.md. Använd efter synliga ändringar i sektioner, block, CSS eller mallar, och före PR med UI-ändringar.
---

# visual-review

## 1. Skaffa en preview-URL

- Lokalt: `shopify theme dev --store=dev-parfymia.myshopify.com` → `http://127.0.0.1:9292`.
- Annars: pusha som opublicerat tema och använd preview-länken som CLI:t skriver ut:
  `shopify theme push --store=dev-parfymia.myshopify.com --unpublished --theme="Parfymia WIP"`
- Aldrig live-storen.

Nås inte dev-storen från sessionen (molnmiljö utan nätverksåtkomst, lösenordsskydd, ingen inloggning): **säg det rakt ut** och be om åtkomst eller skärmdumpar. Hitta inte på hur sidan ser ut.

## 2. Ta bilderna

```bash
node .claude/skills/visual-review/screenshot.mjs <preview-url> /products/<handle> /collections/all
```

Sparar `390`, `768` och `1280` px helsidesbilder i `.cache/visual-review/` (ignoreras av git). Utan sökvägar tas bara startsidan.

## 3. Granska varje bild

Titta på bilderna — beskriv inget du inte har sett.

- Trasig layout: överlapp, horisontell scroll, avklippt text, tomma ytor
- Mobil (390): tryckytor minst 44 px, läsbar text, menyn fungerar
- Stämmer färg, typografi och hörnradier med `DESIGN.md`?
- Ser det ut som Parfymia eller som orörd Horizon/generisk mall?
- Svensk text får plats (svenska ord är ofta längre än engelska)
- Tillstånd: tom varukorg, slutsåld produkt, långa produktnamn

## 4. Rapportera

Lista fynd per bredd med vad som är fel och var. Rätta, ta nya bilder, och bifoga de slutliga i PR:en.
