# Style system

The visual language that makes diagrams clean and minimalist (see `assets/example-output.svg`).
Everything here is encoded in `assets/template.svg` and demonstrated in
`assets/example-output.svg`.

## Contents
- [Color tokens (CSS variables)](#color-tokens-css-variables)
- [Lane-grid layout](#lane-grid-layout)
- [Typography](#typography)
- [Spacing scale](#spacing-scale)
- [Clarity principles](#clarity-principles)

## Color tokens (CSS variables)

All colors live in one `:root` block at the top of the SVG. To recolor, edit only these.
Defaults use the **PwC** brand palette; the `reference` preset reproduces the original reference look
(maroon frame + orange arrows).

| Role | CSS variable | Default (PwC) | Stroke width | Corner radius |
|------|--------------|---------------|--------------|---------------|
| Canvas background | `--canvas` | `#ffffff` | — | — |
| Outer frame + corner label | `--frame` | `#AD1B02` | 2 | 6 |
| Group box fill | `--group-fill` | `#f6f3f0` | — | 10 |
| Group box border | `--group-stroke` | `#e7e0da` | 1 | — |
| Group title text | `--title` | `#1f1b18` | — | — |
| Sub-group border + title (dashed) | `--subgroup` | `#e88d14` | 1.5 (dash `6 4`) | 8 |
| Sub-group fill | `--subgroup-fill` | `#fdf4e8` | — | — |
| Line icons | `--icon` | `#595550` | ~1.4 | — |
| Flow arrows | `--accent` | `#db4e18` | 2 | — |
| Node labels | `--label` | `#46403b` | — | — |

Presets (and the developer's own colors) live in `assets/palettes.json`. The most common
customization is just two values: `--accent` (arrows) and `--frame` (boundary). When a
developer gives a brand color, map it to `--accent`; map a second color to `--frame`; leave
the rest unless they ask.

## Lane-grid layout

The aesthetic is a **swimlane / layered-column** grid. Place groups as columns; stack nodes
in rows inside each column.

- **Canvas margin:** ~40px around all content.
- **Columns (groups):** equal width (≈200–240px) with equal gutters (≈32–40px). Lay them
  left → right in the direction of flow.
- **Group box:** rounded rect (`rx` 10), `--group-fill` with a 1px `--group-stroke`. Bold
  title near the top, centered in the column.
- **Node = icon + label:** icon 40–48px centered on the column center; label 12px centered
  ~16px below the icon. Row pitch ≈ 90–130px (keep rows aligned across columns where it helps
  readability).
- **Sub-group:** a rounded dashed rect drawn *inside* a group around a subset of nodes, with
  a small `--subgroup`-colored title. Use it for one meaningful internal boundary (e.g. async
  workers, a planned/optional module, a trust boundary). Use at most one or two per diagram.
- **Outer frame:** optional thin `--frame` rect around everything (or around the deployed
  subset), with an uppercase corner tag (e.g. `DOCKER DEPLOYMENT`, `AWS ACCOUNT`). Omit if
  the repo has no single deployment boundary.
- Keep **one** corner radius per hierarchy level; align everything to a grid with equal
  gutters.

## Typography

- Family (system stack, no web fonts to fetch):
  `Inter, "Segoe UI", system-ui, Helvetica, Arial, sans-serif`.
- Group title: 15px, weight 700.
- Sub-group title: 12px, weight 600.
- Node label: 12px, weight 500.
- Frame corner tag: 11px, weight 700, uppercase, letter-spacing ~0.08em.

## Spacing scale

Use multiples of 4/8 for everything: `8 / 16 / 24 / 32 / 40`. Group inner padding 16–24px;
icon→label gap ~8px; gutter between columns 32–40px.

## Clarity principles

These are what make it read as "clean and easy to understand" — enforce them:

1. **Limited palette.** Neutral grays + exactly one action accent (arrows) + one structural
   accent (frame), plus one dashed sub-group color. Never use the accent for anything but
   arrows.
2. **Common-region grouping.** The gray boxes bind related components; nesting shows hierarchy.
3. **Single dominant flow direction.** Lay the primary flow left→right (or top→down) and keep
   arrows going that way; avoid backward/crossing arrows unless semantically necessary.
4. **One icon family, one stroke weight.** Only the bundled Lucide set; never mix filled and
   outline icons.
5. **Alignment & grid.** Shared edges, equal spacing, aligned rows/columns.
6. **Generous whitespace.** Space separates groups and reduces clutter — do not crowd.
7. **Bounded size.** ~15–25 nodes max (see `references/repo-analysis.md`); abstract rather
   than dump every module.
