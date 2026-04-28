# parfymia-april

Shopify-tema för **Parfymia** — en svensk e-handel som säljer parfym, hudvård, makeup, hårvård, klockor och mer.

Temat är en fork av Shopifys **Horizon**-tema (export från `www-parfymia-com-copy-of-horizon`, 28 apr 2026), som vi gradvis anpassar till Parfymias varumärke.

## Stores

| Miljö | Store | Användning |
|---|---|---|
| Dev | `dev-parfymia.myshopify.com` | All utveckling och förhandsvisning |
| Prod | `www.parfymia.com` | Live butik — pusha aldrig direkt hit |

## Komma igång

### 1. Klona repot
```bash
git clone https://github.com/tobbea-dev/parfymia-april.git
cd parfymia-april
```

### 2. Installera Shopify CLI
```bash
# macOS
brew install Shopify/shopify/shopify-cli

# eller via npm
npm install -g @shopify/cli @shopify/theme
```

Verifiera:
```bash
shopify version
```

### 3. Logga in på dev-storen
```bash
shopify auth login --store=dev-parfymia.myshopify.com
```
Browsern öppnas — godkänn access.

## Dagligt arbetsflöde

### Live preview med hot-reload
```bash
shopify theme dev --store=dev-parfymia.myshopify.com
```
Öppnar en lokal preview-URL. Ändringar i `assets/`, `sections/`, `blocks/`, `snippets/`, `templates/` reflekteras direkt i browsern.

### Pusha till dev-storen som ett "unpublished theme"
```bash
shopify theme push --store=dev-parfymia.myshopify.com --unpublished --theme="Parfymia WIP"
```
Skapar/uppdaterar ett tema vid namn "Parfymia WIP" utan att publicera. Använd det här för att testa fullständiga rendering-paths som kassa, kollektionsfilter etc. som inte alltid funkar i `theme dev`.

### Hämta ändringar gjorda i Shopify-admin tillbaka till repot
Om någon redigerar i Shopify-admin (t.ex. theme settings, mall-ändringar), hämta dem så de hamnar i git:
```bash
shopify theme pull --store=dev-parfymia.myshopify.com --theme="Parfymia WIP"
```
Granska diff:en, committa det som ska sparas.

## Branch-strategi

| Branch | Syfte |
|---|---|
| `main` | Stabil version som speglar dev-store |
| `feature/<namn>` | En anpassning åt gången (t.ex. `feature/header-redesign`) |
| `prod` | Det som faktiskt är publicerat på live-storen |

Workflow:
1. `git checkout -b feature/<namn>` från `main`
2. Gör ändringarna, testa med `shopify theme dev`
3. Committa och pusha branchen
4. Öppna PR mot `main`, merga när klar
5. När en grupp ändringar är redo för produktion: merga `main` → `prod` och kör `shopify theme push --store=www.parfymia.com --live` (med en backup först)

## Tema-struktur

Standard Shopify Online Store 2.0 / Horizon:

```
assets/      Statiska filer — CSS, JS, bilder, fonts
blocks/      Återanvändbara block (Horizons block-modell)
config/      settings_schema.json + settings_data.json (theme editor)
layout/      theme.liquid + checkout.liquid
locales/     Översättningsfiler (sv.json, en.default.json m.fl.)
sections/    Sektioner som syns i theme editor
snippets/    Mindre Liquid-fragment
templates/   JSON/Liquid-mallar för sidor (product, collection, cart osv.)
```

## Backup innan produktion

Innan varje produktion-push:
```bash
# Hämta nuvarande live-tema till en backup-folder
shopify theme pull --store=www.parfymia.com --live --path=./backups/$(date +%Y-%m-%d)
```
Committa backup-mappen för historik.

## Vidare läsning

- [Shopify CLI för teman](https://shopify.dev/docs/themes/tools/cli)
- [Horizon-temadokumentation](https://shopify.dev/docs/storefronts/themes/architecture)
- [Liquid-referens](https://shopify.dev/docs/api/liquid)
