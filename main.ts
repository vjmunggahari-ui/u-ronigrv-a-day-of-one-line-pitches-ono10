// A Day of One-Line Pitches: writes one persuasive sentence to entry.txt.
// The pitch is the whole entry: max 240 chars, one sentence that would convince
// a friend who has never coded to let an AI agent build their first app idea.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Your app idea doesn't need a developer or a single line of code: just tell an AI agent on make.fun what you want, like you'd tell a friend, and hold the first working version in your hand tonight.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, PITCH, "utf8");

if (PITCH.length === 0 || PITCH.length > 240) {
  throw new Error(`pitch length ${PITCH.length} outside 1..240`);
}
if (PITCH.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

// Read-back verification: the file on disk must be byte-identical to the pitch.
const back = readFileSync(outPath, "utf8");
if (back !== PITCH) {
  throw new Error("read-back mismatch: entry.txt differs from the chosen pitch");
}

// Single-sentence check: exactly one terminal full stop, ignoring the dot
// inside the "make.fun" brand name, and the pitch must name make.fun.
const terminalStops = PITCH.replaceAll("make.fun", "makefun").split("").filter((c) => c === ".").length;
if (terminalStops !== 1) {
  throw new Error(`pitch must be one sentence, found ${terminalStops} terminal stops`);
}
if (!PITCH.includes("make.fun")) {
  throw new Error("pitch must name make.fun");
}
console.log(`wrote entry.txt (${PITCH.length} chars)`);
