// Where each supported AI assistant reads project-local "skills".
// `base` is the per-project directory; the global install uses the same path under $HOME.
// Claude Code is the first-class, verified target. The rest follow the common
// `<tool>/skills` convention — adjust here if a tool you use expects a different path.

export interface Platform {
  id: string;
  label: string;
  base: string; // relative to the project root (and to $HOME for --global)
  verified?: boolean;
}

export const PLATFORMS: Platform[] = [
  { id: "claude", label: "Claude Code", base: ".claude/skills", verified: true },
  { id: "cursor", label: "Cursor", base: ".cursor/skills" },
  { id: "windsurf", label: "Windsurf", base: ".windsurf/skills" },
  { id: "copilot", label: "GitHub Copilot", base: ".github/skills" },
  { id: "codex", label: "Codex CLI", base: ".codex/skills" },
  { id: "gemini", label: "Gemini CLI", base: ".gemini/skills" },
  { id: "opencode", label: "OpenCode", base: ".opencode/skills" },
  { id: "continue", label: "Continue", base: ".continue/skills" },
  { id: "droid", label: "Droid (Factory)", base: ".factory/skills" },
  { id: "kilocode", label: "KiloCode", base: ".kilocode/skills" },
  { id: "roocode", label: "Roo Code", base: ".roo/skills" },
  { id: "qoder", label: "Qoder", base: ".qoder/skills" },
  { id: "warp", label: "Warp", base: ".warp/skills" },
  { id: "augment", label: "Augment", base: ".augment/skills" },
  { id: "antigravity", label: "Antigravity", base: ".antigravity/skills" },
  { id: "codebuddy", label: "CodeBuddy", base: ".codebuddy/skills" },
  { id: "kiro", label: "Kiro", base: ".kiro/skills" },
  { id: "trae", label: "Trae", base: ".trae/skills" },
];

export const SKILL_DIR_NAME = "mighty-diagram";

export function findPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id.toLowerCase());
}
