#!/usr/bin/env bash
# Enda verifieringskommandot för temat: bash scripts/verify.sh
# Avslutar med felkod om någon kontroll som faktiskt kördes fallerar.
# Kontroller som inte kan köras rapporteras som SKIP, aldrig som godkända.
set -uo pipefail
cd "$(dirname "$0")/.."

status=0

python3 scripts/verify.py "$@" || status=1

if command -v shopify >/dev/null 2>&1; then
  if shopify theme check --fail-level error; then
    echo "PASS  theme-check"
  else
    echo "FAIL  theme-check"
    status=1
  fi
else
  echo "SKIP  theme-check  Shopify CLI saknas här. Körs i CI (.github/workflows/theme-check.yml)."
fi

exit $status
