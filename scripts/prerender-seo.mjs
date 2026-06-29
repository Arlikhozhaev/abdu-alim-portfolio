import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSeoShellHtml } from "./seo-shell.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distIndex = path.resolve(__dirname, "../dist/index.html");

const ROOT_MARKER = '<div id="root"></div>';
const ROOT_WITH_SHELL = (shell) => `<div id="root">${shell}</div>`;

export const injectSeoShell = async (indexPath = distIndex) => {
  const html = await readFile(indexPath, "utf8");

  if (!html.includes(ROOT_MARKER)) {
    if (html.includes('id="seo-prerender"')) {
      return { indexPath, skipped: true };
    }
    throw new Error(
      `Could not find ${ROOT_MARKER} in ${indexPath}. SEO prerender expects the default Vite index.html shell.`,
    );
  }

  const shell = buildSeoShellHtml();
  const nextHtml = html.replace(ROOT_MARKER, ROOT_WITH_SHELL(shell));
  await writeFile(indexPath, nextHtml, "utf8");

  return { indexPath, skipped: false };
};

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  injectSeoShell()
    .then(({ indexPath, skipped }) => {
      if (skipped) {
        console.log(`SEO shell already present in ${indexPath}`);
        return;
      }
      console.log(`Injected SEO prerender shell into ${indexPath}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
