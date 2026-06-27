# Icons

The skill ships a consistent set of **Lucide** line icons (24×24, `stroke="currentColor"`) in
`assets/icons/`. Using one family at one stroke weight is what keeps the diagram clean — do
not mix icon sets or filled-vs-outline styles.

See `references/svg-authoring.md` → *Inlining icons* for exactly how to place one (copy the
inner shapes into a `<svg class="icon-svg" …>`; the class handles color and stroke).

## Component type → icon

| Component type | Icon (file in `assets/icons/`) | Alternates |
|----------------|--------------------------------|------------|
| Web / SPA frontend | `app-window` | `monitor`, `globe` |
| Admin / desktop UI | `monitor` | `app-window` |
| Public website / browser client | `globe` | `app-window` |
| API / backend service | `server` | `webhook` |
| HTTP webhook / endpoint | `webhook` | `plug` |
| Background worker | `repeat` | `cog` |
| Scheduler / cron / config | `cog` | `repeat` |
| Relational / document database | `database` | — |
| Cache (Redis/Memcached) | `zap` | `database` |
| Message queue / stream | `inbox` | `list` |
| Topic / log / ordered queue | `list` | `inbox` |
| Object / file storage | `hard-drive` | `package` |
| Package / artifact / module | `package` | `box` |
| Container / bounded module | `box` | `layers` |
| Layered subsystem | `layers` | `box` |
| External SaaS / 3rd-party API | `cloud` | `plug`, `network` |
| Generic integration / connector | `plug` | `webhook` |
| Network / gateway / cloud infra | `network` | `cloud` |
| Compute / LLM / processing | `cpu` | `server` |
| Auth / secrets / API keys | `key` | `shield` |
| Security / firewall / policy | `shield` | `key` |
| Email / notifications | `mail` | — |
| Payments / billing | `credit-card` | — |
| Observability / metrics / logs | `activity` | — |
| Document / file / config | `file-text` | — |
| Code / repository / source | `file-code` | `git-branch` |
| CI/CD / version control | `git-branch` | `file-code` |
| Users / actors (workflow views) | `users` | — |

If a needed type isn't listed, pick the closest glyph from the bundled set. To add a new icon,
drop a 24×24 `stroke="currentColor"` SVG into `assets/icons/` — use **Lucide**
(`https://lucide.dev`) or **Tabler** (`https://tabler.io/icons`) to keep the line style
consistent.

## Bundled set (28)

`activity` `app-window` `box` `cloud` `cog` `cpu` `credit-card` `database` `file-code`
`file-text` `git-branch` `globe` `hard-drive` `inbox` `key` `layers` `list` `mail` `monitor`
`network` `package` `plug` `repeat` `server` `shield` `users` `webhook` `zap`

## Brand / tech logos (optional)

For a **tech-stack** view you may want real product logos instead of generic glyphs. Keep the
clean look by recoloring them to gray (`--icon`) unless the developer wants brand colors.

- **simple-icons** (CC0, safest to redistribute): brand marks, e.g.
  `https://cdn.simpleicons.org/postgresql/555555`. Fetch and inline at build time only.
- **devicon** (MIT): language/tool logos with brand colors.

Default to the bundled gray Lucide glyphs; only reach for logos when the developer asks or the
tech-stack view clearly benefits.

## Licensing

- **Lucide** (the bundled set) is **ISC** licensed — free to use and redistribute, no
  attribution required. The original license comment is kept in each file.
- **simple-icons** SVGs are CC0, but the depicted logos remain trademarks of their owners —
  respect brand/trademark usage. **devicon** is MIT.
- **Do not** bundle or redistribute the official **AWS / Azure / GCP** architecture icon decks
  — they are proprietary, trademarked, and forbid recoloring/redistribution. If cloud marks
  are required, use Iconify's CC0 `logos` set (`aws`, `google-cloud`, `microsoft-azure`).
