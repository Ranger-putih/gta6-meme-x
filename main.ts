// gta6-meme-x-01 — the entry is the X post itself, so this program only has one
// job: hand the post's address to the gate by moving POST.json from the
// repository into the output directory, byte for byte. Node 22, standard
// library only, no network, no clock, nothing outside the repository.
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// On success it prints nothing. POST.json still holds the starter placeholder
// until the meme is posted on X; fill it in with the real post address first.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = resolve(repoRoot, 'POST.json');
const target = resolve(outDir, 'POST.json');

if (!existsSync(source)) {
  console.error(`No POST.json found in ${repoRoot}; put the X post address in it first.`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
try {
  // Plain byte copy, so two runs always write the same bytes.
  writeFileSync(target, readFileSync(source));
} catch (err) {
  console.error(`Could not copy ${source} to ${target}: ${(err as Error).message}`);
  process.exit(1);
}
