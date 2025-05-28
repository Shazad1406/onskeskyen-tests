import { test, expect } from '@playwright/test';
import { loginWithEmail, createWishlist } from './helpers/auth';

test('User can create a wishlist', async ({ page }) => {
  await loginWithEmail(page);
  await createWishlist(page, '1. liste');

  

 

  await page.waitForTimeout(5000);
});