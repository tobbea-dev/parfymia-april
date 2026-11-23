# HANDOFF – Parfymia (session 2026-11-09 → 2026-11-23)

## 1. Mål & kontext

**Projekt:** Shopify-tema för Parfymia (svensk e-handel inom parfym, hår, hud, makeup, grooming m.m.), baserat på Horizon (Online Store 2.0). Se `AGENTS.md` för konventioner. Arbetsbranch: `claude/eager-goldberg-iqvgsn`.

**Vad sessionen faktiskt handlade om:** inte temakod, utan skattefrågor kring inköp av parfym från grossisten **Vida XL** (Florida).

- Bolaget är ett Wyoming-LLC med Florida-postadress. Verksamheten bedrivs helt utanför USA. Ägaren, Tobias Andersson, har ITIN.
- Vida XL kräver (enligt användaren) att kunden har Florida-registrering/återförsäljarintyg för att sälja utan Florida sales tax.
- Tobias mejlade Florida Department of Revenue (FDOR) och fick svar från Brittany Willingham, Senior Tax Specialist (tel. (850) 488-6800).

## 2. Gjorda ändringar & beslut

**Filer:** inga temafiler har ändrats. Enda filen som skapats är denna `HANDOFF.md` (ej committad).

**Vad FDOR svarade:**
1. En postadress/virtuell adress i Florida skapar ingen nexus. Registreringskrav för försäljning uppstår först över 100 000 USD skattepliktig distansförsäljning till Florida föregående kalenderår (marketplace-försäljning där plattformen tar in skatten räknas inte).
2. Frivillig registrering som "dealer" går via online-ansökan eller DR-1. Deklarationer krävs enligt tilldelad frekvens (oftast månad/kvartal), även nolldeklarationer. Utebliven nolldeklaration = 50 USD i avgift per deklaration. FDOR bekräftade inte uttryckligen att registreringen ger ett DR-13 (Annual Resale Certificate).
3. Utländsk företagsadress och ITIN-fältet (SSN eller Visa i ansökan): FDOR hänvisar båda till Account Management and Registration, **(850) 717-6628**.
4. Utan Florida-registrering får en grossist i Florida **inte** godta ett vanligt återförsäljarintyg från en annan delstat.

**Beslut/rekommendationer som gjorts (inga slutgiltiga val av användaren ännu):**
- Alternativ A: registrera sig frivilligt (DR-1) och skaffa DR-13. Det är vad Vida XL begär. Kostnad: löpande deklarationer och risk för 50 USD-avgifter.
- Alternativ B: köpa med moms betald. Ungefär 6–8 % beroende på county (uppskattning, ej verifierad).
- Alternativ C: undersöka om leverans direkt till Sverige, eller till speditör med exportdokumentation, kan vara momsfri export. **Ej verifierat**: FDOR och Vida XL måste bekräfta.
- Beslutskriterium: jämför sparad moms mot kostnaden för att hålla en Florida-registrering vid liv.

## 3. Nuvarande status

- **Fungerar/klart:** analys av FDOR-svaret är gjord (på svenska och engelska), och ett mejlutkast till Vida XL är skrivet (se nedan).
- **Påbörjat men ej gjort:** mejlet till Vida XL är **inte skickat och inget Gmail-utkast är skapat**. Mottagaradress saknas. Ingen telefonkontakt med FDOR är gjord.
- **Hinder/osäkerheter:**
  - Okänt om registreringen ger DR-13 och om en registrering kan stängas eller göras vilande.
  - Okänt hur ITIN och utländsk adress anges i ansökan.
  - Det har inte kontrollerats att Vida XL är en grossist i Florida eller vad de exakt kräver. Det är utgångspunkten från användaren.
  - Svensk moms och EU-moms är en separat fråga som inte behandlats. En revisor som kan Wyoming-LLC:er med utländska ägare bör bekräfta upplägget. Inget här är skatterådgivning.
- **Repot (tema):** oförändrat sedan sessionens start. Enligt `AGENTS.md` är baseline importerad. Brand-anpassning, header, hero, kategorinavigation, produktsida och svenska som primärspråk återstår.

### Mejlutkast till Vida XL (engelska, ej skickat)

> **Subject:** Tax-exempt purchasing for an overseas customer – what documentation do you require?
>
> Hello,
>
> I'm Tobias Andersson, owner of Parfymia, an e-commerce business selling beauty and fragrance products to customers in Sweden. Our purchasing entity is a Wyoming LLC with a Florida mailing address. Our business operations are located outside the United States, and all goods would be shipped to Sweden.
>
> Before we place a larger order, I'd like to understand how you handle sales tax for a customer like us. Could you please answer the following?
>
> 1. What documentation do you require to sell to us without charging Florida sales tax? Do you accept a Florida Annual Resale Certificate (DR-13), a Florida sales tax registration number, or something else?
> 2. Do you accept an out-of-state resale certificate (for example from Wyoming)? We understand the Florida Department of Revenue says Florida wholesalers cannot.
> 3. If the goods are shipped directly from your warehouse to an address in Sweden, or to a freight forwarder with export documentation, can the sale be treated as an exempt export? If so, what paperwork do you need from us (for example proof of export, shipping documents, or an export declaration)?
> 4. Do you have a standard process for international customers, and are there minimum order quantities or other account requirements?
> 5. If tax would apply to our orders, what rate would you charge?
>
> Your answers will help us decide how to set up our account with you. Thank you for your time.
>
> Best regards,
> Tobias Andersson
> Parfymia
> tobbea@me.com

Delas inte ITIN eller privata skattenummer med Vida XL förrän det är klart vad de faktiskt behöver.

## 4. Nästa steg

1. Skicka mejlet till Vida XL (ange mottagarens adress, lägg ev. till telefon/webbadress). Be Claude skapa ett Gmail-utkast om det önskas.
2. Ring FDOR Account Management and Registration, **(850) 717-6628**, och fråga:
   - Hur anger jag en företagsadress utanför USA i DR-1/onlineansökan?
   - Godtas ITIN för ägaren till ett enmans-LLC, och i vilket fält?
   - Ger frivillig registrering ett DR-13? Vilken deklarationsfrekvens tilldelas?
   - Kan kontot avslutas eller göras vilande, och hur undviker jag avgifter för nolldeklarationer?
   - Gäller ett exportundantag för leverans direkt till Sverige eller via speditör?
3. Räkna ut ungefärlig årlig Florida-moms på inköpen och jämför med kostnaden för registrering och deklarationer.
4. Välj alternativ A, B eller C när svar från Vida XL och FDOR finns.
5. Låt en revisor bekräfta upplägget, inklusive svensk moms och EU-moms.
6. Vid behov: återuppta temaarbetet enligt statuslistan i `AGENTS.md` (feature-branch, svenska + engelska översättningar, theme-check). `HANDOFF.md` är en ny, ocommittad fil. Commit/PR bara om användaren ber om det.
