# HANDOFF.md

Överlämning från molnsessionen "Setup-planering" (2026-11-11 till 2026-11-23). Skriven 2026-11-23. Ersätter tidigare innehåll i filen. Historiken finns i git och i `docs/agent-team/runs/`.

Sessionen arbetade i två repon: `tobbea-dev/parfymia-april` (huvudspåret) och `tobbea-dev/stilfy-theme` (startat härifrån, sedan överlämnat). Den här filen gäller Parfymia. Stilfy har en egen `HANDOFF.md` i sitt repo, som är nyare än det som står om Stilfy här.

## 1. Mål och kontext

**Parfymia.** Shopify-tema för en svensk e-handel inom skönhet, byggt på Horizon (Online Store 2.0), utan build-steg. Regler och konventioner står i `AGENTS.md`, designen i `DESIGN.md`.

**Vad sessionen skulle göra:**

1. Sätta upp ett agentteam enligt mallen "Self-Improving Agent Team": 30 rollkontrakt, sju körbara agenter, loopen Observe, Plan, Execute, Verify, Record. Autonomi: Supervised. Teamet arbetar på feature-gren och draft-PR. Ägaren godkänner merge och varje uppladdning till butik.
2. Använda Linear-teamet Goal (`GOA`) som mål-kö.
3. Köra målen GOA-2 (brand), GOA-3 (header), GOA-4 (startsida) och GOA-5 (kategorinavigation) med `/agent-team GOA-<nr>`.

**Stilfy** tillkom 2026-11-13: tema för en ny modebutik (Linear WHI-51). Sessionen satte upp repot och undersökte förlagan Cider, och lämnade sedan över till en egen session.

**Ägarens stående regler:**

- Shopify AI Toolkit (MCP-servern `shopify-dev`) och Shopify CLI är verktygen. Shopify-kopplingen i Claude (`mcp__Shopify__*`) används inte, inte ens för läsning.
- Inga hemligheter i chatten. Lösenord går via det säkra formuläret eller miljöns inställningar.
- Aldrig push till `main`, `prod` eller live-butiken. Aldrig manuell ändring i `config/settings_data.json`.
- `scripts/`, `.theme-check.yml`, `.claude/settings.json` och `.claude/hooks/` ändras inte utan godkännande.
- Butiken `kpm6zp-2n.myshopify.com` ska inte användas.
- Svar till ägaren skrivs på svenska.

## 2. Gjorda ändringar och beslut

Allt nedan ligger på grenen `claude/magical-lamport-9omg9p`, i draft-PR #2 (https://github.com/tobbea-dev/parfymia-april/pull/2). Senaste commit: `2526983`.

### Agentteamet

| Vad | Var |
|---|---|
| Sju agenter: planner, theme-developer, i18n, tester, reviewer, security, docs-writer | `.claude/agents/` |
| Orkestrering, Linear-tabell, spärrar, leveransformat | `.claude/skills/agent-team/SKILL.md` |
| 30 rollkontrakt | `docs/agent-team/roles.md` |
| Baslinje, minne, förbättringslogg, referensuppgift | `docs/agent-team/` |
| Körloggar | `docs/agent-team/runs/` |
| Filer som aldrig laddas upp till butiken | `.shopifyignore` |

Beslut och skäl:

- **Sju agenter, inte 30.** Katalogen beskriver alla roller, men bara de som behövs för ett Shopify-tema är körbara. Högst fem agenter per mål, högst två omförsök per steg.
- **Granskaren får bara diffen och uppgiftstexten**, aldrig utvecklarens förklaringar. Annars bekräftar den bara det den får höra.
- **`theme-developer` och `tester` har Shopify AI Toolkit i sin verktygslista.** Utan det nådde underagenterna inte MCP-servern.

### GOA-2 Brand

Körningen den 11 november landade i "behåll svartvitt". Den är ersatt: `main` fick salviagrön accent och Playfair Display via PR #3 från en annan session. Beslutet står i `docs/decisions/0002-brand-farger-och-typsnitt.md`.

### GOA-3 Header

- Ny sektion `sections/header-topbar.liquid` med blocken `blocks/_usp-item.liquid` och `blocks/_shortcut-link.liquid`.
- Ny inställning `search_display` (ikon eller fält) i `sections/header.liquid`, och ett sökfält i `snippets/search.liquid` som öppnar den befintliga sökmodalen.
- Åtta nya editor-etiketter i alla 20 `locales/*.schema.json`. En ny schema-nyckel måste finnas i alla 20, annars fäller theme-check.
- Toppfältet är en egen sektion, så att `header.liquid`, sticky header och mobilgriden inte påverkas. Det syns inte förrän det läggs till i theme editor.

### GOA-4 Startsida

- Bara `templates/index.json` ändrad: hero (orörd), kategoriingångar, varumärkesrad, bästsäljare, nyheter. Ingen ny kod, inga locale-ändringar.
- Kategorigrupperna har egen bredd 28 %. Bredd "fyll" ger `flex: 1` och då har mobilbredden ingen effekt (granskarens fynd).
- Listrubrikerna följer kollektionens namn, enligt ägarens beslut.

### GOA-5 Kategorinavigation

- Horizon bygger menyn från butikens navigation (`main-menu`). Menyn är alltså inte kod och kan inte skapas av teamet.
- Ägarens beslut: sju toppnivåpunkter (Parfym, Hårvård, Hudvård, Makeup, Grooming, Varumärken, Mer), två nivåer, undermeny med bara text. Varumärken bestäms senare.
- Rättat i sex av Horizons filer, märkt `Parfymia GOA-5:` i koden: Escape stänger megamenyn, överskottsknappen är en riktig knapp med `aria-expanded`, `aria-current` i megamenyn, fokus återgår när mobillådan stängs, animationerna följer "minska rörelse".
- Filer: `assets/header-menu.js`, `assets/header-drawer.js`, `blocks/_header-menu.liquid`, `snippets/header-drawer.liquid`, `snippets/mega-menu-list.liquid`, `sections/header.liquid`.
- `actions.more` på svenska är "Fler" i stället för "Mer" (`locales/sv.json`), även på filterraden på kollektionssidor.
- Lärdom: sätt aldrig `transition: none` på ett element som Horizons JS väntar på via `onAnimationEnd`. Använd `transition-duration: 1ms`.
- Förslag på underkategorier och steg i Shopify admin: `docs/agent-team/runs/2026-11-13-GOA-5.md`, avsnitt C och D.

### Butiksåtkomst från molnet

- Molnmiljön heter `parfymia-april`. Tillåtna adresser: `dev-parfymia.myshopify.com`, `devparfymia.myshopify.com`, `cdn.shopify.com`, `shopify.dev`, `theme-kit-access.shopifyapps.com`, samt Cider-adresserna som lades till för Stilfy-undersökningen.
- Theme Access-lösenordet ligger som hemlighet i miljön och läggs på av proxyn.
- Shopify CLI körs med `NODE_USE_ENV_PROXY=1`, mot den permanenta adressen `devparfymia.myshopify.com` (utan bindestreck), med ett platshållarvärde som börjar med `shptka_` i `--password`. Ett `ECONNRESET` efter utskriften är ofarligt.
- Dev-temat heter `Parfymia GOA-3`, id `162800009301`, opublicerat. Uppdatera det med `--theme 162800009301`, skapa inte ett nytt.
- `6m05q1-6x.myshopify.com` är borttagen ur miljöns nätverk och spärrad i hooken.

### Stilfy (överlämnat)

- Repot `tobbea-dev/stilfy-theme` skapades av ägaren. Sessionen gjorde första commiten (`a27c76e`): regler, spärrar, kontroller och marknadsundersökningen med Cider som förlaga.
- Beslut: tema, inte Hydrogen. Grund: Horizon. Förlaga: Cider. Egen molnmiljö `stilfy-theme`.
- Den här sessionen kan inte byta miljö, eftersom den fick utökad behörighet när ägaren godkände kontakt med sessioner på Macen. Därför startades en ny session, "Stilfy-tema (WHI-51)", i miljön `stilfy-theme`.
- Läget 2026-11-23, läst från GitHub och inte från butiken: `main` i Stilfy-repot är en ögonblicksbild av live-temat från 2026-11-17. Horizon (`190647468274`) är publicerat. Arbetet har gjorts direkt i live-temat från en session på ägarens Mac. Öppna draft-PR:er: #2, #7, #9 och #10. Sessionen "Stilfy-tema (WHI-51)" är fortfarande igång.

## 3. Nuvarande status

### Fungerar

- `bash scripts/verify.sh` är grön: 67 JSON-filer, `sv` och `en` i synk, theme-check 0 fel och 28 varningar (samma som baslinjen, inga i ändrade filer).
- CI (`verify`) var grön på `2526983` den 13 november.
- PR #2 är öppen som utkast. `main` har inte rört sig sedan PR #3, så grenen innehåller hela `main`.
- GOA-3, GOA-4 och GOA-5 är granskade och godkända av den oberoende granskaren, och uppladdade till `Parfymia GOA-3` den 13 november från commit `48f33c2`.
- Linear: GOA-3, GOA-4 och GOA-5 står som In Review.

### Inte verifierat

- **Ingen har sett temat renderat.** Layout på mobil och dator är slutsats av kodläsning. Dev-butikens skyltfönster är lösenordsskyddat, så inga skärmdumpar finns.
- GOA-5 är bara kört i en förenklad testsida i Chromium. Safari, Firefox, pekskärm och skärmläsare är oprovade.
- Översättningarna av editor-etiketterna till 18 språk har ingen modersmålstalare läst.
- Om något har ändrats i dev-temat i theme editor sedan 13 november är inte mätt.

### Kända fel och brister

- Platshållarbilder syns för kunden på startsidan tills alla elva bilder är valda.
- När en grupp har länk renderar `snippets/group.liquid` en länk utan text eller `aria-label`.
- Kategorirutorna blir små på mobil (tre plus två, cirka 100 px vid 390 px skärm).
- Mobillådan är inte en dialog för hjälpmedel. Kräver ombyggnad.
- Tre mindre anmärkningar från omgranskningen av GOA-5: Escape kan flytta fokus till en hovrad toppnivåpunkt, Escape kan sluta fungera om menyn kopplas ur och in igen, och första Enter på "Fler" efter Tab stänger panelen som fokus just öppnade.
- Ett fel som fanns i Horizon före ändringen: stängs mobillådan med menyknappen och öppnas igen med menyknappen kan andra trycket gå förlorat. Sett i testsidan, inte bekräftat i butik.

### Hinder och risker

- **PR #4 "Header-redesign för Parfymia"** är en öppen draft-PR från en annan session (grenen `claude/magical-cerf-45jri1`, senast ändrad 13 november). Den rör samma område som GOA-3 i PR #2. De två är inte jämförda. Mergas båda blir det troligen konflikter i headern.
- **`theme push` skriver över theme editor.** Repots `sections/header-group.json` har `menu_style: featured_products`, `menu_row: top`, `menu_position: left`. Kör `theme pull` före nästa uppladdning om inställningar i temat ska behållas.
- **Motsägelse om live-butiken.** `AGENTS.md`, `README.md` och hooken anger `6m05q1-6x.myshopify.com` som Parfymias live-butik. Den 12 november ledde adressen till `lilixa.store`. `ikw71x-m0.myshopify.com` har också uppgetts vara Parfymias butik. Ägaren har inte avgjort vilken som gäller.
- **Sessionen är låst till ägarens betrodda enheter** och kan inte flyttas till en annan molnmiljö.
- **En privat Storefront-token klistrades in i chatten** den 13 november. Om den är utbytt är inte kontrollerat.
- Containern startar om ofta och går då in i planläge. Committa och pusha efter varje steg.

## 4. Nästa steg

### För ägaren

1. Avgör PR #2 mot PR #4: vilken header som gäller, och i vilken ordning de mergas.
2. Titta på `Parfymia GOA-3` i dev-butiken på 390, 768 och 1280 px. Förhandsvisning: `https://devparfymia.myshopify.com?preview_theme_id=162800009301`.
3. Shopify admin: skapa kollektionerna och lägg in huvudmenyn i två nivåer. Bestäm Varumärken och vart "Mer" länkar.
4. Theme editor, header: logo i mitten, meny centrerad på nedre raden, undermeny utan medietyp, sökvisning "fält", lägg till Toppfält ovanför headern.
5. Theme editor, startsida: heroens bild och budskap, bild, rubrik och länk för fem kategorier (länken på gruppen, inte på bilden), logotyp och länk för sex varumärken, kollektion för bästsäljare och nyheter, och skriv om de engelska texterna.
6. Prova menyn med bara tangentbord på dator och mobil. Det är GOA-5:s fjärde kriterium.
7. Merga PR #2. Därefter sätts GOA-3, GOA-4 och GOA-5 till Done i Linear.
8. Avgör vilken butik som är Parfymias live-butik, och byt ut den privata Storefront-token.

### För nästa session

1. Läs `AGENTS.md`, `DESIGN.md`, den här filen och `docs/agent-team/memory.md`. Hämta `main` och slå ihop om den har rört sig.
2. Kör `bash scripts/verify.sh` och jämför med baslinjen i `docs/agent-team/baseline.md`.
3. Läs PR #2 och PR #4: CI, mergebarhet och kommentarer. Jämför headerändringarna i de två och rapportera skillnaderna till ägaren innan något ändras.
4. Om ägaren har ställt in temat i theme editor: `shopify theme pull --theme 162800009301` till grenen, så att inställningarna inte skrivs över vid nästa uppladdning. Kräver ägarens godkännande, eftersom det rör `config/settings_data.json` och `sections/*-group.json`.
5. Nästa mål i kön är produktsidan och språkgenomgången (se statuslistan i `AGENTS.md` och ärendena GOA-6 och GOA-7 i Linear). Starta med `/agent-team GOA-<nr>`.
6. Möjliga egna ärenden ur granskningarna: mobillådan som riktig dialog, länken utan namn i `snippets/group.liquid`, och felet med andra trycket på menyknappen om det bekräftas i butik.

## Var saker finns

| Vad | Var |
|---|---|
| Regler och konventioner | `AGENTS.md`, `CLAUDE.md` |
| Design | `DESIGN.md` |
| Beslut | `docs/decisions/0001` till `0003` |
| Agentteamets minne | `docs/agent-team/memory.md` |
| Körloggar | `docs/agent-team/runs/2026-11-11-GOA-3.md`, `2026-11-13-GOA-4.md`, `2026-11-13-GOA-5.md` |
| Spärrar | `.claude/hooks/guard-bash.mjs`, `.claude/hooks/guard-files.mjs`, `.claude/settings.json` |
| Kontroller | `scripts/verify.sh` |
| Mål-kö | Linear, team Goal (`GOA-1` till `GOA-7`) |
| Stilfy | repot `tobbea-dev/stilfy-theme`, dess `HANDOFF.md`, sessionen "Stilfy-tema (WHI-51)" |
