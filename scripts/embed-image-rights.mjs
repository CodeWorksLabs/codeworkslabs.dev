import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { COPYRIGHT_NOTICE, RIGHTS_STATEMENT, RIGHTS_XMP } from "../src/image-rights.mjs";

const root = path.resolve(import.meta.dirname, "..");
const files = [
  path.join(root, "src", "assets", "codeworkslabs-systems.png"),
  path.join(root, "public", "media", "codeworkslabs-systems.png"),
];

function digest(value) {
  return createHash("sha256").update(value).digest("hex").toUpperCase();
}

const originalPixels = await sharp(files[0]).raw().toBuffer();
const source = await readFile(files[0]);
const encoded = await sharp(source).withXmp(RIGHTS_XMP).png().toBuffer();
const encodedPixels = await sharp(encoded).raw().toBuffer();

if (digest(originalPixels) !== digest(encodedPixels)) {
  throw new Error("Embedding rights metadata changed the decoded artwork pixels.");
}

for (const file of files) await writeFile(file, encoded);

const metadata = await sharp(encoded).metadata();
if (!metadata.xmpAsString?.includes(COPYRIGHT_NOTICE) ||
    !metadata.xmpAsString?.includes(RIGHTS_STATEMENT)) {
  throw new Error("Embedded XMP rights metadata could not be verified.");
}

console.log(`Embedded verified XMP in ${files.length} authoritative PNG files.`);
console.log(`Decoded-pixel SHA-256: ${digest(encodedPixels)}`);
console.log(`File SHA-256: ${digest(encoded)}`);
