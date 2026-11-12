# 0003 — Shopify AI Toolkit + Shopify CLI

Datum: 2026-11-11

## Beslut

Arbete mot Shopify i det här projektet görs med **Shopify AI Toolkit** och **Shopify CLI**.

- **AI Toolkit** (Shopify Dev MCP, `shopify-dev` i `.mcp.json`) är källan för Shopify-fakta: Liquid, temaschema, Admin API. Frågor och kod valideras där innan de körs.
- **Shopify CLI** är verktyget som utför: `shopify theme …` för temat, `shopify store auth` och `shopify store execute` för läsning och ändringar i en butik, `shopify app …` för appar.

Beslutat av repo-ägaren.

## Vad det innebär

- Butiksåtkomst går via CLI:ts egen inloggning (`shopify store auth --store <butik> --scopes <rättigheter>`), med minsta möjliga rättigheter. En egen app behövs inte för att läsa eller ändra i en butik; den behövs först när något ska byggas (tillägg, Functions, adminsida).
- Andra vägar in i butiken — egna skript mot Admin API, sparade klient-id och hemligheter, andra kopplingar — används inte för det här repot om inte ett nytt beslut säger det.
- Shopify-fakta gissas inte och hämtas inte ur modellens minne.

## Inte avgjort

- **Live-butiken.** `6m05q1-6x.myshopify.com` är live-butiken, och hooken `.claude/hooks/guard-bash.mjs` blockerar alla CLI-kommandon mot den. Ska Toolkit-flödet användas där måste spärren ändras, till exempel så att läsning tillåts men `--allow-mutations` och temaskrivningar fortsatt blockeras. Det beslutet är inte fattat.
- **Inloggning från molnsessioner.** CLI:t loggar in via webbläsare, och Shopifys inloggningsadresser är inte tillåtna i molnmiljön än. Tills det är löst fungerar `shopify store auth` bara på en egen maskin.
- **En app** via `npm init @shopify/app@latest` är begärd men inte skapad. Kommandot provades i molnsessionen 2026-11-12 och avbröts: utan interaktiv terminal kräver det `--organization-id` eller `--client-id`, det vill säga ett inloggat Shopify-konto. Det behöver köras på en egen maskin, eller med organisationens id angivet. Var koden ska ligga är också öppet: temarepot är build-fritt enligt `AGENTS.md`.
