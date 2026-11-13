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
  - Permanent adress för Shopify CLI med Theme Access-lösenord: `devparfymia.myshopify.com` (utan bindestreck). `dev-parfymia` fungerar i webbläsaren men avvisas av CLI.
- **Prod**: `www.parfymia.com` (myshopify-adress: `6m05q1-6x.myshopify.com`) — *aldrig* direkt-push, alltid via `prod`-branch och backup först

## Verktyg

Arbete mot Shopify görs med **Shopify AI Toolkit** (MCP-servern `shopify-dev` i `.mcp.json`) för fakta och validering, och **Shopify CLI** för att utföra. Shopify-kopplingen i Claude (connectorn, `mcp__Shopify__*`) används **inte**. Beslut och öppna frågor: `docs/decisions/0003-shopify-ai-toolkit-och-cli.md`.

## Hur man kör

Se `README.md` för fullständigt setup. Nyckelkommandon:
```bash
shopify theme dev --store=dev-parfymia.myshopify.com           # live preview
shopify theme push --store=dev-parfymia.myshopify.com --unpublished --theme="Parfymia WIP"
shopify theme pull --store=dev-parfymia.myshopify.com --theme="Parfymia WIP"
```

## Verifiering

Kör innan du säger att något är klart, och innan PR:
```bash
scripts/verify.sh
```
Den kontrollerar JSON-syntax, att `sv` och `en` har samma översättningsnycklar, och kör `shopify theme check` (fel fäller, varningar visas). Samma skript körs i GitHub Actions på varje PR.

## Kunskapsbas

| Fil | Innehåll |
|---|---|
| `DESIGN.md` | Färgscheman, typografi, hörnradier — nuläge och Parfymias riktning |
| `HANDOFF.md` | Var senaste sessionen slutade, nästa steg, öppna frågor |
| `docs/decisions/` | Beslut och varför de togs |
| `.claude/` | Skills, hooks och permissions för Claude Code |

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
- Primärspråk: **engelska (en)** — `locales/en.default.json` är temats standardfil. Sekundär: svenska (sv).
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

## Agentteam

- **Mål:** ligger som ärenden i Linear-teamet Goal (`GOA`). Teamet flyttar status till In Progress och In Review. Done sätts när PR:en är mergad.
- **Agentteam:** `/agent-team GOA-<nr>` kör planering, implementation, test, oberoende granskning och dokumentation. Sju agenter finns i `.claude/agents/`, alla 30 rollkontrakt i `docs/agent-team/roles.md`.
- **Autonomi:** Supervised. Teamet arbetar på feature-branch och öppnar draft-PR. Merge och all push till butik godkänns av en människa.
- **Minne och loggar:** `docs/agent-team/` (baslinje, minne, körningar, referensuppgifter, förbättringslogg).
- **Rör inte utan godkännande:** `scripts/`, `.theme-check.yml`, `.claude/settings.json`, `.claude/hooks/`. Det är utvärderingsregler och spärrar.

## Aktuell status

- ✅ Initial baseline från Horizon-export importerad (commit `9a78eff`)
- ✅ Agent-setup: regler, hooks, permissions, kontroller, CI, kunskapsbas (se `docs/decisions/0001-claude-setup.md`)
- 🟡 Brand-anpassning: färger och rubriktypsnitt klara (se `DESIGN.md`, `docs/decisions/0002-brand-farger-och-typsnitt.md`). Kvar: inverterad logo, verifiering på dev-storen
- ✅ Agentteam: sju agenter, `/agent-team`, rollkatalog och mål-kö i Linear (se `docs/agent-team/`)
- 🟡 Header-redesign för Parfymia: toppfält (säljargument, genvägar) och sökfält är byggda, granskade och uppladdade till dev-storen som opublicerat tema. Kvar: inställningar i theme editor och kontroll i butik
- 🟡 Hero/landing: startsidans mall är byggd och granskad (hero, kategoriingångar, varumärkesrad, bästsäljare, nyheter), se `docs/agent-team/runs/2026-11-13-GOA-4.md`. Kvar: bilder, texter, länkar och kollektioner i theme editor, och kontroll i butik
- ⬜ Kategorinavigation (parfym → dam/herr/nisch, hår, hud, makeup …)
- ⬜ Produktsida-anpassningar (notes/topnoter/baser för parfym, ingredienser för hudvård etc.)
- ⬜ Språk: engelska som primärspråk, svenska som sekundärt — granska svenska översättningen och välj vilka övriga språk som ska vara kvar

(Uppdatera den här listan när uppgifter slutförs.)
