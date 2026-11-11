#!/usr/bin/env python3
"""Verifiering för Parfymia-temat. Körs via scripts/verify.sh.

Kontroller:
  1. Alla JSON-filer i temat går att tolka (Shopify tillåter kommentarer
     och avslutande kommatecken, så de tas bort före tolkning).
  2. Nyckelparitet mellan engelska (default) och svenska locale-filer.
     Luckor jämförs mot scripts/verify-baseline.json: ärvda luckor från
     Horizon rapporteras, nya luckor ger fel.

Flaggor:
  --update-baseline   skriv nuvarande luckor till baslinjefilen
"""
import glob
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASELINE = os.path.join(ROOT, "scripts", "verify-baseline.json")
JSON_GLOBS = ["locales/*.json", "config/*.json", "templates/*.json", "sections/*.json"]
PARITY_PAIRS = [
    ("locales/en.default.json", "locales/sv.json"),
    ("locales/en.default.schema.json", "locales/sv.schema.json"),
]


def strip_jsonc(text):
    """Ta bort // och /* */-kommentarer samt avslutande kommatecken utanför strängar."""
    out = []
    i, n = 0, len(text)
    in_string = False
    while i < n:
        c = text[i]
        if in_string:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(text[i + 1])
                i += 2
                continue
            if c == '"':
                in_string = False
            i += 1
        elif c == '"':
            in_string = True
            out.append(c)
            i += 1
        elif text.startswith("//", i):
            while i < n and text[i] != "\n":
                i += 1
        elif text.startswith("/*", i):
            end = text.find("*/", i + 2)
            i = n if end == -1 else end + 2
        else:
            out.append(c)
            i += 1
    cleaned = "".join(out)

    # Avslutande kommatecken: ", }" eller ", ]" utanför strängar.
    out = []
    in_string = False
    i, n = 0, len(cleaned)
    while i < n:
        c = cleaned[i]
        if in_string:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(cleaned[i + 1])
                i += 2
                continue
            if c == '"':
                in_string = False
        elif c == '"':
            in_string = True
            out.append(c)
        elif c == ",":
            j = i + 1
            while j < n and cleaned[j] in " \t\r\n":
                j += 1
            if j < n and cleaned[j] in "}]":
                i += 1
                continue
            out.append(c)
        else:
            out.append(c)
        i += 1
    return "".join(out)


def load(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as fh:
        return json.loads(strip_jsonc(fh.read()))


def flatten(node, prefix=""):
    keys = set()
    for key, value in node.items():
        if isinstance(value, dict):
            keys |= flatten(value, prefix + key + ".")
        else:
            keys.add(prefix + key)
    return keys


def main():
    update = "--update-baseline" in sys.argv
    failed = False

    # 1. JSON-validering
    files = sorted(p for g in JSON_GLOBS for p in glob.glob(os.path.join(ROOT, g)))
    bad = []
    for full in files:
        rel = os.path.relpath(full, ROOT)
        try:
            load(rel)
        except (ValueError, OSError) as err:
            bad.append((rel, str(err)))
    if bad:
        failed = True
        for rel, err in bad:
            print(f"FAIL  json      {rel}: {err}")
    else:
        print(f"PASS  json      {len(files)} filer tolkades")

    # 2. Locale-paritet
    current = {}
    for source, target in PARITY_PAIRS:
        try:
            missing = sorted(flatten(load(source)) - flatten(load(target)))
        except (ValueError, OSError) as err:
            failed = True
            print(f"FAIL  parity    {target}: kunde inte läsas ({err})")
            continue
        current[target] = missing

    if update:
        with open(BASELINE, "w", encoding="utf-8") as fh:
            json.dump(current, fh, indent=2, ensure_ascii=False, sort_keys=True)
            fh.write("\n")
        print(f"INFO  baseline  skrev {os.path.relpath(BASELINE, ROOT)}")

    baseline = {}
    if os.path.exists(BASELINE):
        with open(BASELINE, encoding="utf-8") as fh:
            baseline = json.load(fh)

    for target, missing in current.items():
        known = set(baseline.get(target, []))
        new = [k for k in missing if k not in known]
        inherited = len(missing) - len(new)
        if new:
            failed = True
            print(f"FAIL  parity    {target}: {len(new)} nya nycklar saknas")
            for key in new[:25]:
                print(f"                  - {key}")
            if len(new) > 25:
                print(f"                  ... och {len(new) - 25} till")
        else:
            note = f" ({inherited} ärvda luckor i baslinjen)" if inherited else ""
            print(f"PASS  parity    {target}: inga nya luckor{note}")
        fixed = known - set(missing)
        if fixed and not update:
            print(f"INFO  parity    {target}: {len(fixed)} baslinjeluckor är stängda, "
                  "kör med --update-baseline")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
