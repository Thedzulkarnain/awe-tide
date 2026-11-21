import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TEXT = `You fall asleep on the sand.
The tide comes in, slow.
A wave. A pause. A wave.
Your grandmother sits beside you, close.
The sea has come this far
twice a day since before there were shores,
and it is coming still,
over the sand, over you.
You can stay.
`;

const outDir = "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");

const written = readFileSync(outPath, "utf8");
const writtenBytes = readFileSync(outPath);
const expectedBytes = Buffer.from(TEXT, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  console.error("entry.txt bytes do not match the embedded text encoded as UTF-8");
  process.exit(1);
}
if (written !== TEXT) {
  console.error("entry.txt content does not match the embedded text");
  process.exit(1);
}
const count = [...written].length;
if (count < 1 || count > 280) {
  console.error(`character count ${count} is outside 1-280`);
  process.exit(1);
}
if (written.trim().length === 0) {
  console.error("entry.txt is only whitespace");
  process.exit(1);
}
console.log(`wrote ${outPath} (${count} characters)`);
