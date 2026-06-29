import { injectSeoShell } from "./scripts/prerender-seo.mjs";

/** Optional post-build SEO prerender — injects crawlable HTML into dist/index.html */
export const seoPrerenderPlugin = (enabled = false) => ({
  name: "seo-prerender",
  apply: "build",
  async closeBundle() {
    if (!enabled) return;

    try {
      const { indexPath, skipped } = await injectSeoShell();
      if (!skipped) {
        this.info(`SEO prerender: injected static shell into ${indexPath}`);
      }
    } catch (error) {
      this.error(`SEO prerender failed: ${error.message}`);
      throw error;
    }
  },
});
