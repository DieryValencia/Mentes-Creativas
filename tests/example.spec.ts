import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mentes Creativas/);
});

test('has welcome message', async ({ page }) => {
  await page.goto('/');

  // Check if the welcome message is visible.
  await expect(page.getByText('Bienvenido a React 🚀')).toBeVisible();
});