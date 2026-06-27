# mighty-diagram-cli

Install the [**mighty-diagram**](https://github.com/kjchen93/mighty-diagram) skill — which turns
any repository into a clean, minimalist architecture diagram (a self-contained SVG) — into your
AI coding assistant.

```bash
npm install -g mighty-diagram-cli

# into the current project
mighty-diagram init --ai claude

# or for all your projects
mighty-diagram init --ai claude --global
```

The CLI **bundles the skill**, so it works fully offline — generating diagrams needs no runtime
either (the skill is pure markdown + SVG).

## Commands

| Command | What it does |
|---|---|
| `init --ai <id>` | Install the skill (`--global` for home dir, `--force` to reinstall, `--ai all` for every platform) |
| `uninstall [--ai <id>]` | Remove the skill (omit `--ai` to clear all known platforms) |
| `update` | Refresh existing installs with this CLI's bundled skill |
| `list` | List supported platforms and their install paths |
| `versions` | Show the CLI version |

## Supported platforms

Claude Code is the verified, first-class target. The CLI also installs into Cursor, Windsurf,
GitHub Copilot, Codex, Gemini CLI, OpenCode, Continue, Droid (Factory), KiloCode, Roo Code,
Qoder, Warp, Augment, Antigravity, CodeBuddy, Kiro, and Trae using the common `<tool>/skills`
convention — run `mighty-diagram list` to see each path. (Aliases: the command is also available
as `mdiagram`.)

## Develop

```bash
npm install
npm run build      # syncs ../skills/mighty-diagram → assets/skill, then bundles to dist/
npm run smoke      # init into a temp dir, assert, uninstall
```

The single source of truth for the skill is `../skills/mighty-diagram`; `npm run sync` copies it
into `assets/` at build time. MIT-compatible; the project is Apache-2.0 licensed.
