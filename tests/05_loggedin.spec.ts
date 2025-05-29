import { test } from './fixtures';
import { expect } from '@playwright/test';

// This test verifies that the user is successfully logged in
// by checking for the presence of the "Mine ønskelister" heading.
test('Test after login', async ({ loggedInPage }) => {
  const wishlistHeader = loggedInPage.getByText('Mine ønskelister');
  await expect(wishlistHeader).toBeVisible();
});