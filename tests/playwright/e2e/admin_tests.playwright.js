const { test, expect } = require('@playwright/test');

test.describe('Admin Creates a New Tour', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost/admin');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'adminPass');
    await page.click("button[type='submit']");
  });

  test('should allow admin to create a new tour', async ({ page }) => {
    await page.click('#addTourButton');
    await page.fill('#destination', 'Paris');
    await page.fill('#price', '1000');
    await page.fill('#slots', '10');
    await page.click('#submitTour');

    const successMessage = await page.textContent('.success-message');
    expect(successMessage).toContain('Tour created successfully');
  });

  test('should display all bookings', async ({ page }) => {
    await page.click('#bookingsTab');
    const bookingList = await page.$$('.booking-row');
    expect(bookingList.length).toBeGreaterThan(0);
  });

  test('should display all tickets', async ({ page }) => {
    await page.click('#ticketsTab');
    const ticketList = await page.$$('.ticket-row');
    expect(ticketList.length).toBeGreaterThan(0);
  });
});
