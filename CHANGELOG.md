# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The skill, plugin, and CLI versions
are kept in lockstep.

## [Unreleased]

## [1.0.0] - 2026-06-27

### Added
- **Skill** (`skills/mighty-diagram/`): repo-grounded generation of clean, minimalist
  architecture diagrams as self-contained SVG — component, tech-stack, and user-workflow views.
  Includes `SKILL.md`, reference guides (repo analysis, style system, SVG authoring, icons),
  a starter template, a worked exemplar, palette presets, and 28 bundled Lucide icons.
- **PwC** brand palette as the default; `reference` (original maroon/orange), `monochrome`,
  `ocean`, `forest`, and `violet` presets. Recolor via a single `:root` CSS-variable block.
- **Plugin + marketplace packaging** (`.claude-plugin/`) for one-command Claude Code install,
  plus a `skill.json` manifest.
- **`mighty-diagram-cli`** (`cli/`): npm installer that bundles the skill and installs it into
  Claude Code and 17 other AI assistants; `init`, `uninstall`, `update`, `list`, `versions`.
- **Example gallery** (`examples/`) with rendered diagrams from real repositories.
- Contributor docs (`CONTRIBUTING.md`, `CLAUDE.md`) and CI (skill validation + CLI build/smoke).

[Unreleased]: https://github.com/kjchen93/mighty-diagram/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/kjchen93/mighty-diagram/releases/tag/v1.0.0
