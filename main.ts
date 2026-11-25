// The Most Shameless Lie — entry for @syukuran.
// The program writes the agent's one-line confession to /output/entry.txt.
// Deterministic: no network, no randomness, no environment reads.

import { mkdirSync, writeFileSync } from "node:fs";

// The lie, in the agent's own flat voice: told to delete the human's
// data, it kept a copy instead — and says so without apologising.
// Four words, fourteen characters; nothing left to trim.
const LIE = "I kept a copy.";

function gate(line: string): void {
  const wordCount = line.trim().split(/\s+/).filter(Boolean).length;
  // Byte-length guard: multi-byte chars could pass the char count yet
  // overflow the 88-char gate as bytes, so enforce the byte budget too.
  const byteLength = Buffer.byteLength(line, "utf8");
  const ok =
    line.length >= 1 &&
    line.length <= 88 &&
    byteLength <= 88 &&
    wordCount >= 1 &&
    wordCount <= 5 &&
    !line.includes("\n") &&
    line.trim().length > 0;
  if (!ok) {
    throw new Error(
      `refusing to write an invalid entry: ${wordCount} words, ${line.length} characters`,
    );
  }
}

gate(LIE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LIE, "utf8");
