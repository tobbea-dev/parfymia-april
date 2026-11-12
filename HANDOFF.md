# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats. Håll den kort: nuläge, inte historik (historiken finns i git).

## Senast (2026-11-12)

**GOA-3 Header-redesign: koden är klar och granskad, inget är kontrollerat i en butik.**

- Ny sektion `sections/header-topbar.liquid` för header-gruppen, med blocken `_usp-item` (ikon, text, valfri länk) och `_shortcut-link` (text, länk, framhäv).
- Ny inställning i headern, "Sökvisning på dator": ikon (standard) eller fält. Fältet är en knapp som öppnar den befintliga sökmodalen.
- Åtta nya editor-etiketter i alla 20 `locales/*.schema.json`.
- Kontroller: verify grön (theme-check 0 fel, 28 varningar som i baslinjen), Shopify AI Toolkit VALID, granskaren GODKÄND efter en rättningsomgång. Se `docs/agent-team/runs/2026-11-11-GOA-3.md`.

**Toppfältet syns inte av sig självt.** `sections/header-group.json` ägs av theme editor, så sektionen måste läggas till där och dras ovanför headern.

Beslut: Shopify AI Toolkit och Shopify CLI är verktygen för Shopify-arbete, och Shopify-kopplingen i Claude ska inte användas (`docs/decisions/0002-shopify-ai-toolkit-och-cli.md`).

Sedan tidigare: agentteamet (sju agenter, `/agent-team`, Linear-teamet Goal), och GOA-2 där färger och logo behålls och rubriktypsnittet ska bytas till en serif i theme editor.

## Nästa steg

1. Fyll i **Riktning** i `DESIGN.md` — det blockerar brand-anpassningen.
2. Brand-anpassning av färger, typsnitt, logo (via theme editor + `settings_schema.json`).
3. Header-redesign.

## Öppna frågor / väntar på människa

- **GOA-3, i theme editor:** logo i mitten, meny på nedre raden och i mitten, sökvisning "fält", lägg till toppfältet ovanför headern, fyll i USP:ar, genvägar och meddelandetext. Kontrollera mobil och dator.
- **Butiker (kontrollerat 2026-11-12 från molnsessionen):**
  - `dev-parfymia.myshopify.com` svarar och leder till en lösenordssida. Det är dev-butiken enligt `AGENTS.md`. Förhandsvisning av GOA-3 görs här, som opublicerat tema och efter ägarens godkännande.
  - `6m05q1-6x.myshopify.com` leder vidare till `lilixa.store`. Det är Lilixas butik, inte Parfymias. **Pusha inte Parfymia-temat dit.** Adressen togs bort ur miljöns nätverkslista 2026-11-12 på ägarens begäran.
  - `ikw71x-m0.myshopify.com` uppges vara Parfymias butik. Dev eller live är inte klarlagt, och den ligger inte i miljöns nätverkslista.
  - `kpm6zp-2n.myshopify.com` ska inte användas (ägarens beslut 2026-11-12).
- **Inloggning i dev-butiken fungerar från molnet (2026-11-12).** Butikens permanenta adress är `devparfymia.myshopify.com`, utan bindestreck. Theme Access-lösenordet gäller bara den adressen; med `dev-parfymia.myshopify.com` avvisas det. `shopify theme list` visar tre teman: `test-data` (live), `Horizon` och `debut-vintage-theme` (opublicerade).
- **Shopify CLI i molnet går förbi proxyn som standard.** Kör kommandon med `NODE_USE_ENV_PROXY=1`, annars blir det `ENOTFOUND`. Lösenordet injiceras av proxyn; ge `--password` ett platshållarvärde som börjar med `shptka_`. Exempel: `NODE_USE_ENV_PROXY=1 shopify theme list --store devparfymia.myshopify.com --password shptka_proxyinjected000000000000000000`. Ett `ECONNRESET` efter utskriften är ofarligt.
- **GOA-2:** välj serif för rubriker i theme editor.

- Agentteamet har inte kört ett riktigt mål än. `planner`, `theme-developer`, `i18n` och `docs-writer` är oprovade, och ingen förbättringsiteration är gjord.

- Installera Claude GitHub-appen + secret `ANTHROPIC_API_KEY` om `@claude` ska fungera i PR:er.
- Secret `SHOPIFY_CLI_THEME_TOKEN` (Theme Access) om CI ska pusha `main` till "Parfymia WIP" eller köra Lighthouse.
- Branch protection på `main` och `prod` med krav på grönt "Theme check".
- **Varför molnsessionen inte når butiker (utrett 2026-11-12):**
  - Sessionen kördes i miljön "Default", vars nätverk bara tillåter två Hostinger-adresser. Alla Shopify-adresser avvisas av proxyn (`shopify.dev`, `accounts.shopify.com`, `admin.shopify.com`, `cdn.shopify.com`, `theme-kit-access.shopifyapps.com` och butikerna).
  - Miljön "parfymia-april" finns och tillåter `dev-parfymia.myshopify.com`, `6m05q1-6x.myshopify.com` och `cdn.shopify.com`, men sessionen startades inte i den. Den saknar `shopify.dev` och `theme-kit-access.shopifyapps.com` och har ingen hemlighet.
  - Shopify CLI har ingen inloggning i molnet. `shopify auth login` kräver en webbläsare; i molnet behövs en Theme Access-token.
  - Shopify AI Toolkit: `validate_theme` fungerar (körs lokalt). Dokumentsökningen fungerar inte, eftersom `shopify.dev` är spärrad. Toolkit loggar aldrig in i en butik; det gör bara CLI.
- Finns en inverterad logotyp för mörka bakgrunder?
