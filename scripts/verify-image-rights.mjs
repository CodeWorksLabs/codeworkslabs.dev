import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { COPYRIGHT_NOTICE, RIGHTS_STATEMENT } from "../src/image-rights.mjs";

const root = path.resolve(import.meta.dirname, "..");
const originals = [
  path.join(root, "src", "assets", "codeworkslabs-systems.png"),
  path.join(root, "public", "media", "codeworkslabs-systems.png"),
];
const derivativeDirectory = path.join(root, "dist", "_astro");

function digest(value) {
  return createHash("sha256").update(value).digest("hex").toUpperCase();
}

async function assertRights(file) {
  const metadata = await sharp(file).metadata();
  const xmp = metadata.xmpAsString ?? "";
  if (!xmp.includes(COPYRIGHT_NOTICE) || !xmp.includes(RIGHTS_STATEMENT)) {
    throw new Error(`Required XMP rights metadata is missing from ${file}.`);
  }
}

const originalBuffers = await Promise.all(originals.map((file) => readFile(file)));
if (digest(originalBuffers[0]) !== digest(originalBuffers[1])) {
  throw new Error("The working master and canonical public PNG are not byte-identical.");
}
await Promise.all(originals.map(assertRights));

const derivatives = (await readdir(derivativeDirectory))
  .filter((name) => name.startsWith("codeworkslabs-systems."))
  .map((name) => path.join(derivativeDirectory, name));

if (derivatives.length !== 15) {
  throw new Error(`Expected 15 generated artwork derivatives; found ${derivatives.length}.`);
}
await Promise.all(derivatives.map(assertRights));

console.log(`Verified rights metadata in 2 authoritative PNGs and ${derivatives.length} Astro derivatives.`);
console.log(`Authoritative file SHA-256: ${digest(originalBuffers[0])}`);
