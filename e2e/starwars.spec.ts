import { test, expect } from '@playwright/test';

test('navigation to Star Wars page works', async ({ page }) => {
  // Start from the homepage
  await page.goto('/');

  // Find the Star Wars link and click it
  const starWarsLink = page.getByRole('link', { name: 'Star Wars' });
  await starWarsLink.click();

  // Check that we've navigated to the Star Wars page
  await expect(page).toHaveURL('/starwars');

  // Wait for the content to load
  await page.waitForSelector('h1');

  // Verify that the Star Wars page content is visible
  const heading = page.getByRole('heading', { name: 'Star Wars Characters' });
  await expect(heading).toBeVisible();

  // Wait for the character list to load
  await page.waitForSelector('li');

  // Check that at least one character is displayed
  const characterList = page.locator('li');
  await expect(characterList.first()).toBeVisible();
});