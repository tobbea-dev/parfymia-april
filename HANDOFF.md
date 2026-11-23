# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats.

Senast uppdaterad: 2026-11-23

## 1. Mål och kontext

Repot är Shopify-temat för **Parfymia**, en svensk e-handel inom parfym, hudvård, makeup, hårvård, klockor med mera. Basen är Shopifys Horizon-tema (Online Store 2.0), som anpassas stegvis till Parfymias varumärke utan att lämna Horizons block-modell.

Riktning: exklusiv parfymeri. Salviagrön palett, serif i rubriker, lugn och luftig layout. Detaljer i `DESIGN.md`.

Arbetssätt:

- Regler för alla agenter står i `AGENTS.md`. `CLAUDE.md` importerar den.
- Klart betyder att `scripts/verify.sh` är grön.
- Arbete mot Shopify görs med Shopify AI Toolkit (MCP-servern `shopify-dev`) och Shopify CLI. Shopify-kopplingen i Claude används inte.
- Uppgifterna finns i Linear, team `parfymia` (nyckel PAR).

Butiker:

| Miljö | Adress | Regel |
|---|---|---|
| Dev | `devparfymia.myshopify.com` | Fri att pusha till |
| Live | `www.parfymia.com` (`6m05q1-6x.myshopify.com` enligt repot) | Aldrig direkt-push. Spärrad i hooks |

## 2. Ändringar och beslut

### På `main`

| PR | Innehåll |
|---|---|
| #1 | Agent-setup: `CLAUDE.md`, `AGENTS.md`, `.claude/settings.json`, hooks, fyra skills, `scripts/verify.sh`, CI (`.github/workflows/theme-check.yml`), PR-mall, `DESIGN.md`, `HANDOFF.md`, `docs/decisions/` |
| #3 | Brand-färger och rubriktypsnitt, engelska som primärspråk, spärr för live-butiken, beslutet om Shopify-verktyg, `.mcp.json` |

### På branchen `claude/magical-cerf-45jri1` (PR #4, utkast, inte mergad)

| Fil | Ändring |
|---|---|
| `sections/header-group.json` | Logotyp i mitten, meny centrerad på egen rad i versaler, mörk annonsrad, tunn linje under headern, fäst header vid skroll uppåt, dragspelsmeny på mobil |
| `blocks/_header-menu.liquid` | Ny inställning "Letter spacing" (normal/loose) för menyns toppnivå |
| `snippets/menu-font-styles.liquid`, `snippets/header-drawer.liquid` | Skriver ut och använder `--menu-top-level-letter-spacing` |
| `DESIGN.md` | Nytt avsnitt om headern |
| `AGENTS.md`, `README.md`, `.claude/skills/visual-review/SKILL.md` | Dev-butikens adress rättad till `devparfymia.myshopify.com` |
| `docs/decisions/0003-shopify-ai-toolkit-och-cli.md` | Hur temat laddas upp från molnsessioner med Theme Access |

Menyinställningen återanvänder befintliga översättningsnycklar, så inga nya strängar behövdes.

### Beslut

| Beslut | Varför | Var |
|---|---|---|
| Hooks blockerar live-butiken, `--live`, `theme publish`, force-push, push till `main`/`prod` och handändring av `config/settings_data.json` | Ett misstag mot live-butiken går inte att ta tillbaka | `docs/decisions/0001` |
| Palett i salviagrönt, Playfair Display i rubriker | Vald riktning: exklusiv parfymeri | `docs/decisions/0002`, `DESIGN.md` |
| Färgscheman skrevs in i `config/settings_data.json` med skript, som engångsundantag | Scheman kan bara sättas där. Undantaget är förbrukat | `docs/decisions/0002` |
| Engelska är primärspråk, svenska sekundärt | Ägarens val (PAR-12) | `AGENTS.md` |
| Shopify AI Toolkit + Shopify CLI för allt arbete mot Shopify | Ägarens val | `docs/decisions/0003` |
| Shopify-kopplingen i Claude (`mcp__Shopify__*`) används inte, och butiker slås inte upp via andra kopplingar | Ägarens val | `docs/decisions/0003` |
| Headern byggs med inställningar i stället för ny kod där det går | Håller temat nära Horizon och redigerbart i theme editor | `DESIGN.md` |

## 3. Nuläge

### Fungerar

- `scripts/verify.sh`: 67 JSON-filer giltiga, `sv` och `en` har samma nycklar, theme-check 0 fel och 28 varningar (varningarna fanns i Horizon från början).
- CI-jobbet `verify` är grönt på PR #4.
- AI Toolkits dokumentsökning fungerar i molnsessioner. Det kräver `shopify.dev` i miljöns nätverk och `NODE_USE_ENV_PROXY=1` i `.mcp.json`. Båda är på plats.
- Temat går att ladda upp till dev-butiken från molnet med Theme Access. Kommandot står under "Så laddar du upp temat".
- Temat "Parfymia WIP" finns på dev-butiken, opublicerat, tema-id `162814492757`, uppladdat 2026-11-13 från header-branchen.
  - Förhandsgranskning: `https://devparfymia.myshopify.com?preview_theme_id=162814492757`
  - Editor: `https://devparfymia.myshopify.com/admin/themes/162814492757/editor`

### Påbörjat

- **Header-redesign (PAR-8), PR #4.** Koden är klar och kontrollerad. Den är inte granskad visuellt.
- **Brand-anpassning (PAR-7).** Färger och typsnitt ligger på `main`. Inte granskad visuellt. Inverterad logotyp saknas.
- **PAR-2.** Målgrupp, bildspråk, ton och hörnradier är inte bestämda i `DESIGN.md`.

### Hinder

- **Ingen skärmdump är tagen.** Dev-butikens skyltfönster är lösenordsskyddat, så förhandsgranskningen leder till lösenordssidan. Varken brand-ändringen eller headern är därför sedd av någon agent.
- **`shopify store auth` och `shopify store execute` fungerar inte i molnsessioner.** Inloggningen skickar webbläsaren till `127.0.0.1` på maskinen där CLI:t körs. De fungerar bara på en egen maskin.
- **Spärren blockerar även läsning mot live-butiken.** En ändring till "läsa ja, skriva nej" är framtagen och testad (25 fall), men inte inlagd. Agenter får inte ändra sina egna skyddsregler, så en människa måste lägga in den. Ägaren har fått hela filen i chatten. Den testade kopian låg i sessionens tillfälliga mapp och finns inte kvar i en ny session.
- **Oklart vilken adress som är Parfymias live-butik.** Repot säger `6m05q1-6x`. En annan session uppgav att `6m05q1-6x` är Lilixa och att Parfymia är `ikw71x-m0`. Spärren täcker `parfymia.com` och `6m05q1-6x`, men inte `ikw71x-m0`.
- **Appen är inte skapad.** `npm init @shopify/app@latest` kräver `--organization-id` eller `--client-id` utan interaktiv terminal, alltså ett inloggat Shopify-konto.

### Kända småfel

- `.claude/hooks/guard-bash.mjs` har kvar ett undantag för den gamla, felstavade adressen `dev-parfymia.myshopify.com`. Det påverkar inget.
- Annonsraden visar platshållartexten "Welcome to our store".

### Så laddar du upp temat från en molnsession

Miljön `parfymia-april` har ett Theme Access-lösenord sparat som nätverkshemlighet. Proxyn byter ut platshållaren mot det riktiga värdet, så inget hemligt skrivs i kommandot.

```bash
SHOPIFY_HTTP_PROXY="$HTTPS_PROXY" SHOPIFY_HTTPS_PROXY="$HTTPS_PROXY" \
NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt \
shopify theme push --store=devparfymia.myshopify.com \
  --theme=162814492757 \
  --password shptka_00000000000000000000000000000000
```

Utan proxy-variablerna misslyckas CLI:t med `ENOTFOUND`.

### Fallgropar för nästa agent

- Kommandon som innehåller både `shopify` och live-adressen blockeras av hooken, även testkommandon. Försök inte kringgå det.
- Ändringar i `.claude/hooks/` och `.claude/settings.json` nekas. Ge ägaren ändringen som hel fil i stället.
- `locales/en.default.json` har `//`-kommentarer. Använd `scripts/lib/jsonc.mjs` för att läsa den.
- Kör inte `theme pull` från ett annat tema innan "Parfymia WIP" är granskat. Då skrivs inställningarna över.
- Enda arbetsbranchen i molnsessioner är `claude/magical-cerf-45jri1`. Efter en mergad PR startas den om från `origin/main`.

## 4. Nästa steg

I den här ordningen:

1. **Granska "Parfymia WIP" på dev-butiken.** Startsida, produktsida, kollektion och varukorg i 390, 768 och 1280 px. Titta särskilt på om menyraden bryts med många menypunkter, om land- och språkväljaren ryms bredvid ikonerna, och hur logotypen ser ut på mobil.
2. **Gör det möjligt för agenten att ta skärmdumpar.** Stäng av lösenordsskyddet på dev-butiken, eller spara lösenordet i miljön. Kör sedan skillen `visual-review`.
3. **Rätta det granskningen visar** i `sections/header-group.json` och headerfilerna. Kör `scripts/verify.sh`, pusha, ladda upp temat igen.
4. **Byt annonsradens text** mot butikens eget budskap.
5. **Ladda upp en inverterad logotyp** för mörka scheman (theme editor → Logo).
6. **Merga PR #4** när headern är godkänd. Sätt PAR-8 till klar och bocka av raden i `AGENTS.md`.
7. **Börja med hero och landningssida (PAR-9).**

### Väntar på dig

- Vilken adress har Parfymias live-butik: `6m05q1-6x` eller `ikw71x-m0`? Är det den senare måste spärren och `AGENTS.md` uppdateras.
- Ska spärren ändras till "läsa ja, skriva nej"? I så fall behöver du lägga in ändringen själv.
- Organisationens id för appen, eller kör `npm init @shopify/app@latest` på en egen maskin. Bestäm också var appkoden ska ligga. Temarepot är build-fritt.
- Målgrupp, bildspråk, ton och hörnradier till `DESIGN.md` (PAR-2).
- Branch protection på `main` och `prod` med krav på grön `verify`.
