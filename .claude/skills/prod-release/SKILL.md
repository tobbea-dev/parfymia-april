---
name: prod-release
description: Checklista för att släppa Parfymia-temat till live-storen www.parfymia.com. Startas bara manuellt med /prod-release.
disable-model-invocation: true
---

# prod-release

Claude förbereder och kontrollerar. **En människa kör varje kommando som rör live-storen** — hooks blockerar dem för agenter, och det ska inte kringgås.

## Claude gör

1. Bekräfta att `main` är grön: senaste CI-körningen "Theme check" lyckad, `scripts/verify.sh` grön lokalt.
2. Sammanfatta vad som släpps: `git log --oneline origin/prod..origin/main` och `git diff --stat origin/prod...origin/main`. Flagga särskilt ändringar i `config/`, `templates/*.json` och `layout/`.
3. Påminn om att innehåll som redigerats i live-storens theme editor sedan förra släppet skrivs över av en push — fråga om en `theme pull` från live behövs först.
4. Öppna PR `main` → `prod` med sammanfattningen. Merga inte själv.
5. Skriv ut kommandona nedan åt människan.

## Människan gör

Backup av nuvarande live-tema:
```bash
shopify theme pull --store=www.parfymia.com --live --path=./backups/$(date +%Y-%m-%d)
```

Committa backupen på `prod`, merga PR:en, och pusha sedan som **opublicerat** tema för en sista kontroll:
```bash
shopify theme push --store=www.parfymia.com --unpublished --theme="Parfymia release $(date +%Y-%m-%d)"
```

Förhandsgranska i admin (startsida, produktsida, kollektion, varukorg, kassa, mobil). Publicera därefter temat i Shopify-admin → Webbshop → Teman.

## Efteråt

- Kontrollera live: startsida, en produkt, lägg i varukorg, påbörja kassa.
- Återställning: publicera föregående tema i admin (det ligger kvar i temabiblioteket).
- Uppdatera `HANDOFF.md` med datum och vad som släpptes.
