#!/usr/bin/env npx tsx
/**
 * Project architect: runs tsc and reports structure for this TypeScript/Next.js repo.
 * Run from repo root: npx tsx .claude/skills/senior-architect/scripts/project_architect.ts [--verbose] [--json]
 */

import * as fs from "fs";
import * as path from "path";
import { spawnSync } from "child_process";

const ROOT = path.resolve(__dirname, "../../../..");

interface Result {
  status: "success" | "failure";
  target: string;
  tsc: { ok: boolean; stderr: string; stdout: string };
  lint: { run: boolean; ok?: boolean; stderr?: string };
  structure: {
    hasSrcApp: boolean;
    hasSrcLib: boolean;
    hasTasks: boolean;
    hasDocsPlans: boolean;
    apiRouteCount: number;
  };
}

function countApiRoutes(dir: string): number {
  let n = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      n += countApiRoutes(path.join(dir, e.name));
    } else if (e.name === "route.ts" || e.name === "route.tsx") {
      n += 1;
    }
  }
  return n;
}

function main(): void {
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose");
  const jsonOut = args.includes("--json");

  const tsc = spawnSync("npx", ["tsc", "--noEmit"], {
    cwd: ROOT,
    encoding: "utf-8",
    shell: true,
  });
  const tscOk = tsc.status === 0;

  let lintRun = false;
  let lintOk: boolean | undefined;
  let lintStderr: string | undefined;
  const pkgPath = path.join(ROOT, "package.json");
  const pkg = fs.existsSync(pkgPath) ? JSON.parse(fs.readFileSync(pkgPath, "utf-8")) : {};
  if (pkg.scripts?.lint) {
    lintRun = true;
    const lint = spawnSync("npm", ["run", "lint"], { cwd: ROOT, encoding: "utf-8", shell: true });
    lintOk = lint.status === 0;
    lintStderr = lint.stderr || lint.stdout;
  }

  const apiDir = path.join(ROOT, "src", "app", "api");
  const result: Result = {
    status: tscOk && (lintRun ? !!lintOk : true) ? "success" : "failure",
    target: ROOT,
    tsc: { ok: tscOk, stderr: tsc.stderr || "", stdout: tsc.stdout || "" },
    lint: { run: lintRun, ok: lintOk, stderr: lintStderr },
    structure: {
      hasSrcApp: fs.existsSync(path.join(ROOT, "src", "app")),
      hasSrcLib: fs.existsSync(path.join(ROOT, "src", "lib")),
      hasTasks: fs.existsSync(path.join(ROOT, "tasks")),
      hasDocsPlans: fs.existsSync(path.join(ROOT, "docs", "plans")),
      apiRouteCount: countApiRoutes(apiDir),
    },
  };

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log("Project Architect Report");
  console.log("=======================");
  console.log(`Target: ${ROOT}`);
  console.log(`TypeScript (tsc --noEmit): ${tscOk ? "PASS" : "FAIL"}`);
  if (tscOk === false && (tsc.stderr || tsc.stdout)) {
    console.log(verbose ? (tsc.stderr || tsc.stdout) : (tsc.stderr || tsc.stdout).split("\n").slice(0, 15).join("\n"));
  }
  if (lintRun) {
    console.log(`Lint (npm run lint): ${lintOk ? "PASS" : "FAIL"}`);
    if (lintOk === false && verbose && lintStderr) console.log(lintStderr);
  }
  console.log("\nStructure:");
  console.log(`  src/app:     ${result.structure.hasSrcApp ? "yes" : "no"}`);
  console.log(`  src/lib:     ${result.structure.hasSrcLib ? "yes" : "no"}`);
  console.log(`  tasks/:      ${result.structure.hasTasks ? "yes" : "no"}`);
  console.log(`  docs/plans/: ${result.structure.hasDocsPlans ? "yes" : "no"}`);
  console.log(`  API routes:  ${result.structure.apiRouteCount}`);
  console.log(`\nOverall: ${result.status === "success" ? "PASS" : "FAIL"}`);
}

main();
