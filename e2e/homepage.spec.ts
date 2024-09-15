import { test, expect } from '@playwright/test';

test('homepage has correct title and content', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Create Next App');
});
