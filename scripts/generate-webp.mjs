import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, "../public/images");

const IMAGE_EXT = /\.(png|jpe?g)$/i;

const walkImages = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkImages(fullPath)));
    } else if (IMAGE_EXT.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
};

const convertToWebp = async (filePath) => {
  const outputPath = filePath.replace(IMAGE_EXT, ".webp");
  const inputStat = await stat(filePath);
  const outputStat = await stat(outputPath).catch(() => null);

  if (outputStat && outputStat.mtimeMs >= inputStat.mtimeMs) {
    return { filePath, skipped: true };
  }

  await sharp(filePath)
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  return { filePath, skipped: false };
};

const main = async () => {
  const files = await walkImages(imagesDir);
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await convertToWebp(file);
    if (result.skipped) skipped += 1;
    else converted += 1;
  }

  console.log(
    `WebP: ${converted} converted, ${skipped} up to date (${files.length} raster images scanned).`,
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
