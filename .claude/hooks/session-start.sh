#!/bin/bash
# SessionStart: gör molnsessioner redo att köra scripts/verify.sh.
# Lokalt förutsätts Shopify CLI redan vara installerat (se README.md).
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Globalt verktyg, inte ett beroende i repot — temat förblir build-fritt.
if ! command -v shopify >/dev/null 2>&1; then
  npm install -g @shopify/cli@latest >/dev/null 2>&1 \
    || echo "Kunde inte installera Shopify CLI; theme-check hoppas över i den här sessionen." >&2
fi
