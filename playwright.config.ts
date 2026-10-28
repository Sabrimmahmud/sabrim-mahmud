import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests against the production build.
 *   npm run build && npm run test:e2e
 * Set PW_CHROMIUM_PATH to use a specific Chromium binary instead of Playwright's own.
 */
const executablePath = process.env.PW_CHROMIUM_PATH;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3200",
    launchOptions: executablePath ? { executablePath, args: ["--no-sandbox"] } : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npx next start -p 3200",
    url: "http://localhost:3200",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
