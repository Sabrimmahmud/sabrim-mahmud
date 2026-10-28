import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/education",
  "/experience",
  "/research",
  "/publications",
  "/publications/politicanet-bangla-political-hate-speech",
  "/publications/identifying-bangla-political-hate-speech-transformers",
  "/projects",
  "/projects/unisentix",
  "/projects/youtube-transcript-analyzer",
  "/projects/medical-ai-pipeline",
  "/achievements",
  "/academic",
  "/skills",
  "/writing",
  "/cv",
  "/contact",
];

for (const route of routes) {
  test(`${route} renders one h1 and fits the viewport`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("unknown pages return 404 with a way back", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page isn’t here");
  await page.getByRole("main").getByRole("link", { name: "Publications" }).click();
  await expect(page).toHaveURL(/\/publications$/);
});

test("internal links on every page resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!.split("#")[0]));
    hrefs.forEach((h) => seen.add(h));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("external links open safely", async ({ page }) => {
  for (const route of ["/", "/contact", "/publications/politicanet-bangla-political-hate-speech"]) {
    await page.goto(route);
    const unsafe = await page.$$eval("a[target='_blank']", (as) =>
      as.filter((a) => !(a.getAttribute("rel") ?? "").includes("noopener")).map((a) => a.getAttribute("href")),
    );
    expect(unsafe).toEqual([]);
  }
});

test("theme toggle switches and persists across reloads", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to (dark|light) theme/i });
  const before = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  await toggle.click();
  const after = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  expect(after).not.toBe(before);
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.getAttribute("data-theme"))).toBe(after);
});

test("certificate lightbox opens, steps through images and closes with Escape", async ({ page }) => {
  await page.goto("/achievements");
  const trigger = page.getByRole("button", { name: /Enlarge: With teammate Samaun Rezvi Payel/ });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("1 of 5");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("2 of 5");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("5 of 5");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("copy DOI gives feedback", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/publications/politicanet-bangla-political-hate-speech");
  await page.getByRole("button", { name: "Copy DOI" }).click();
  await expect(page.getByRole("button", { name: /Copied/ }).first()).toBeVisible();
});

test("referee contact details are not published", async ({ page }) => {
  for (const route of ["/contact", "/academic", "/cv"]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText("diu.edu.bd");
  }
});

test("CV downloads are real PDFs", async ({ request }) => {
  for (const href of ["/cv/sabrim-mahmud-academic-cv.pdf", "/cv/sabrim-mahmud-resume.pdf"]) {
    const res = await request.get(href);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
    expect((await res.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("menu opens, lists every section and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open menu" });
    await button.click();
    const nav = page.getByRole("navigation", { name: "Main", exact: true });
    await expect(nav.getByRole("link")).toHaveCount(13);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await page.getByRole("button", { name: "Open menu" }).click();
    await nav.getByRole("link", { name: /Skills/ }).click();
    await expect(page).toHaveURL(/\/skills$/);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => !!isMobile, "desktop only");

  test("More menu is keyboard operable", async ({ page }) => {
    await page.goto("/");
    const more = page.getByRole("button", { name: "More" });
    await more.click();
    await expect(more).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(more).toHaveAttribute("aria-expanded", "false");
    await expect(more).toBeFocused();
    await more.click();
    await page.getByRole("banner").getByRole("link", { name: /Achievements/ }).click();
    await expect(page).toHaveURL(/\/achievements$/);
    await expect(page.getByRole("link", { name: "Publications", exact: true }).first()).not.toHaveAttribute("aria-current");
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/research");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});
