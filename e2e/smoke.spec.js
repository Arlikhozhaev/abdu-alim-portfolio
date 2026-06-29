import { test, expect } from "@playwright/test";

test.describe("Portfolio smoke tests", () => {
  test("loads the desktop welcome screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#welcome")).toBeVisible();
    await expect(page.getByText("portfolio", { exact: true })).toBeVisible();
  });

  test("opens Resume from the menu bar", async ({ page }) => {
    await page.goto("/");
    await page.locator("nav").getByText("Resume", { exact: true }).click();
    await expect(page.locator("#resume")).toBeVisible();
  });

  test("opens Projects in Finder from the menu bar", async ({ page }) => {
    await page.goto("/");
    await page.locator("nav").getByText("Projects", { exact: true }).click();
    await expect(page.locator("#finder")).toBeVisible();
    await expect(page.locator("#finder").getByText("ReviewLens").first()).toBeVisible();
  });

  test("shows contact CTA on welcome screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Get in touch" })).toBeVisible();
  });
});
