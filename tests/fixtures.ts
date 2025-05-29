// tests/fixtures.ts

import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

// Extend the base test with a custom fixture: loggedInPage
// This fixture provides a page instance that is already logged in
export const test = base.extend<{
  loggedInPage: Page;
}>({
  loggedInPage: async ({ page }, use) => {
    // Navigate to the site and handle the cookie banner
    await page.goto('https://onskeskyen.dk');
    await page.getByRole('button', { name: /accepter alle/i }).click();

    // Perform login using a fixed test account
    await page.getByRole('button', { name: 'Log ind' }).click();
    await page.getByRole('button', { name: /fortsæt med e-mail/i }).click();
    await page.getByPlaceholder('E-mail').fill('test_login@mail.com');
    await page.getByPlaceholder('Adgangskode').fill('TestPassword123!');
    await page.getByText('Log ind', { exact: true }).last().click();

    // Provide the logged-in page to the test
    await use(page);
  }
});