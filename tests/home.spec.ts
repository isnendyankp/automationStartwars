import { test, expect } from '@playwright/test';

test('home page has navbar with Test Page link', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Check if the navbar exists
  const navbar = await page.locator('nav');
  await expect(navbar).toBeVisible();

  // Check if the Test Page link exists and has correct text
  const testPageLink = await page.locator('nav a');
  await expect(testPageLink).toBeVisible();
  await expect(testPageLink).toHaveText('Test Page');

  // Check if the link has the correct href
  await expect(testPageLink).toHaveAttribute('href', '/test-page');

  // Check if the link has the correct classes
  await expect(testPageLink).toHaveClass(/text-white/);
  await expect(testPageLink).toHaveClass(/hover:underline/);
});