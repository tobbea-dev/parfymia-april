# 0003 — Shopify AI Toolkit + Shopify CLI

Datum: 2026-11-11

## Beslut

Arbete mot Shopify i det här projektet görs med **Shopify AI Toolkit** och **Shopify CLI**.

- **AI Toolkit** (Shopify Dev MCP, `shopify-dev` i `.mcp.json`) är källan för Shopify-fakta: Liquid, temaschema, Admin API. Frågor och kod valideras där innan de körs.
- **Shopify CLI** är verktyget som utför: `shopify theme …` för temat, `shopify store auth` och `shopify store execute` för läsning och ändringar i en butik, `shopify app …` för appar.

Beslutat av repo-ägaren.

## Tillägg 2026-11-12: Shopify-kopplingen i Claude används inte

Shopify-kopplingen i Claude (connectorn, verktygen `mcp__Shopify__*`) ska **inte** användas i det här projektet — inte för att läsa butiksdata, inte för att slå upp butiker och inte för ändringar. All kontakt med Shopify går via AI Toolkit + Shopify CLI. Beslutat av repo-ägaren.

## Vad det innebär

- Butiksåtkomst går via CLI:ts egen inloggning (`shopify store auth --store <butik> --scopes <rättigheter>`), med minsta möjliga rättigheter. En egen app behövs inte för att läsa eller ändra i en butik; den behövs först när något ska byggas (tillägg, Functions, adminsida).
- Andra vägar in i butiken — egna skript mot Admin API, sparade klient-id och hemligheter, andra kopplingar — används inte för det här repot om inte ett nytt beslut säger det.
- Shopify-fakta gissas inte och hämtas inte ur modellens minne.

## Inte avgjort

- **Live-butiken.** `6m05q1-6x.myshopify.com` är live-butiken, och hooken `.claude/hooks/guard-bash.mjs` blockerar alla CLI-kommandon mot den. Ska Toolkit-flödet användas där måste spärren ändras, till exempel så att läsning tillåts men `--allow-mutations` och temaskrivningar fortsatt blockeras. Det beslutet är inte fattat.
- **Inloggning från molnsessioner fungerar inte.** Utrett 2026-11-12 mot dev-butiken: `shopify store auth` skickar webbläsaren tillbaka till `http://127.0.0.1:<port>/auth/callback` på den maskin där CLI:t körs. I en molncontainer når din webbläsare inte den adressen, så inloggningen kan inte slutföras oavsett nätverksinställningar. Med `--no-input` vägrar kommandot helt. `shopify store auth` och `shopify store execute` fungerar därför bara på en egen maskin.
- **Möjlig väg för temakommandon i molnet.** `shopify theme push/pull` kan köras utan webbläsare med ett Theme Access-lösenord. Det kräver att butikens ägare skapar lösenordet, att det sparas i miljön och att `theme-kit-access.shopifyapps.com` tillåts. Inte provat.
- **Nätverk.** I miljön `parfymia-april` nås dev-butiken och Shopifys CDN. `accounts.shopify.com`, `admin.shopify.com`, `partners.shopify.com`, `dev.shopify.com`, `shopify.dev` och `theme-kit-access.shopifyapps.com` nås inte. Utan `shopify.dev` fungerar inte AI Toolkits dokumentsökning.
- **En app** via `npm init @shopify/app@latest` är begärd men inte skapad. Kommandot provades i molnsessionen 2026-11-12 och avbröts: utan interaktiv terminal kräver det `--organization-id` eller `--client-id`, det vill säga ett inloggat Shopify-konto. Det behöver köras på en egen maskin, eller med organisationens id angivet. Var koden ska ligga är också öppet: temarepot är build-fritt enligt `AGENTS.md`.
