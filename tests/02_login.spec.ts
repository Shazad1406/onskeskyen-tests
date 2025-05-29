// tests/02_login.spec.ts

import { test } from '@playwright/test';
import { signupWithEmail, loginWithEmail } from './helpers/auth';

// This test verifies that a user can log in using their email and password
test('User can log in with email and password', async ({ page }) => {
  const { email, password } = await signupWithEmail(page); // First, sign up a new user
  await loginWithEmail(page, email, password); // Then, attempt login with the same credentials
});