// Repo validation: skill frontmatter, JSON manifests, and SKILL.md reference paths.
// Run: node scripts/validate.mjs   (used by CI and locally)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let failed = 0;
const fail = (m) => { console.error(`  ✗ ${m}`); failed++; };
const pass = (m) => console.log(`  ✓ ${m}`);

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillDir = path.join(repo, "skills", "mighty-diagram");

// 1. SKILL.md frontmatter
console.log("SKILL.md frontmatter:");
const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
const fm = skillMd.match(/^---\n([\s\S]*?)\n---/);
if (!fm) fail("missing YAML frontmatter");
else {
  const name = fm[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  if (name === "mighty-diagram") pass("name matches directory");
  else fail(`name "${name}" != directory "mighty-diagram"`);
  if (/^description:\s*\S/m.test(fm[1])) pass("description present");
  else fail("description missing/empty");
}

// 2. JSON manifests parse
console.log("JSON files parse:");
for (const rel of [
  "skill.json",
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  "skills/mighty-diagram/assets/palettes.json",
  "cli/package.json",
]) {
  try {
    JSON.parse(fs.readFileSync(path.join(repo, rel), "utf8"));
    pass(rel);
  } catch (e) {
    fail(`${rel}: ${e.message}`);
  }
}

// 3. Referenced paths in SKILL.md exist
console.log("SKILL.md referenced paths exist:");
const refs = [...skillMd.matchAll(/`(references\/[^`]+\.md|assets\/[^`]+)`/g)]
  .map((m) => m[1])
  .filter((r) => !r.includes("*") && !r.includes("..."));
for (const r of [...new Set(refs)]) {
  if (fs.existsSync(path.join(skillDir, r))) pass(r);
  else fail(`referenced but missing: ${r}`);
}

console.log(failed ? `\nFAILED (${failed})` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
