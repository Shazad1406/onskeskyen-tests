import { type Page, expect } from '@playwright/test';

/**
 * Dismisses the cookie banner and removes any overlay that might block interactions.
 */
async function dismissCookieBanner(page: Page) {
  try {
    const acceptButton = page.getByRole('button', { name: /accepter alle/i });

    if (await acceptButton.isVisible({ timeout: 3000 })) {
      await acceptButton.click();
      await page.waitForTimeout(500); // Give the DOM time to update
    }

    await page.evaluate(() => {
      document.getElementById('cookie-information-template-wrapper')?.remove();
      document.getElementById('coiOverlay')?.remove();
    });
  } catch {
    // If the banner is not present, do nothing
  }
}

/**
 * Signs up a new user and returns the credentials.
 */
export async function signupWithEmail(page: Page): Promise<{ email: string; password: string }> {
  const email = `test_${Date.now()}@mail.com`;
  const password = 'TestPassword123!';

  await page.goto('https://onskeskyen.dk');
  await page.waitForLoadState('networkidle');
  await dismissCookieBanner(page);

  await page.getByRole('button', { name: 'Opret' }).first().click();
  await page.waitForTimeout(200);

  await page.getByRole('button', { name: /fortsæt med e-mail/i }).click();
  await page.getByPlaceholder('E-mail').fill(email);
  await page.getByPlaceholder('Adgangskode').fill(password);
  await page.getByRole('button', { name: 'Næste' }).click();

  await page.getByPlaceholder('Fornavn').fill('Test');
  await page.getByPlaceholder('Efternavn').fill('Bruger');

  await page.locator('#registerSelectMonth').click();
  await page.getByText('jan').click();

  await page.locator('#registerSelectDay').click();
  await page.keyboard.press('Enter');

  await page.locator('#registerSelectYear').click();
  await page.getByText('2010').click();

  await page.locator('#rc_select_3').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await page.getByRole('button', { name: 'OPRET PROFIL' }).click();

  return { email, password };
}

/**
 * Logs in a user using the given email and password.
 */
export async function loginWithEmail(page: Page, email: string, password: string) {
  await page.goto('https://onskeskyen.dk');
  await dismissCookieBanner(page);

  await page.getByRole('button', { name: 'Log ind' }).click();
  await page.getByRole('button', { name: /fortsæt med e-mail/i }).click();

  await page.getByPlaceholder('E-mail').fill(email);
  await page.getByPlaceholder('Adgangskode').fill(password);

  await page.getByText('Log ind', { exact: true }).last().click();
  await expect(page.getByText('Mine ønskelister')).toBeVisible();
}

/**
 * Creates a new wishlist with the given name.
 */
export async function createWishlist(page: Page, wishlistName: string) {
  await page.getByText('Opret ønskeliste', { exact: true }).click();
  await page.getByText('Til mig', { exact: true }).click();

  const input = page.locator('[data-testid="create-wishlist-title-input"]');
  await input.click();
  await page.keyboard.press('Meta+A');
  await page.keyboard.press('Backspace');
  await input.fill(wishlistName);

  await page.locator('[data-testid="createWishlistSubmitButton"]').click();
}