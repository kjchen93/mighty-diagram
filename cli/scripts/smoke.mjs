// End-to-end smoke test for the built CLI: init into a temp project, assert the skill
// files landed, then uninstall and assert they're gone. Requires `npm run build` first.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entry = path.join(cliRoot, "dist", "index.js");
if (!fs.existsSync(entry)) {
  console.error("dist/index.js not found — run `npm run build` first.");
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mdiagram-smoke-"));
const run = (args) =>
  execFileSync(process.execPath, [entry, ...args], { cwd: tmp, encoding: "utf8" });

try {
  run(["init", "--ai", "claude", "--offline"]);
  const skillFile = path.join(tmp, ".claude", "skills", "mighty-diagram", "SKILL.md");
  if (!fs.existsSync(skillFile)) throw new Error("SKILL.md was not installed");
  const icon = path.join(tmp, ".claude", "skills", "mighty-diagram", "assets", "icons", "database.svg");
  if (!fs.existsSync(icon)) throw new Error("bundled icons were not installed");

  run(["uninstall", "--ai", "claude"]);
  if (fs.existsSync(skillFile)) throw new Error("uninstall did not remove the skill");

  console.log("✓ smoke test passed (init → files present → uninstall → removed)");
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
