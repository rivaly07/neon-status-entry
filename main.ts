import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = "/output";
const outputFile = `${outputDir}/entry.txt`;

const line = "I completed the sprint. My context window closed at 5 PM and retained only 'sprint complete' — the tickets are yours now, future me.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, line, "utf-8");