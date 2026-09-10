import { baseService } from "astro/assets";
import sharp from "sharp";
import { RIGHTS_XMP } from "./image-rights.mjs";

sharp.cache(false);

const qualityTable = { low: 25, mid: 50, high: 80, max: 100 };
const fitMap = {
  fill: "fill",
  contain: "inside",
  cover: "cover",
  none: "outside",
  "scale-down": "inside",
  outside: "outside",
  inside: "inside",
};

function resolveQuality(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const numeric = Number.parseInt(value, 10);
  return Number.isNaN(numeric) ? qualityTable[value] : numeric;
}

const imageService = {
  ...baseService,
  async transform(inputBuffer, transform) {
    const metadata = await sharp(inputBuffer, { failOn: "none", pages: -1 }).metadata();
    const inputFormat = metadata.format === "heif" ? "avif" : metadata.format;
    const outputFormat = transform.format ?? inputFormat;

    if (!outputFormat) {
      throw new Error(`Unable to determine the format of image ${transform.src}.`);
    }

    if (outputFormat === "svg") {
      return { data: inputBuffer, format: "svg" };
    }

    const image = sharp(inputBuffer, { failOn: "none", pages: -1 }).rotate();
    const kernel = "lanczos3";

    if (transform.width && transform.height) {
      image.resize({
        width: Math.round(transform.width),
        height: Math.round(transform.height),
        kernel,
        fit: transform.fit ? fitMap[transform.fit] ?? "inside" : undefined,
        position: transform.position,
        withoutEnlargement: true,
      });
    } else if (transform.height) {
      image.resize({
        height: Math.round(transform.height),
        kernel,
        withoutEnlargement: true,
      });
    } else if (transform.width) {
      image.resize({
        width: Math.round(transform.width),
        kernel,
        withoutEnlargement: true,
      });
    }

    if (transform.background) image.flatten({ background: transform.background });

    const quality = resolveQuality(transform.quality);
    const encoderOptions = quality === undefined ? undefined : { quality };

    image.withXmp(RIGHTS_XMP);
    if (outputFormat === "webp") image.webp(encoderOptions);
    else if (outputFormat === "png") image.png(encoderOptions);
    else if (outputFormat === "avif") image.avif(encoderOptions);
    else if (outputFormat === "jpeg" || outputFormat === "jpg") image.jpeg(encoderOptions);
    else image.toFormat(outputFormat, encoderOptions);

    const { data, info } = await image.toBuffer({ resolveWithObject: true });
    return { data: new Uint8Array(data), format: info.format };
  },
};

export default imageService;
