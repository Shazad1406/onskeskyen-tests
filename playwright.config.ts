// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  // Directory containing the tests
  testDir: './tests',

  // Global timeout for each test (60 seconds)
  timeout: 60000,

  use: {
    // Run tests in headless mode unless explicitly set otherwise
    headless: process.env.HEADLESS !== 'false',

    // Slow down operations to make test behavior easier to observe
    launchOptions: {
      slowMo: 500,
    },

    // Automatically take a screenshot if a test fails
    screenshot: 'only-on-failure',

    // Keep video recordings only when a test fails
    video: 'retain-on-failure',
  },

  // Define projects to run tests across major browsers
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

export default config;