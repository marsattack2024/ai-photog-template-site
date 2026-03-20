#!/usr/bin/env npx tsx
/**
 * Architecture diagram generator for this TypeScript/Next.js codebase.
 * Scans src/app/api for route.ts and src/lib for modules; outputs list or Mermaid.
 * Run from repo root: npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts [--mermaid] [--json]
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "../../../..");
const SRC = path.join(ROOT, "src");
const API_DIR = path.join(SRC, "app", "api");
const LIB_DIR = path.join(SRC, "lib");

interface Result {
  apiRoutes: string[];
  libModules: string[];
  status: string;
  target: string;
}

function findApiRoutes(dir: string, base = ""): string[] {
  const routes: string[] = [];
  if (!fs.existsSync(dir)) return routes;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      routes.push(...findApiRoutes(path.join(dir, e.name), rel));
    } else if (e.name === "route.ts" || e.name === "route.tsx") {
      routes.push(base || "(root)");
    }
  }
  return routes;
}

function findLibModules(dir: string): string[] {
  const modules: string[] = [];
  if (!fs.existsSync(dir)) return modules;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    if (e.isDirectory()) {
      modules.push(e.name);
    } else if (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) {
      modules.push(e.name.replace(/\.(ts|tsx)$/, ""));
    }
  }
  return modules.sort();
}

function toMermaid(r: Result): string {
  const lines: string[] = ["flowchart LR", "  subgraph api [API Routes]"];
  for (const route of r.apiRoutes.slice(0, 30)) {
    const id = route.replace(/\//g, "_").replace(/[^a-zA-Z0-9_]/g, "") || "root";
    lines.push(`    ${id}["${route || "/api"}"]`);
  }
  lines.push("  end", "  subgraph lib [src/lib]");
  for (const mod of r.libModules.slice(0, 20)) {
    const id = mod.replace(/[^a-zA-Z0-9]/g, "_");
    lines.push(`    ${id}["${mod}"]`);
  }
  lines.push("  end");
  return lines.join("\n");
}

function main(): void {
  const args = process.argv.slice(2);
  const mermaid = args.includes("--mermaid");
  const jsonOut = args.includes("--json");

  const apiRoutes = findApiRoutes(API_DIR);
  const libModules = findLibModules(LIB_DIR);
  const result: Result = {
    apiRoutes,
    libModules,
    status: "success",
    target: ROOT,
  };

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (mermaid) {
    console.log(toMermaid(result));
    return;
  }

  console.log("API Routes (src/app/api/.../route.ts):");
  console.log(apiRoutes.length ? apiRoutes.map((r) => `  /api/${r}`).join("\n") : "  (none)");
  console.log("\nLib Modules (src/lib):");
  console.log(libModules.length ? libModules.map((m) => `  ${m}`).join("\n") : "  (none)");
  console.log(`\nTotal: ${apiRoutes.length} routes, ${libModules.length} lib modules`);
}

main();
