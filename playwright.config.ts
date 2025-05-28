import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  workers: 1,
  use: {
    headless: process.env.HEADLESS !== 'false',
    launchOptions: {
      slowMo: 500
    }
  },
};

export default config;