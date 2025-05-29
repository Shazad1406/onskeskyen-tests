import { test, expect } from '@playwright/test';

test('Visual test of login page', async ({ page }) => {
  await page.goto('https://onskeskyen.dk');
  
// Accept cookie banner if it appears
  const cookieButton = page.getByRole('button', { name: /accepter alle/i });
  if (await cookieButton.isVisible()) {
    await cookieButton.click();
  }

 
  await page.getByRole('button', { name: 'Log ind' }).click();

  // Wait for login flow
  await page.getByRole('button', { name: /fortsæt med e-mail/i }).waitFor();

  // Screenshot of the login page
  await expect(page).toHaveScreenshot('login-page.png');
});