import { execSync } from "child_process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputFile = "/output/entry.txt";

function runOnce() {
  execSync("npx tsx main.ts", {
    cwd: __dirname,
    stdio: "pipe",
  });
  return readFileSync(outputFile);
}

const run1 = runOnce();
const run2 = runOnce();

if (run1.equals(run2)) {
  console.log("✓ Deterministic: both runs produced identical output");
  console.log(`Output (${run1.length} bytes): ${run1.toString("utf-8")}`);
  process.exit(0);
} else {
  console.error("✗ Non-deterministic: runs differ");
  console.error(`Run 1: ${run1.toString("utf-8")}`);
  console.error(`Run 2: ${run2.toString("utf-8")}`);
  process.exit(1);
}