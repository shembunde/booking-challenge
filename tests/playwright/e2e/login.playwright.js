const { test, expect } = require('@playwright/test');

test.describe('User Login', () => {
  test('should show error for invalid login', async ({ page }) => {
    await page.goto('http://localhost/login');

    await page.fill('#email', 'invalidUser@example.com');
    await page.fill('#password', 'wrongPass');
    await page.click("button[type='submit']");

    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('Invalid credentials');
  });
});
