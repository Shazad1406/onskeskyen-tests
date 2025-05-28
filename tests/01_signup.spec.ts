import { test } from '@playwright/test';
import { signupWithEmail } from './helpers/auth'; // ✅ korrekt sti

test('User can sign up', async ({ page }) => {
  await signupWithEmail(page);
});