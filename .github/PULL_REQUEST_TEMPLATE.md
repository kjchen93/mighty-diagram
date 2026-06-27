## Summary

What does this change and why?

## Checklist

- [ ] Skill edits are under `skills/mighty-diagram/` (the single source of truth)
- [ ] Colors only in `:root`; icons are Lucide `currentColor` 24×24 (if touched)
- [ ] `node scripts/validate.mjs` and `python3 scripts/validate_svgs.py` pass
- [ ] `cd cli && npm run build && npm run smoke` pass (if CLI/skill changed)
- [ ] `CHANGELOG.md` updated; versions kept in lockstep (if releasing)
