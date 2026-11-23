# DESIGN.md

Designunderlag för Parfymia-temat. Läses av agenter innan UI-arbete och används som facit i `visual-review`.

Värdena lagras i `config/settings_data.json` och ändras normalt i theme editor. Uppdatera den här filen när de ändras.

## Riktning — Parfymia

Beslutat 2026-11-11.

- **Känsla:** exklusiv parfymeri. Stillsam, lyxig, mycket luft. Produkten och doften står i centrum, inte kampanjer.
- **Accentfärg:** salviagrön.
- **Typografi:** serif i rubriker, sans i brödtext.
- **Header (GOA-3, beslutat 2026-11-11):** logo i mitten, kategorimenyn centrerad på egen rad under, öppet sökfält på dator, toppfält ovanför headern med säljargument till vänster och genvägslänkar till höger. Ställs in i theme editor.
- **Startsida (GOA-4, beslutat 2026-11-12):** hero med kampanjbudskap, kategoriingångar, varumärkesrad, bästsäljare och nyheter.

Inte bestämt än:

- **Målgrupp och referenser:** _vem handlar, vilka butiker vill vi likna och inte likna_
- **Bildspråk:** _produkt på vit botten, livsstil, närbilder …_
- **Ton i text:** _du-tilltal? saklig, exklusiv?_
- **Form:** hörnradierna nedan är Horizons standard. En exklusiv känsla brukar tala för skarpare hörn (2–4 px på knappar) — öppet förslag.

## Färg

### Palett

| Namn | Hex | Används till |
|---|---|---|
| Bläck | `#1f2421` | Rubriker, text, sekundära knappar |
| Salvia | `#5f7161` | Primära knappar — accentfärgen |
| Mörk salvia | `#4b5a4d` | Länkar, knapp-hover |
| Skog | `#2a332c` | Mörk bakgrund, vald variant |
| Elfenben | `#f7f4ee` | Varm bakgrund, text på mörkt |
| Blek salvia | `#e6ebe4` | Tonad bakgrund |
| Sand | `#efe9e1` | Tonad bakgrund |
| Vit | `#ffffff` | Standardbakgrund (produktbilder har vit botten) |

Ren svart används inte; bläck är en grönsvart som håller ihop med salvian.

### Färgscheman

| Schema | Bakgrund | Text | Primär knapp (bg / text) | Användning |
|---|---|---|---|---|
| scheme-1 | Vit | Bläck | Salvia / vit | Standard: produktlistor, produktsida |
| scheme-2 | Elfenben | Bläck | Salvia / vit | Redaktionellt innehåll, varannan sektion |
| scheme-3 | Blek salvia | Bläck | Salvia / vit | Framhävda sektioner, slutsåld-badge |
| scheme-4 | Sand | Bläck | Salvia / vit | Alternativ tonad sektion |
| scheme-5 | Skog | Elfenben | Elfenben / skog | Mörka sektioner, sidfot, annonsrad |
| scheme-6 | Transparent | Elfenben | Elfenben / skog | Text ovanpå mörka bilder |
| scheme-58084d4c… | Transparent | Bläck | Salvia / vit | Text ovanpå ljusa bilder |

Kontrast (WCAG): all text och alla knappar i schema 1–5 ligger på minst 4.5:1. Lägst är vit text på salviaknapp, 5.2:1. Schema 6 och det transparenta schemat beror på bilden bakom — välj bild därefter.

Salvia får inte användas som textfärg på tonad bakgrund; använd mörk salvia.

## Typografi

| Roll | Typsnitt | Vikt |
|---|---|---|
| Rubrik (H1–H4) | Playfair Display | 400 |
| Underrubrik (H5–H6) | Inter | 500 |
| Brödtext | Inter | 400 |
| Accent | Inter | 700 |

| Nivå | Storlek |
|---|---|
| H1 | 56 px |
| H2 | 48 px |
| H3 | 32 px |
| H4 | 24 px |
| H5 | 14 px |
| H6 | 12 px |
| Brödtext | 14 px |

## Logotyp

`Logga_Parfymia_sm.png` — höjd 36 px desktop, 28 px mobil. Samma fil används för ljus och mörk bakgrund. En inverterad (ljus) variant behövs för schema 5 och 6 och laddas upp i theme editor → Logo.

## Form

Oförändrat från Horizon-exporten.

| Element | Hörnradie |
|---|---|
| Knappar (primär/sekundär), popover, variantknappar | 14 px |
| Kort, inmatningsfält | 4 px |
| Produktbild | 0 px |
| Badge | 100 px (pill) |
| Färgprov | 32 px |

Sidbredd: `narrow`. Ingen hover-effekt på kort.

## Regler för kod

- Använd Horizons CSS-variabler (`var(--color-foreground)`, `var(--color-background)`, `var(--font-heading--family)` …) — de följer aktivt färgschema. Hårdkoda aldrig hex-värden eller typsnittsnamn.
- Nya designvärden som handlaren ska kunna ändra: lägg till i `config/settings_schema.json`.
- Mobil först. Kontrollera 390 / 768 / 1280 px.
