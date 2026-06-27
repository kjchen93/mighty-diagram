---
name: mighty-diagram
description: Generate a clean, minimalist technical architecture diagram of a code repository
  as a self-contained SVG. Use when the user wants an architecture diagram, system diagram,
  tech-stack overview, component diagram, or user-workflow/flow diagram of their repo, or asks
  to visualize, draw, or map their codebase's services, data flow, or structure.
license: Apache-2.0
metadata:
  version: "1.0"
---

# mighty-diagram

Analyze a repository and draw a clean, minimalist technical diagram of it as a self-contained
SVG — titled gray group columns, monochrome line icons, orange flow arrows, an optional dashed
sub-group and outer deployment frame, with generous whitespace. The clean swimlane *style*
matches the clean reference style; colors default to the **PwC** brand palette.
`assets/example-output.svg` is the rendered reference to imitate.

It can draw three views — **component/architecture** (default), **tech-stack**, or
**user-workflow** — and the colors are fully customizable.

## When to use

Use whenever someone wants to see their codebase as a diagram: "diagram this repo", "draw the
architecture", "show the tech stack", "visualize the system / data flow / user flow".

## Prerequisites

None — the output is a plain `.svg` that needs no tools to render. The bundled icons mean
nothing is fetched at render time, so it works offline and on any surface. To view: open the
`.svg` in a browser; to embed in a GitHub README, commit the file and reference it
(`![architecture](architecture.svg)` or `<img src="architecture.svg">`).

This skill's bundled files (referenced below as `references/...` and `assets/...`) live in the
skill's own directory.

## Workflow

Follow these steps in order.

### 1. Scan the repository

Build a grounded, evidence-tagged model of the repo following
**`references/repo-analysis.md`**: read the high-signal files (compose, dependency manifests,
Dockerfiles, k8s/IaC, `.env.example`, README, CI, entrypoints, filtered tree), apply the
detection-rule catalog, and produce a *facts inventory* where every component cites the file it
came from. Exclude `node_modules`/`vendor`/`dist`/`build`/`.git`/lockfiles. Use your own tools
(Glob, Grep, Read) — no scripts needed.

### 2. Pick the view and confirm — ask once

Auto-detect the best-fitting view (heuristics in `references/repo-analysis.md`; default =
component/architecture). Then, in a **single** message, show the developer a short summary of
what you detected and ask two things:

1. **View** — confirm the proposed view or switch to one of:
   component/architecture · tech-stack · user-workflow.
2. **Colors** — keep the default **PwC** palette (dark-orange arrows + red frame), or
   customize: ask for an **accent color** (flow arrows) and a **frame/boundary color**,
   optionally a sub-group color. They can also name a preset from `assets/palettes.json`
   (**pwc** (default) · reference (maroon/orange) · monochrome · ocean · forest · violet).

If the developer already specified the view and/or colors in their request, skip asking about
those and proceed.

### 3. Map the model

Run the **explain → map** passes from `references/repo-analysis.md`: first a short plain-English
architecture (don't assume it's a web app), then a structured `{ groups, nodes, edges }` where
every node is a real component from the inventory. Assign each node to a lane/group, pick its
icon (`references/icons.md`), choose the optional outer frame and at most one or two dashed
sub-groups. **Bound the diagram to ~15–25 nodes** — high signal over completeness; split a
central subsystem into 2–4 nodes rather than one black box.

### 4. Author the SVG

Copy **`assets/template.svg`** and build the diagram following **`references/svg-authoring.md`**
and **`references/style-system.md`**, imitating the structure and coordinates of
**`assets/example-output.svg`**:

- lay groups out as columns left→right; stack icon+label nodes in rows;
- inline icons from `assets/icons/` (copy the inner shapes into `<svg class="icon-svg" …>`) —
  never hot-link;
- draw orange flow arrows with `marker-end="url(#arrow)"`, routed orthogonally through gutters;
- add the optional dashed sub-group and outer frame with corner tag;
- set the palette by editing **only** the `:root` CSS variables to the developer's colors.

### 5. Self-check

Run the checklist at the end of `references/svg-authoring.md` (no overlaps; arrows don't cross
boxes; grid alignment; one accent color; legible labels; every node maps to a real component;
nothing clipped by the viewBox). If you can render (e.g. `chrome --headless --screenshot`, or
just ask the developer to open it), eyeball it against `assets/example-output.svg`. Fix and re-emit if
anything is off.

### 6. Write and hand off

Write the file (default `architecture.svg` in the repo root, or a path the developer names).
Tell them how to view/embed it, and that recoloring later = editing the `:root` variable block
at the top of the SVG (or swapping a preset from `assets/palettes.json`).

## Style system

Clean, minimalist, limited palette; swimlane/column grid; one icon family; one accent color
for arrows only. Tokens and the layout grid: **`references/style-system.md`**. The canonical
classes and palette block live in **`assets/template.svg`**.

## Icons

Bundled Lucide line icons (gray, consistent) in `assets/icons/`; component-type → icon mapping
and licensing in **`references/icons.md`**. Extend the set by dropping a 24×24
`stroke="currentColor"` SVG into `assets/icons/`.

## View types

| View | Use when |
|------|----------|
| Component / architecture (default) | services/datastores/queues + flow; or a monolith's internals |
| Tech stack | libraries/CLIs; "what's in here" |
| User workflow | a clear primary user journey through routes/entrypoints |

Details and selection heuristics: **`references/repo-analysis.md`**.

## Customizing colors & styling

All colors are CSS variables in the SVG's `:root` block — edit them in one place to recolor.
The default palette is **pwc**; most customizations are just `--accent` (arrows) and `--frame`
(boundary). Presets (incl. `reference` = the original maroon/orange look): `assets/palettes.json`. Full
token reference: `references/style-system.md`.
