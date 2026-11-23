---
name: theme-verify
description: Kör och tolka Parfymia-temats kontroller (JSON, sv/en-översättningar, Shopify theme-check). Använd innan arbete rapporteras som klart, före PR, eller när Stop-hooken eller CI-jobbet "Theme check" har fallerat.
---

# theme-verify

```bash
scripts/verify.sh
```

Tre steg, alla måste vara gröna:

| Steg | Skript | Vanligt fel → åtgärd |
|---|---|---|
| JSON | `node scripts/check-json.mjs [fil]` | Avslutande komma, saknat citattecken. Kommentarer (`//`, `/* */`) är tillåtna. |
| Översättningar | `node scripts/check-locales.mjs` | Nyckel finns bara i ett språk → lägg till i **både** `locales/en.default.json` och `locales/sv.json` (schema-strängar i `*.schema.json`). Skriv riktig svenska, kopiera inte engelskan. |
| theme-check | `shopify theme check --fail-level error --path .` | Rätta felet i Liquid/schema. Slå upp okända checks via MCP-servern `shopify-dev`. |

## Regler

- **Fel** fäller. **Varningar** fäller inte: baslinjen från Horizon har 28 st. Inför inga nya, och rätta gärna de som finns i filer du ändå rör.
- Stäng aldrig av en check i `.theme-check.yml` och lägg aldrig till `{% # theme-check-disable %}` för att bli grön utan att det är överenskommet.
- Saknas Shopify CLI lokalt hoppas theme-check över med en varning — då är arbetet **inte** fullt verifierat; säg det i rapporten. Installera med `npm install -g @shopify/cli`.
- Rapportera resultatet som det är: vilka steg som kördes och utfallet.
