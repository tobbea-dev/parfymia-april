# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats. Håll den kort: nuläge, inte historik (historiken finns i git).

## Senast (2026-11-11)

Brand-anpassning, del 1: nya färgscheman (salviagrön accent, grönsvart text, varma neutraler) och Playfair Display i rubriker. Riktningen står i `DESIGN.md`, beslutet i `docs/decisions/0002-brand-farger-och-typsnitt.md`.

`config/settings_data.json` ändrades i kod som ett godkänt engångsundantag. Inga Liquid-, CSS- eller JS-filer är ändrade.

Kontroller: `scripts/verify.sh` grön. **Inte visuellt verifierat** — dev-storen nås inte från molnsessionen.

## Agentteamet och GOA-3 (2026-11-12)

- **Agentteam:** sju agenter i `.claude/agents/`, skillen `/agent-team GOA-<nr>`, rollkatalog och loggar i `docs/agent-team/`. Mål ligger som ärenden i Linear-teamet Goal (`GOA-1` till `GOA-7`).
- **GOA-3 Header-redesign:** koden är klar och granskad. Ny sektion `sections/header-topbar.liquid` med blocken `_usp-item` och `_shortcut-link`, och inställningen "Sökvisning på dator" (ikon eller fält) i headern. Åtta nya editor-etiketter i alla 20 `locales/*.schema.json`. Körlogg: `docs/agent-team/runs/2026-11-11-GOA-3.md`.
- **Uppladdad till dev-butiken** som opublicerat tema `Parfymia GOA-3`, id `162800009301`, med ägarens godkännande. Uppdatera samma tema med `--theme 162800009301`, skapa inte ett nytt.
- **Toppfältet syns inte av sig självt.** `sections/header-group.json` ägs av theme editor, så sektionen läggs till där och dras ovanför headern.
- **GOA-2 är ersatt.** Körningen den 11 november landade i "behåll svartvitt". Det gäller inte längre: `docs/decisions/0002-brand-farger-och-typsnitt.md` är beslutet.

### Shopify CLI från molnsessionen

Fungerar för temakommandon sedan 2026-11-12, i miljön `parfymia-april`:

- Dev-butikens permanenta adress är `devparfymia.myshopify.com`, utan bindestreck. Theme Access-lösenordet gäller bara den; med `dev-parfymia.myshopify.com` svarar tjänsten 401.
- Lösenordet ligger som hemlighet i miljön och läggs på av proxyn. Ge `--password` ett platshållarvärde som börjar med `shptka_`.
- Kör med `NODE_USE_ENV_PROXY=1`, annars går CLI förbi proxyn och ger `ENOTFOUND`.
- Miljöns nätverk tillåter `dev-parfymia`, `devparfymia`, `cdn.shopify.com`, `shopify.dev` och `theme-kit-access.shopifyapps.com`.
- Ett `ECONNRESET` efter utskriften är ofarligt.

### Motsägelse om `6m05q1-6x.myshopify.com`

`AGENTS.md`, `README.md` och hooken anger adressen som Parfymias live-butik. När adressen anropades från molnsessionen den 12 november ledde den vidare till `lilixa.store`. Båda uppgifterna kan inte stämma. Ägaren behöver avgöra vilken som gäller. Tills dess: adressen är spärrad i hooken och borttagen ur miljöns nätverk, så inget kan pushas dit. `kpm6zp-2n.myshopify.com` ska inte användas (ägarens beslut 2026-11-12).

## GOA-4 Startsida (2026-11-13)

- **Byggt:** `templates/index.json` har fem sektioner i ordning: hero (orörd), kategoriingångar, varumärkesrad, bästsäljare, nyheter. Bara befintliga Horizon-sektioner och block. Ingen ny kod, inga locale-ändringar. Körlogg: `docs/agent-team/runs/2026-11-13-GOA-4.md`.
- **Uppladdat 2026-11-13** till dev-butikens opublicerade tema `Parfymia GOA-3` (`162800009301`) med ägarens godkännande, från commit `829c9e4`. Temat har nu header (GOA-3), startsida (GOA-4) och brand-färgerna från `main`. Nästa uppladdning skriver över inställningar som gjorts i theme editor i det temat; kör `theme pull` först om de ska behållas.
- **Inte sett renderat.** Layouten på mobil och dator är slutsats av kodläsning.
- **Görs i theme editor innan temat publiceras:**
  1. Hero: bild och kampanjbudskap.
  2. Fem kategorier: bild, rubrik och länk. Sätt länken på gruppen (rutan), lämna bildens länk tom, annars blir det två klickytor.
  3. Sex varumärken: logotyp och länk. Alt-text sätts på bildfilen under Innehåll → Filer, annars får länken inget namn för skärmläsare.
  4. Kollektion för bästsäljare och för nyheter. Båda pekar på `all` och visar samma sak tills dess. Rubriken följer kollektionens namn.
  5. Texterna är på engelska ("Shop by category", "Our brands", "Perfume" …). Skriv om dem eller översätt i butiken.
- **Platshållarbilder syns för kunden** tills alla elva bilder är valda.
- **Känd brist:** när en grupp har länk renderar `snippets/group.liquid` en länk utan text eller `aria-label`. Kräver kodändring och är inte gjord.

## GOA-5 Kategorinavigation (2026-11-13)

- **Menyn är inte kod.** Horizon bygger huvudmenyn, megamenyn och mobillådan från butikens navigation (`main-menu`). Ägarens beslut: sju toppnivåpunkter (Parfym, Hårvård, Hudvård, Makeup, Grooming, Varumärken, Mer), två nivåer, undermeny med bara text. Förslag på underkategorier och steg i Shopify admin och theme editor står i `docs/agent-team/runs/2026-11-13-GOA-5.md`, avsnitt C och D.
- **Rättat i kod:** Escape stänger megamenyn, överskottsknappen är en riktig knapp med tillstånd, aktuell sida markeras i megamenyn, fokus återgår till menyknappen när lådan stängs, och animationerna följer "minska rörelse". Ändringarna ligger i sex av Horizons filer och är märkta `Parfymia GOA-5:`.
- **"Fler" i stället för "Mer"** på Horizons överskottsknapp (svenska), även på filterraden på kollektionssidor.
- **Uppladdat 2026-11-13** till dev-butikens opublicerade tema `Parfymia GOA-3` (`162800009301`) med ägarens godkännande, från commit `48f33c2`. Uppladdningen skrev över menyinställningarna i temat med repots (`menu_style: featured_products`, `menu_row: top`, `menu_position: left`), så undermeny och placering ställs in i theme editor efteråt.
- **Inte provat i butik.** Rättningarna är körda i en förenklad testsida i Chromium. Skärmläsare, Safari och pekskärm är oprovade.
- **Känt fel i Horizon, inte rättat:** stängs lådan med menyknappen och öppnas igen med menyknappen kan andra trycket gå förlorat. Prova i butiken.
- **Inte rättat, kräver ombyggnad:** mobillådan är inte en dialog för hjälpmedel (I4 i körloggen).

## Nästa steg

1. Pusha branchen till dev-storen som opublicerat tema och titta på startsida, produktsida, kollektion och varukorg i 390/768/1280 px. Gör detta **innan** någon kör `theme pull`.
2. Bekräfta i förhandsgranskningen att rubrikerna visas i Playfair Display (typsnittsnamnet är kontrollerat mot Shopifys dokumentation, renderingen är inte sedd).
3. Ladda upp en inverterad logotyp för mörka scheman (theme editor → Logo).
4. Ta ställning till hörnradier (förslag i `DESIGN.md` → Riktning).
5. Ställ in header (GOA-3) och startsida (GOA-4) i theme editor i temat `Parfymia GOA-3`.

## Öppna frågor / väntar på människa

- Målgrupp, referenser, bildspråk och ton är inte ifyllda i `DESIGN.md`.
- Installera Claude GitHub-appen + secret `ANTHROPIC_API_KEY` om `@claude` ska fungera i PR:er.
- Secret `SHOPIFY_CLI_THEME_TOKEN` (Theme Access) om CI ska pusha `main` till "Parfymia WIP" eller köra Lighthouse.
- Branch protection på `main` och `prod` med krav på grönt "Theme check".
- `visual-review` från molnet: dev-butiken nås nu, men skyltfönstret är lösenordsskyddat. Skärmdumpar kräver butikens lösenord till lösenordssidan, sparat som hemlighet.
