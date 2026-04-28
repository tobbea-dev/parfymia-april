# AGENTS.md

Kontext för AI-assistenter (Claude, Cursor, GitHub Copilot Workspace m.fl.) som arbetar i det här repot.

## Vad är detta?

Shopify-tema för **Parfymia**, en svensk e-handel inom skönhet och tillbehör. Sortiment:
- Parfym (dam, herr, nisch, gift sets)
- Hårvård (schampo, conditioner, styling, färg, värmestyling)
- Hudvård (rengöring, serum, krämer, SPF, akne/anti-age)
- Makeup (foundation, mascara, läppstift, borstar)
- Grooming för män (skägg, rakning, hudvård)
- Klockor, naglar, kropp, kosttillskott, accessoarer

Basen är **Shopify Horizon-temat** (Online Store 2.0). Vi anpassar gradvis utan att gå för långt från Horizons block-modell — det gör framtida uppgraderingar lättare.

## Stores

- **Dev**: `dev-parfymia.myshopify.com` — fri lekplats, pusha hit gärna
- **Prod**: `www.parfymia.com` — *aldrig* direkt-push, alltid via `prod`-branch och backup först

## Hur man kör

Se `README.md` för fullständigt setup. Nyckelkommandon:
```bash
shopify theme dev --store=dev-parfymia.myshopify.com           # live preview
shopify theme push --store=dev-parfymia.myshopify.com --unpublished --theme="Parfymia WIP"
shopify theme pull --store=dev-parfymia.myshopify.com --theme="Parfymia WIP"
```

## Konventioner

### Liquid
- **Behåll Horizons block-arkitektur.** Skapa nya `blocks/*.liquid` istället för att hårdkoda i sektioner när möjligt — det gör innehållet redigerbart i theme editor.
- **Schema-fält först.** Allt som handlar har anledning att redigera (text, färg, bild, länk) ska exponeras via `{% schema %}`-blocket, inte hårdkodas.
- **Alltid `| t` på användarvänd text** — t.ex. `{{ 'product.add_to_cart' | t }}`. Lägg motsvarande i `locales/sv.json` och `locales/en.default.json`.
- **Inga inline-styles.** Använd CSS-variabler från Horizons design-system (se `assets/base.css`) eller lägg till nya i `config/settings_schema.json` om de ska vara redigerbara.

### CSS
- Horizon använder CSS custom properties för designtokens. Återanvänd dem (`var(--color-foreground)`, `var(--font-body--family)` osv.) hellre än att hardcoda värden.
- Nya komponentstilar: lägg i `assets/<komponent>.css` och inkludera via `{{ '<komponent>.css' | asset_url | stylesheet_tag }}`.

### JavaScript
- Horizon använder vanilla JS web components. Följ samma pattern — definiera custom elements (`class extends HTMLElement`) i `assets/<komponent>.js`.
- Inga build-steg. Allt JS körs som det är, så håll det modernt-men-kompatibelt (ES2020+, ingen TS-kompilering).

### Bilder och assets
- Lägg bilder i `assets/`. Använd `image_url`-filtret med rätt storlek: `{{ 'foo.jpg' | image_url: width: 800 }}`.
- För stora bilder (hero, kategoribanner) — låt theme-editorn äga dem som `image_picker`-settings istället för att lägga in i `assets/`.

### Översättningar
- Primärspråk: **svenska (sv)**. Sekundär: engelska (en).
- Alla nya strängar ska in i båda `locales/sv.json` och `locales/en.default.json`.

## Branch-strategi

- `main` — speglar dev-store
- `feature/<namn>` — en anpassning åt gången
- `prod` — speglar live-store

Aldrig commit direkt till `main` eller `prod`. Alltid PR.

## Vad AI-assistenter SKA göra

- Förstå Liquid + Horizons block/section-modell innan kod skrivs
- Köra ändringar via en feature-branch
- Lägga till svenska + engelska översättningar för all ny användarvänd text
- Föreslå theme-editor settings istället för hårdkodade värden
- Verifiera ändringar mot Shopifys [theme-check](https://shopify.dev/docs/themes/tools/theme-check) när möjligt

## Vad AI-assistenter INTE ska göra

- Pusha direkt till `prod` eller live-storen
- Plocka bort Horizons standardsektioner utan att kolla att de inte används någonstans (theme editor, andra mallar)
- Lägga till nya npm-deps eller build-steg utan diskussion — temat är medvetet build-fritt
- Ändra `config/settings_data.json` manuellt — det filet uppdateras av theme editor och konflikter blir röriga

## Aktuell status

- ✅ Initial baseline från Horizon-export importerad (commit `9a78eff`)
- ⬜ Brand-anpassning av färger, typsnitt, logo
- ⬜ Header-redesign för Parfymia
- ⬜ Hero/landing
- ⬜ Kategorinavigation (parfym → dam/herr/nisch, hår, hud, makeup …)
- ⬜ Produktsida-anpassningar (notes/topnoter/baser för parfym, ingredienser för hudvård etc.)
- ⬜ Översättning till svenska som primärspråk

(Uppdatera den här listan när uppgifter slutförs.)
