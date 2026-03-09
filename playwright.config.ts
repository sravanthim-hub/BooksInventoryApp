import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  /* comment the html report and uncomment below if xray report needs to be generated for xray integration */
  /* reporter: [
    [
      "@xray-app/playwright-junit-reporter",
      {
        outputFile: "./test-results/xray-report.xml",
      },
    ],
  ],*/
  use: {
    baseURL:
      process.env.BASE_URL || "https://frontendui-librarysystem.onrender.com",
    trace: "off",
    headless: true,
    screenshot: "off",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
