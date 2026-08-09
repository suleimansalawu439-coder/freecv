import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('redirects to auth modal if trying to access protected route', async ({ page }) => {
    // Go to the dashboard, which should require auth
    await page.goto('/dashboard');
    
    // Expect the URL to either redirect or show an auth modal
    // Adjust selector based on actual implementation
    const loginHeading = page.locator('h2:has-text("Sign In"), h1:has-text("Sign In")');
    await expect(loginHeading).toBeVisible({ timeout: 5000 });
  });
});
