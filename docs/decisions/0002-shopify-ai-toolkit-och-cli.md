# 0002 — Shopify AI Toolkit och Shopify CLI

Datum: 2026-11-12

## Bakgrund

Under GOA-3 (header-redesign) fanns flera vägar att slå upp Shopify-fakta, validera temakod och nå butiker: allmän modellkunskap, olika plugins, butikskopplingar och Shopifys egna verktyg. Flera vägar ger olika svar och gör det oklart vad som är verifierat.

## Beslut

Shopify-arbete i det här repot görs med två verktyg:

1. **Shopify AI Toolkit** (MCP-servern `shopify-dev`, konfigurerad i `.mcp.json`) för att slå upp och validera. Liquid-objekt, filter, schema och API:er slås upp där, inte ur minnet. Nya och ändrade temafiler valideras med `validate_theme` innan de granskas.
2. **Shopify CLI** för allt som körs mot temat eller en butik: `shopify theme check` (via `scripts/verify.sh`), `shopify theme dev`, `shopify theme push` och `shopify theme pull`.

## Konsekvenser

- `theme-developer` slår upp i Toolkit innan ny Liquid eller nytt schema skrivs. `tester` kör både `scripts/verify.sh` och `validate_theme`.
- Andra Shopify-kopplingar (butiksadmin-kopplingar, sidbyggare, tredjepartsplugins) används inte för temaarbete utan ett nytt beslut.
- Spärrarna i `.claude/hooks/` gäller oförändrat för CLI: ingen push till live-butiken, och push till andra butiker kräver människans godkännande.
- Nycklar och tokens för butiker läggs som hemligheter i miljöns inställningar. De skrivs aldrig i chatten, i repot eller i loggar.
- Går Toolkit inte att nå i en session rapporteras valideringen som overifierad. Den ersätts inte tyst av något annat.
