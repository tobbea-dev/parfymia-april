# Förbättringslogg

Så ändras teamets arbetssätt. Temakod hör inte hit.

## Regler

1. **Observera** ett konkret fel i en körning och hitta grundorsaken.
2. **Föreslå en** ändring: i ett agentkontrakt, i en roll eller i arbetsflödet. Ge den ett versionsnummer.
3. **Mät** genom att köra om samma uppgift från samma utgångscommit och jämföra mot föregående körning: verify-resultat, antal omförsök, granskarens fynd.
4. **Behåll** ändringen bara om mätningen blev bättre. Annars backas den med `git revert` på ändringens commit.
5. Ändringar i `scripts/`, `.theme-check.yml`, `scripts/verify-baseline.json` och `.claude/settings.json` görs aldrig av teamet på eget initiativ. De kräver människans godkännande i en egen PR.

## Logg

| Version | Datum | Fel som observerades | Ändring | Före | Efter | Beslut |
|---|---|---|---|---|---|---|
| v1 (baslinje) | 2026-11-11 | Inget. Första mätningen | Ingen | | `seeded-review-01`: 9 av 9 fel fångade, 0 omförsök, 2 agenter | Baslinje. Se `runs/2026-11-11-pilot-01.md` |
