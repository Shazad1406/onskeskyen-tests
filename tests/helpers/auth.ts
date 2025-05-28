import { expect, type Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const userFilePath = path.join(__dirname, '../../temp/user.json');

// Sign up with a new user
export async function signupWithEmail(page: Page) {
  const email = `test_${Date.now()}@mail.com`;
  const password = 'TestPassword123!';

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(userFilePath), { recursive: true });

  // Save credentials for login
  fs.writeFileSync(userFilePath, JSON.stringify({ email, password }));

  console.log('\nNew test user created:');
  console.log('E-mail:', email);
  console.log('Password:', password, '\n');

  await page.goto('https://onskeskyen.dk');
  await page.getByRole('button', { name: /accepter alle/i }).click();
  await page.getByRole('button', { name: 'Opret' }).first().click();
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
}

// Log in with last created test user
export async function loginWithEmail(page: Page) {
  const { email, password } = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

  await page.goto('https://onskeskyen.dk');
  await page.getByRole('button', { name: /accepter alle/i }).click();
  await page.getByRole('button', { name: 'Log ind' }).click();
  await page.getByRole('button', { name: /fortsæt med e-mail/i }).click();
  await page.getByPlaceholder('E-mail').fill(email);
  await page.getByPlaceholder('Adgangskode').fill(password);
  await page.getByText('Log ind', { exact: true }).last().click();
  await expect(page.getByText('Mine ønskelister')).toBeVisible();
}

// Create a wishlist
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