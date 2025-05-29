// tests/04_visual.spec.ts

import { test, expect } from '@playwright/test';
import { signupWithEmail, loginWithEmail } from './helpers/auth';

// This test captures a visual snapshot of the profile page for comparison
test('Visual test of profile page', async ({ page }) => {
  const { email, password } = await signupWithEmail(page); // Sign up a new user
  await loginWithEmail(page, email, password); // Log in with the same user

  // Navigate to the profile page
  await page.goto('https://onskeskyen.dk/min-profil');

  // Take a visual snapshot of the page and compare it to the stored baseline
  await expect(page).toHaveScreenshot('profile-page.png');
});