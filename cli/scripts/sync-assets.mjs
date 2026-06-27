// Copies the canonical skill (../../skills/mighty-diagram) into ./assets/skill so the
// published npm package is self-contained and works offline. Run by `prebuild` /
// `prepublishOnly`. The repo keeps a single source of truth: skills/mighty-diagram.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(here, "..");
const repoRoot = path.resolve(cliRoot, "..");
const src = path.join(repoRoot, "skills", "mighty-diagram");
const dest = path.join(cliRoot, "assets", "skill");

if (!fs.existsSync(path.join(src, "SKILL.md"))) {
  console.error(`[sync] cannot find skill source at ${src}`);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true });

const count = fs
  .readdirSync(dest, { recursive: true })
  .filter((f) => typeof f === "string" && /\.(md|svg|json)$/.test(f)).length;
console.log(`[sync] copied skill -> cli/assets/skill (${count} files)`);
