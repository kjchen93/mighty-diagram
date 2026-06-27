# CLAUDE.md — repo guide for AI agents

Guidance for Claude / agents working **on this repository** (not for using the skill).

## What this repo is

A packaged product around one skill: the **mighty-diagram** skill (repo → clean SVG architecture
diagram), plus Claude Code plugin packaging and an npm CLI installer.

## Source of truth

- The skill lives in **`skills/mighty-diagram/`** — edit there and nowhere else.
- `cli/assets/skill/` is a **build-time copy** (gitignored), produced by `cli/scripts/sync-assets.mjs`.
  Never edit it by hand; run `npm run sync` (or `build`) in `cli/`.
- Keep versions in lockstep across `skill.json`, `.claude-plugin/plugin.json`,
  `.claude-plugin/marketplace.json`, and `cli/package.json`.

## Invariants (don't break these)

- **Zero runtime dependency to use the skill.** Output is pure SVG with icons inlined; do not add
  a render/runtime step. The CLI and CI are install-time/build-time only.
- **Colors only in `:root`.** Every diagram SVG defines its palette in one `:root` block; classes
  reference `var(--…)`. No hard-coded hex elsewhere. Default palette = `pwc`.
- **Icons** are Lucide line icons, 24×24, `stroke="currentColor"`; inlined into `<svg class="icon-svg">`.
- **Frontmatter `name` must equal the skill's directory name** (`mighty-diagram`).
- Bound generated diagrams to ~15–25 nodes; ground every node in a real repo file.

## Common tasks

- Edit skill behavior → `skills/mighty-diagram/SKILL.md` + `references/`.
- Add/adjust a palette → `skills/mighty-diagram/assets/palettes.json` (and the docs' token table).
- Add a CLI platform → `cli/src/platforms.ts`, then `cd cli && npm run build && npm run smoke`.
- Add a gallery example → author the SVG in `examples/`, render a PNG (see CONTRIBUTING.md), link it.

## Validate before committing

- `cd cli && npm run build && npm run smoke`
- All SVGs well-formed; `palettes.json` and the `*.json` manifests parse.
- `SKILL.md` references resolve (paths under `references/` and `assets/`).

See `CONTRIBUTING.md` for the full workflow.
