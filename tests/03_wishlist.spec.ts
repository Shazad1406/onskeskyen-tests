import { test, expect } from '@playwright/test';
import { signupWithEmail, loginWithEmail, createWishlist } from './helpers/auth';

// This test verifies that a user can create a wishlist after signing up and logging in
test('User can create a wishlist', async ({ page }) => {
  const { email, password } = await signupWithEmail(page); // Sign up a new user
  await loginWithEmail(page, email, password); // Log in with the same user credentials
  await createWishlist(page, '1. liste'); // Create a wishlist named "1. liste"

  // Assert that the newly created wishlist is visible on the page
  await expect(page.getByText('1. liste')).toBeVisible();
});