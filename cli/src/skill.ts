import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Platform } from "./platforms.js";
import { SKILL_DIR_NAME } from "./platforms.js";

const here = path.dirname(fileURLToPath(import.meta.url));
// At runtime this file is bundled to dist/index.js, so assets live at ../assets.
const cliRoot = path.resolve(here, "..");

/** The bundled copy of the skill (SKILL.md + references/ + assets/). */
export function bundledSkillDir(): string {
  return path.join(cliRoot, "assets", "skill");
}

export function cliVersion(): string {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(cliRoot, "package.json"), "utf8"),
    );
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

/** Absolute target directory for a platform: <root>/<base>/mighty-diagram */
export function targetSkillDir(p: Platform, global: boolean): string {
  const root = global ? os.homedir() : process.cwd();
  return path.join(root, p.base, SKILL_DIR_NAME);
}

export function installSkill(dest: string): void {
  const src = bundledSkillDir();
  if (!fs.existsSync(path.join(src, "SKILL.md"))) {
    throw new Error(
      `Bundled skill not found at ${src}. (Dev: run "npm run sync" first.)`,
    );
  }
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

export function removeSkill(dest: string): boolean {
  if (!fs.existsSync(dest)) return false;
  fs.rmSync(dest, { recursive: true, force: true });
  return true;
}

export function isInstalled(dest: string): boolean {
  return fs.existsSync(path.join(dest, "SKILL.md"));
}
