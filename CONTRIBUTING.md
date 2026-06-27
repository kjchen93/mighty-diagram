# Contributing

Thanks for helping improve **mighty-diagram**!

## Project layout

| Path | What it is |
|---|---|
| `skills/mighty-diagram/` | **The skill — single source of truth.** Edit here. |
| `.claude-plugin/` | Plugin + marketplace manifests (Claude Code install). |
| `cli/` | `mighty-diagram-cli` npm installer. Bundles the skill from `skills/` at build time. |
| `examples/` | Rendered gallery (`.svg` + `.png`). |
| `skill.json`, `CHANGELOG.md` | Manifest and version history. |

## Editing the skill

1. Make changes under `skills/mighty-diagram/` (`SKILL.md`, `references/*.md`, `assets/*`).
2. Keep `SKILL.md` concise; push detail into `references/` (one level deep).
3. Icons: 24×24 SVGs using `stroke="currentColor"` (Lucide/Tabler keep the line style consistent).
4. Colors live **only** in each SVG's `:root` block — don't hard-code hex elsewhere.

## Regenerating the example gallery

Examples are hand-authored SVGs rendered to PNG with headless Chrome:

```bash
chrome --headless --disable-gpu --user-data-dir=<tmp> \
  --screenshot=examples/<name>.png --window-size=<w>,<h> examples/<name>.svg
```

## Working on the CLI

The CLI bundles a copy of the skill (`cli/assets/skill/`) synced from `skills/mighty-diagram/`.

```bash
cd cli
npm install
npm run build      # runs `sync` (copies the skill) then bundles to dist/
npm run smoke      # init into a temp dir, assert files, uninstall
```

Add a platform in `cli/src/platforms.ts`. Claude Code is the verified target; others use the
`<tool>/skills` convention — correct a path if you can confirm a tool's real location.

## Versioning & releases

- Semantic versioning; keep `skill.json`, `.claude-plugin/*.json`, and `cli/package.json` in lockstep.
- Update `CHANGELOG.md`, tag `vX.Y.Z`. CI publishes the CLI to npm and creates a GitHub Release
  (requires the `NPM_TOKEN` secret).

## Pull requests

Branch off `main`, keep changes focused, run `cli` build + smoke locally, and open a PR. CI must pass.
