# SVG authoring

How to hand-build the diagram as a clean, self-contained SVG. Start from
`assets/template.svg` and imitate the structure and coordinates of
`assets/example-output.svg`. Read `references/style-system.md` for the tokens.

## Contents
- [Document skeleton](#document-skeleton)
- [Coordinate recipe](#coordinate-recipe)
- [Building blocks](#building-blocks)
- [Inlining icons](#inlining-icons)
- [Arrow routing](#arrow-routing)
- [Self-check before writing](#self-check-before-writing)

## Document skeleton

Every diagram has the same shell (already in the template):

1. `<svg>` with `width`/`height`/`viewBox` sized to your content, plus `role="img"` and a
   `<title>`/`<desc>` referenced by `aria-labelledby` (accessibility + alt text).
2. A `<style>` block with the `:root` palette variables and the element classes
   (`.canvas .frame .frame-tag .frame-txt .group .title .subgroup .subtitle .label .edge
   .icon-svg`). Elements reference colors via `var(--…)` so recoloring touches one place.
3. A `<defs>` with one `<marker id="arrow">` for arrowheads (filled with `var(--accent)`).
4. A full-canvas `<rect class="canvas">` background.

Keep the class names exactly — they are the contract. Change geometry and content only.

## Coordinate recipe

Work out numbers before emitting; an SVG has no auto-layout.

1. **Pick columns** = your groups, in flow order. Choose a column width `W` (≈200–240) and
   gutter `G` (≈32–40). Column `i` left edge: `x_i = margin + i*(W+G)`. Column center:
   `cx_i = x_i + W/2`.
2. **Size the canvas:** `width = 2*margin + n*W + (n-1)*G` (+ a little if an outer frame or an
   external column sits outside). Height = `2*margin + tallest column`.
3. **Group box:** `<rect class="group" x=x_i y=groupTop width=W height=groupH rx=10>` with a
   centered `<text class="title" x=cx_i>` near the top.
4. **Rows inside a column:** choose a row pitch `P` (≈90–130). Node `j` icon top:
   `iconTop_j = firstRowTop + j*P`. Icon is `S`×`S` (≈42) centered: `iconX = cx_i - S/2`.
   Label baseline: `iconTop_j + S + 16`, centered at `cx_i`.
5. **Outer frame** (optional): a `<rect class="frame">` ~16–24px outside the outermost groups,
   with a `.frame-tag` rect + uppercase `.frame-txt` at the bottom-right corner.

Align rows across columns when components correspond (it makes arrows horizontal and clean).

## Building blocks

Copy these patterns (see the template/exemplar for full instances):

- **Group:** `<rect class="group" .../>` + `<text class="title" text-anchor="middle">`.
- **Node:** `<g class="node"> <svg class="icon-svg" x y width height viewBox="0 0 24 24">…icon
  shapes…</svg> <text class="label" text-anchor="middle">Name</text> </g>`.
- **Sub-group:** `<rect class="subgroup" rx="8"/>` + `<text class="subtitle">` drawn *before*
  the nodes it contains so it sits behind them.
- **Outer frame:** `<rect class="frame"/>` + `<rect class="frame-tag"/>` + `<text class="frame-txt">`.
- **Edge:** `<path class="edge" d="…" marker-end="url(#arrow)"/>`.

Draw order matters (later = on top): canvas → frame → group boxes → sub-group rects → nodes →
edges. Drawing edges last keeps arrowheads crisp over boxes.

## Inlining icons

Icons are bundled in `assets/icons/` as Lucide line SVGs (24×24, `stroke="currentColor"`).
To place one:

1. Pick the icon for the component type from `references/icons.md`.
2. Open `assets/icons/<name>.svg` and copy the inner shapes (the `<path>/<rect>/<circle>/…`
   elements between `<svg>` and `</svg>` — drop the license comment and the `<svg>` wrapper).
3. Paste them inside a `<svg class="icon-svg" x=… y=… width="42" height="42" viewBox="0 0 24
   24">`. The `.icon-svg` class applies `--icon` color and a thin stroke; nothing else needed.

Do **not** fetch icons at render time — always inline from the bundled files so the output is
self-contained and works offline / on every surface. To add an icon the set lacks, drop a new
24×24 `stroke="currentColor"` SVG into `assets/icons/` (Lucide or Tabler keep the style
consistent; see licensing in `references/icons.md`).

## Arrow routing

- Attach arrows at the **edge** of a node/box, not its center; leave a few px gap so the line
  doesn't touch the glyph.
- Route **orthogonally** with horizontal/vertical segments: `d="M x1,y1 H xmid V ymid H x2"`.
  Put vertical "jog" segments in the **gutters between columns**, never through a box.
- Prefer the single dominant direction (left→right). Use a return arrow only for a real
  feedback path.
- One arrowhead style (`marker-end="url(#arrow)"`); use `marker-start` too only for a genuine
  bidirectional link.
- Never let a line pass through a group box or another node — reroute around it.

## Self-check before writing

Verify all of these; fix and re-emit if any fail:

- [ ] No two boxes overlap; no node sits outside its group; no group outside the frame.
- [ ] No arrow passes through a box or node; jogs are in gutters; arrowheads land on box edges.
- [ ] Rows/columns are aligned to the grid; equal gutters; consistent corner radii.
- [ ] Exactly one accent color, used only for arrows.
- [ ] All icons are from one family (the bundled set) at one stroke weight; labels are legible
      and don't overlap icons or arrows.
- [ ] Every node maps to a **real** component found in the scan (no invented services/paths).
- [ ] `viewBox`/`width`/`height` fit all content with ~40px margin (nothing clipped).
- [ ] Render it (e.g. open in a browser, or `chrome --headless --screenshot`) and eyeball it
      against `assets/example-output.svg` before declaring done.
