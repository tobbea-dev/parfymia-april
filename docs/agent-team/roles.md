# Rollkatalog

Trettio rollkontrakt i sex funktioner. Sju är aktiva och finns som körbara agenter i `.claude/agents/`. Övriga är vilande tills deras villkor uppfylls, eller ej tillämpliga i ett build-fritt Shopify-tema.

En vilande roll aktiveras genom att skapa en agentfil enligt kontraktsmallen nedan och flytta raden till "aktiv" i den här filen. Det görs i en egen PR.

## Kontraktsmall

```
Role:       namn                 Mission:    utfall rollen ansvarar för
Tools:      tillåtna verktyg     Files:      filer rollen äger
Context:    vad rollen får veta  Tests:      kommandon som bevisar resultatet
Handoff:    bevis som lämnas     Escalation: när rollen stannar och frågar
```

## Ledning

| # | Roll | Status | Uppdrag | Aktiveras när |
|---|---|---|---|---|
| 01 | Orchestrator | aktiv (huvudsessionen, `.claude/skills/agent-team`) | Driver loopen och håller budget och spärrar | |
| 02 | Planner | aktiv (`planner`) | Uppgiftsgraf med ägare och acceptanstest | |
| 03 | Architect | vilande | Beslut om tema-struktur som spänner över flera sektioner | Header-redesign eller kategorinavigation påbörjas |
| 28 | Scheduler | vilande | Ordning och parallellitet mellan uppgifter | Fler än fem uppgifter i samma körning. Görs av orkestratorn tills dess |
| 29 | Delegation | vilande | Fördelar uppgifter mellan agenter | Fler än en utvecklaragent arbetar samtidigt |

## Utveckling

| # | Roll | Status | Uppdrag | Aktiveras när |
|---|---|---|---|---|
| 04 | Backend | ej tillämplig | | Temat har ingen server. Blir aktuell först om en Shopify-app eller Function byggs |
| 05 | Frontend | aktiv (`theme-developer`, `i18n`) | Liquid, block, CSS, JS och locale-filer | |
| 06 | Infrastructure | vilande | CI och arbetsflöden i `.github/` | CI behöver mer än verify-jobbet |
| 07 | Database | ej tillämplig | | Temat har ingen databas. Metafält och metaobjekt hanteras i butiken |
| 08 | Integration | vilande | Kopplingar mot appar och externa tjänster | En app-embed, Klaviyo-formulär eller spårning läggs in i temat |

## Kvalitet

| # | Roll | Status | Uppdrag | Aktiveras när |
|---|---|---|---|---|
| 09 | Testing | aktiv (`tester`) | Kör verifieringen, rapporterar ordagrant | |
| 10 | Reviewer | aktiv (`reviewer`) | Oberoende granskning av diffen | |
| 11 | Security | aktiv (`security`) | Granskar output, skript och formulär | |
| 20 | Reliability | vilande | Fel i butiken efter release | Temat är live och det finns felrapporter att utgå från |
| 30 | Audit | vilande | Kontrollerar att körloggar och bevis stämmer | Tio körningar finns loggade |

## Utvärdering

| # | Roll | Status | Uppdrag | Aktiveras när |
|---|---|---|---|---|
| 16 | Evaluation | vilande | Bedömer körningar mot acceptanskriterier | Görs av testaren och granskaren tills fler mätetal än verify finns |
| 17 | Benchmark | vilande | Fasta referensuppgifter att mäta ändringar mot | Tre olika uppgiftstyper har körts och kan återanvändas |
| 18 | Prompt Engineer | vilande | Föreslår ändringar i agentkontrakten | Görs av orkestratorn enligt `improvements.md` tills dess |
| 19 | Optimization | vilande | Prestanda i temat (Lighthouse, vikt på assets) | En mätbar prestandabaslinje för butiken finns |
| 26 | Improvement | vilande | Driver förbättringsloopen | Samma som 18 |

## Drift

| # | Roll | Status | Uppdrag | Aktiveras när |
|---|---|---|---|---|
| 21 | Observability | vilande | Loggar och mätning av körningar | Kostnad och tid per agent kan mätas exakt |
| 22 | Release | vilande | Flödet från `main` till `prod` med backup | Första releasen till live-butiken planeras |
| 23 | Operations | vilande | Löpande skötsel av butikens tema | Temat är live |
| 24 | Risk & Approval | vilande | Bedömer vad som kräver godkännande | Hanteras av `.claude/settings.json` och människan tills Bounded autonomi övervägs |
| 27 | Cost Control | vilande | Håller budget per körning | Samma som 21 |

## Kunskap

| # | Roll | Status | Uppdrag | Aktiveras när |
|---|---|---|---|---|
| 12 | Research | vilande | Underlag från Shopify-dokumentation och konkurrenter | En uppgift kräver ny Horizon- eller Shopify-funktion som ingen i teamet använt |
| 13 | Documentation | aktiv (`docs-writer`) | Håller dokumentationen sann | |
| 14 | Context | vilande | Väljer minsta nödvändiga kontext per uppgift | Görs av orkestratorn. Egen roll när körningar blir för stora för en session |
| 15 | Memory | vilande | Sköter `memory.md` | Görs av `docs-writer` tills minnet är större än en sida |
| 25 | Knowledge | vilande | Samlad kunskap om sortiment och varumärke | Varumärkesunderlag (ton, färger, typsnitt) finns i repot |

## Filägarskap för aktiva agenter

| Agent | Skriver i | Verktyg |
|---|---|---|
| `planner` | `docs/agent-team/runs/` | Read, Grep, Glob, Write |
| `theme-developer` | `sections/ blocks/ snippets/ assets/ layout/ templates/ config/settings_schema.json` | Read, Grep, Glob, Edit, Write, Bash |
| `i18n` | `locales/` | Read, Grep, Glob, Edit, Bash |
| `tester` | inget | Read, Grep, Glob, Bash |
| `reviewer` | inget | Read, Grep, Glob |
| `security` | inget | Read, Grep, Glob |
| `docs-writer` | `AGENTS.md README.md docs/` | Read, Grep, Glob, Edit, Write |

Verktygslistan upprätthålls av Claude Code. Sökvägarna upprätthålls av kontraktet och kontrolleras av granskaren mot diffen. `config/settings_data.json` är dessutom spärrad i `.claude/settings.json`.
