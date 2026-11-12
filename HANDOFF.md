# HANDOFF.md

Överlämning mellan sessioner. Uppdateras i slutet av varje session där något ändrats. Håll den kort: nuläge, inte historik (historiken finns i git).

## Senast (2026-11-12)

Header-redesign, del 1: logotyp i mitten, huvudmenyn centrerad på egen rad i versaler, mörk annonsrad, tunn linje under headern, fäst header som visas vid skroll uppåt, dragspelsmeny på mobil. Allt är inställningar i `sections/header-group.json`.

En kodändring: menyblocket har fått inställningen "Letter spacing" (`blocks/_header-menu.liquid`, `snippets/menu-font-styles.liquid`, `snippets/header-drawer.liquid`). Etiketterna återanvänder befintliga översättningsnycklar, så inga nya strängar.

Sedan tidigare på `main`: brand-färger och Playfair Display i rubriker, engelska som primärspråk, beslutet om Shopify AI Toolkit + CLI.

Kontroller: `scripts/verify.sh` grön. **Varken brand-ändringen eller headern är visuellt verifierad** — CLI-inloggning mot en butik går inte att slutföra från en molnsession (se `docs/decisions/0003`).

## Nästa steg

1. Pusha `main` till dev-storen som opublicerat tema och titta på startsida, produktsida, kollektion och varukorg i 390/768/1280 px. Gör detta **innan** någon kör `theme pull`, annars skrivs inställningarna över.
2. Kontrollera särskilt headern: att den nedre raden inte bryts med många menypunkter, och hur land/språk-väljaren ryms bredvid ikonerna.
3. Byt annonsradens platshållartext mot butikens eget budskap.
4. Ladda upp en inverterad logotyp för mörka scheman (theme editor → Logo).
5. Därefter: hero och landningssida (PAR-9).

## Öppna frågor / väntar på människa

- Vilken adress har Parfymias live-butik: `6m05q1-6x` (står i repot) eller `ikw71x-m0`?
- Spärren blockerar även läsning mot live-butiken. Ändringen till "läsa ja, skriva nej" är framtagen men inte inlagd; agenter får inte ändra sina egna skyddsregler.
- Målgrupp, referenser, bildspråk och ton är inte ifyllda i `DESIGN.md`.
- Appen (`npm init @shopify/app@latest`) kräver ett inloggat Shopify-konto och är inte skapad.
- Branch protection på `main` och `prod` med krav på grönt "Theme check".
