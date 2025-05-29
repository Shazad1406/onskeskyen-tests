// tests/01_signup.spec.ts

import { test } from '@playwright/test';
import { signupWithEmail } from './helpers/auth';

// This test verifies that a user can successfully sign up with email
test('User can sign up', async ({ page }) => {
  await signupWithEmail(page);
});