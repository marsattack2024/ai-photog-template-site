#!/usr/bin/env npx tsx
/**
 * Dependency analyzer for this repo: lists direct deps and optional npm audit summary.
 * Run from repo root: npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts [--audit] [--json]
 */

import * as fs from "fs";
import * as path from "path";
import { spawnSync } from "child_process";

const ROOT = path.resolve(__dirname, "../../../..");
const PKG_PATH = path.join(ROOT, "package.json");

interface Result {
  status: string;
  target: string;
  dependencies: string[];
  devDependencies: string[];
  audit?: { vulnerabilities: { low: number; moderate: number; high: number; critical: number }; run: boolean };
}

function main(): void {
  const args = process.argv.slice(2);
  const withAudit = args.includes("--audit");
  const jsonOut = args.includes("--json");

  if (!fs.existsSync(PKG_PATH)) {
    const out: Result = {
      status: "error",
      target: ROOT,
      dependencies: [],
      devDependencies: [],
    };
    console.log(jsonOut ? JSON.stringify(out, null, 2) : "No package.json found.");
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, "utf-8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const dependencies = Object.keys(pkg.dependencies ?? {}).sort();
  const devDependencies = Object.keys(pkg.devDependencies ?? {}).sort();

  let audit: Result["audit"];
  if (withAudit) {
    const auditRun = spawnSync("npm", ["audit", "--json"], {
      cwd: ROOT,
      encoding: "utf-8",
      shell: true,
    });
    let low = 0,
      moderate = 0,
      high = 0,
      critical = 0;
    try {
      const auditJson = JSON.parse(auditRun.stdout || "{}") as {
        metadata?: { vulnerabilities?: { low?: number; moderate?: number; high?: number; critical?: number } };
      };
      const v = auditJson.metadata?.vulnerabilities ?? {};
      low = v.low ?? 0;
      moderate = v.moderate ?? 0;
      high = v.high ?? 0;
      critical = v.critical ?? 0;
    } catch {
      // ignore parse errors
    }
    audit = { vulnerabilities: { low, moderate, high, critical }, run: true };
  }

  const result: Result = {
    status: "success",
    target: ROOT,
    dependencies,
    devDependencies,
    audit,
  };

  if (jsonOut) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log("Dependency Analyzer Report");
  console.log("=========================");
  console.log(`Target: ${ROOT}`);
  console.log(`Dependencies (${dependencies.length}):`);
  dependencies.forEach((d) => console.log(`  ${d}`));
  console.log(`DevDependencies (${devDependencies.length}):`);
  devDependencies.forEach((d) => console.log(`  ${d}`));
  if (audit) {
    const { low, moderate, high, critical } = audit.vulnerabilities;
    console.log("\nAudit summary (npm audit):");
    console.log(`  Low: ${low}, Moderate: ${moderate}, High: ${high}, Critical: ${critical}`);
  }
}

main();
