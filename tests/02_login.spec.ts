import { test } from '@playwright/test';
import { loginWithEmail } from './helpers/auth';

test('User can log in with email and password', async ({ page }) => {
    await loginWithEmail(page); 

}); 