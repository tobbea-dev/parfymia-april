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
- **Temakommandon i molnet fungerar med Theme Access.** Provat 2026-11-13 mot dev-butiken `devparfymia.myshopify.com`: `shopify theme list` och `shopify theme push --unpublished` går igenom. Tre saker krävs:
  1. Ett Theme Access-lösenord för butiken, sparat som nätverkshemlighet i miljön för `theme-kit-access.shopifyapps.com`. Proxyn lägger på det riktiga värdet, så kommandot körs med ett platshållarvärde: `--password shptka_` följt av 32 nollor.
  2. `theme-kit-access.shopifyapps.com` och butikens adress tillåtna i miljöns nätverk.
  3. CLI:t styrt genom proxyn: `SHOPIFY_HTTP_PROXY` och `SHOPIFY_HTTPS_PROXY` satta till värdet i `HTTPS_PROXY`, samt `NODE_USE_ENV_PROXY=1` och `NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt`. Utan dem misslyckas CLI:t med `ENOTFOUND`.
- **Förhandsgranskning i molnet fungerar inte än.** Dev-butikens skyltfönster är lösenordsskyddat, så förhandsgranskningslänken leder till lösenordssidan. Skärmdumpar kräver att skyddet stängs av på dev-butiken eller att lösenordet sparas i miljön.
- **Nätverk.** I miljön `parfymia-april` nås dev-butiken, Shopifys CDN och sedan 2026-11-12 `shopify.dev`. `accounts.shopify.com`, `admin.shopify.com`, `partners.shopify.com`, `dev.shopify.com` och `theme-kit-access.shopifyapps.com` nås inte.

## AI Toolkits dokumentsökning i molnsessioner

Sökningen (`search_docs_chunks`) krävde två saker, lösta 2026-11-12:

1. `shopify.dev` tillåten i miljöns nätverk.
2. `NODE_USE_ENV_PROXY=1` för MCP-servern i `.mcp.json`. Molnsessioner når nätet via en proxy, och Nodes inbyggda `fetch` använder den inte utan den inställningen. Lokalt, utan proxy, har den ingen effekt.

En redan startad session behöver startas om för att MCP-servern ska läsa in den nya inställningen.
- **En app** via `npm init @shopify/app@latest` är begärd men inte skapad. Kommandot provades i molnsessionen 2026-11-12 och avbröts: utan interaktiv terminal kräver det `--organization-id` eller `--client-id`, det vill säga ett inloggat Shopify-konto. Det behöver köras på en egen maskin, eller med organisationens id angivet. Var koden ska ligga är också öppet: temarepot är build-fritt enligt `AGENTS.md`.
