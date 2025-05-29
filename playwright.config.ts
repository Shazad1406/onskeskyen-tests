import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: process.env.HEADLESS !== 'false',

    // Gør visuelle tests mere stabile:
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 300, // Giver browseren lidt tid til at indlæse elementer ordentligt
    },
    actionTimeout: 10000,   
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Disabler CSS animationer (kan også gøres i selve testen)
    // NOTE: Kun hvis du har global setup
    // Set disableAnimations: true hvis du vil bruge plugins eller tilføje global style
  },
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