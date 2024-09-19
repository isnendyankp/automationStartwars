import { test, expect } from '@playwright/test';

test('navigation to Star Wars page works and filtering functions correctly', async ({ page }) => {
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
  let characterList = page.locator('li');
  await expect(characterList.first()).toBeVisible();

  // Test the filter functionality
  const filterInput = page.getByPlaceholder('Filter characters...');
  await filterInput.fill('Luke');

  // Wait for the filtered results
  await page.waitForTimeout(500); // Small delay to allow for filtering

  // Check that the filtered results only include 'Luke'
  characterList = page.locator('li');
  await expect(characterList).toHaveCount(1);
  await expect(characterList.first()).toContainText('Luke');
});