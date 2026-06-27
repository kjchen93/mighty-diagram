#!/usr/bin/env python3
"""Validate that every bundled/example SVG is well-formed XML. Used by CI and locally."""
import glob
import os
import sys
import xml.dom.minidom as minidom

repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
patterns = ["skills/**/*.svg", "examples/**/*.svg"]

files = []
for pat in patterns:
    files += glob.glob(os.path.join(repo, pat), recursive=True)

failed = 0
for f in sorted(files):
    rel = os.path.relpath(f, repo)
    try:
        minidom.parse(f)
        print(f"  OK   {rel}")
    except Exception as e:  # noqa: BLE001
        print(f"  FAIL {rel}: {e}")
        failed += 1

print(f"\n{len(files)} SVGs checked, {failed} failed.")
sys.exit(1 if failed else 0)
