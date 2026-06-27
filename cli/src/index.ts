#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import {
  PLATFORMS,
  findPlatform,
  SKILL_DIR_NAME,
  type Platform,
} from "./platforms.js";
import {
  cliVersion,
  installSkill,
  isInstalled,
  removeSkill,
  targetSkillDir,
} from "./skill.js";

const ok = (s: string) => console.log(`${pc.green("✓")} ${s}`);
const info = (s: string) => console.log(`${pc.cyan("ℹ")} ${s}`);
const warn = (s: string) => console.log(`${pc.yellow("!")} ${s}`);
const die = (s: string): never => {
  console.error(`${pc.red("✗")} ${s}`);
  process.exit(1);
};

function resolvePlatforms(ai?: string): Platform[] {
  if (!ai) die("Specify --ai <platform> (or 'all'). Run `mighty-diagram list`.");
  if (ai!.toLowerCase() === "all") return PLATFORMS;
  return ai!.split(",").map((raw) => {
    const p = findPlatform(raw.trim());
    if (!p) die(`Unknown platform "${raw.trim()}". Run \`mighty-diagram list\`.`);
    return p!;
  });
}

const program = new Command();
program
  .name("mighty-diagram")
  .description(
    "Install the mighty-diagram skill (clean architecture diagrams from any repo) into your AI coding assistant.",
  )
  .version(cliVersion(), "-v, --version");

program
  .command("init")
  .description("Install the skill into one or more AI assistants")
  .option("--ai <platform>", "platform id, comma-separated list, or 'all'")
  .option("--global", "install under your home dir (all projects) instead of the current project")
  .option("--offline", "use the bundled skill (default; the CLI always bundles it)")
  .option("--force", "reinstall even if already present")
  .action((opts) => {
    const targets = resolvePlatforms(opts.ai);
    const scope = opts.global ? "global" : "project";
    let n = 0;
    for (const p of targets) {
      const dest = targetSkillDir(p, !!opts.global);
      const existed = isInstalled(dest);
      if (existed && !opts.force) {
        installSkill(dest); // refresh in place
        ok(`${p.label}: updated (${scope}) → ${dest}`);
      } else {
        installSkill(dest);
        ok(`${p.label}: installed (${scope}) → ${dest}`);
      }
      if (!p.verified) {
        warn(`  ${p.id} path is convention-based — adjust if your tool differs.`);
      }
      n++;
    }
    info(`Done — ${n} install${n === 1 ? "" : "s"}.`);
    info(
      `In Claude Code, restart or run /doctor, then just ask: "diagram this repo".`,
    );
  });

program
  .command("uninstall")
  .description("Remove the skill (a specific platform, or all known platforms)")
  .option("--ai <platform>", "platform id, comma-separated list, or 'all'")
  .option("--global", "remove from the home-dir install location")
  .action((opts) => {
    const targets = opts.ai ? resolvePlatforms(opts.ai) : PLATFORMS;
    let removed = 0;
    for (const p of targets) {
      const dest = targetSkillDir(p, !!opts.global);
      if (removeSkill(dest)) {
        ok(`${p.label}: removed → ${dest}`);
        removed++;
      }
    }
    info(removed ? `Removed ${removed} install(s).` : "Nothing was installed there.");
  });

program
  .command("update")
  .description("Refresh existing installs with this CLI's bundled skill")
  .option("--global", "update the home-dir install location")
  .action((opts) => {
    let n = 0;
    for (const p of PLATFORMS) {
      const dest = targetSkillDir(p, !!opts.global);
      if (isInstalled(dest)) {
        installSkill(dest);
        ok(`${p.label}: refreshed → ${dest}`);
        n++;
      }
    }
    if (!n) info("No existing installs found here.");
    info("Tip: upgrade the CLI first with `npm i -g mighty-diagram-cli@latest`.");
  });

program
  .command("list")
  .description("List supported platforms and their install paths")
  .action(() => {
    console.log(pc.bold("\nSupported platforms:\n"));
    for (const p of PLATFORMS) {
      const tag = p.verified ? pc.green(" (verified)") : "";
      console.log(
        `  ${pc.bold(p.id.padEnd(12))} ${p.label.padEnd(18)} ${pc.dim(p.base + "/" + SKILL_DIR_NAME)}${tag}`,
      );
    }
    console.log(
      `\n  ${pc.dim("Use:")} mighty-diagram init --ai <id>  ${pc.dim("(or --ai all)")}\n`,
    );
  });

program
  .command("versions")
  .description("Show the installed CLI version (it bundles the matching skill)")
  .action(() => {
    info(`mighty-diagram-cli v${cliVersion()} (bundles the skill of the same version)`);
    info("Update with: npm i -g mighty-diagram-cli@latest");
  });

program.parseAsync(process.argv);
