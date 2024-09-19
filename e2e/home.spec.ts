import { test, expect } from '@playwright/test';

test('home page has navbar with Test Page link', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:3000/');

  // Check if the navbar exists
  const navbar = await page.locator('nav');
  await expect(navbar).toBeVisible();

  // Check if the Test Page link exists and has correct text
  const testPageLink = await page.locator('nav a:has-text("Test Page")');
  await expect(testPageLink).toBeVisible();
  await expect(testPageLink).toHaveText('Test Page');

  // Check if the link has the correct href
  await expect(testPageLink).toHaveAttribute('href', '/test-page');

  // Check if the link has the correct classes
  await expect(testPageLink).toHaveClass(/text-white/);
  await expect(testPageLink).toHaveClass(/hover:underline/);

  // Click the link and check if it navigates to the Test Page
  await testPageLink.click();
  await expect(page).toHaveURL('http://localhost:3000/test-page');

  // Check if the Test Page content is visible
  const testPageHeading = await page.locator('h1');
  await expect(testPageHeading).toBeVisible();
  await expect(testPageHeading).toHaveText('Test Page');
});