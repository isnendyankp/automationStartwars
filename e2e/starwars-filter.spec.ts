import { test, expect } from '@playwright/test';

test.describe('Star Wars Character Filter', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Star Wars page before each test
    await page.goto('/starwars');
    // Wait for the content to load
    await page.waitForSelector('h1');
  });

  test('filters characters correctly', async ({ page }) => {
    // Wait for the character list to load
    await page.waitForSelector('li');

    // Get the initial count of characters
    const initialCharacterCount = await page.locator('li').count();

    // Test filtering with a common name part
    await page.getByPlaceholder('Filter characters...').fill('sky');
    await page.waitForTimeout(500); // Small delay to allow for filtering

    const skywalkerCount = await page.locator('li').count();
    expect(skywalkerCount).toBeGreaterThan(0);
    expect(skywalkerCount).toBeLessThan(initialCharacterCount);

    // Test filtering with a specific full name
    await page.getByPlaceholder('Filter characters...').fill('Luke Skywalker');
    await page.waitForTimeout(500);

    const lukeCount = await page.locator('li').count();
    expect(lukeCount).toBe(1);
    await expect(page.locator('li').first()).toContainText('Luke Skywalker');

    // Test filtering with a name that should return few or no results
    await page.getByPlaceholder('Filter characters...').fill('Darth');
    await page.waitForTimeout(500);

    const darthCount = await page.locator('li').count();
    expect(darthCount).toBeLessThanOrEqual(2); // Assuming there might be at most 2 "Darth" characters
    if (darthCount > 0) {
      await expect(page.locator('li').first()).toContainText('Darth');
    }

    // Clear the filter and check if all characters are shown again
    await page.getByPlaceholder('Filter characters...').fill('');
    await page.waitForTimeout(500);

    const finalCharacterCount = await page.locator('li').count();
    expect(finalCharacterCount).toBe(initialCharacterCount);
  });

  test('filter is case-insensitive', async ({ page }) => {
    await page.waitForSelector('li');

    // Test with lowercase
    await page.getByPlaceholder('Filter characters...').fill('luke');
    await page.waitForTimeout(500);
    const lowercaseCount = await page.locator('li').count();

    // Test with uppercase
    await page.getByPlaceholder('Filter characters...').fill('LUKE');
    await page.waitForTimeout(500);
    const uppercaseCount = await page.locator('li').count();

    // Test with mixed case
    await page.getByPlaceholder('Filter characters...').fill('LuKe');
    await page.waitForTimeout(500);
    const mixedCaseCount = await page.locator('li').count();

    // All counts should be the same and greater than 0
    expect(lowercaseCount).toBeGreaterThan(0);
    expect(lowercaseCount).toBe(uppercaseCount);
    expect(lowercaseCount).toBe(mixedCaseCount);
  });
});