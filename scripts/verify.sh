#!/bin/bash
# Ett kommando för alla kontroller. Används av människor, Stop-hooken och CI.
#
#   scripts/verify.sh
#
# I CI (CI=true) är Shopify CLI obligatoriskt; lokalt hoppas theme-check över
# med en varning om CLI:t saknas.
set -uo pipefail
cd "$(dirname "$0")/.."

failed=0

node scripts/check-json.mjs || failed=1
node scripts/check-locales.mjs || failed=1

if command -v shopify >/dev/null 2>&1; then
  # Fel fäller kontrollen; varningar (28 st i Horizon-baslinjen) visas men stoppar inte.
  if shopify theme check --fail-level error --path . >/tmp/theme-check.$$ 2>&1; then
    echo "✓ theme-check: inga fel ($(grep -Eo '[0-9]+ warnings?' /tmp/theme-check.$$ | tail -1 || echo '0 warnings'))"
  else
    cat /tmp/theme-check.$$
    echo "✗ theme-check hittade fel"
    failed=1
  fi
  rm -f /tmp/theme-check.$$
elif [ "${CI:-}" = "true" ]; then
  echo "✗ Shopify CLI saknas i CI"
  failed=1
else
  echo "! theme-check hoppades över: Shopify CLI är inte installerat (npm install -g @shopify/cli)"
fi

exit $failed
