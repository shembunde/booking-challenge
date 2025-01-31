const { test, expect } = require('@playwright/test');

test.describe('Book a Tour as client', () => {
  test('should allow client to book a tour', async ({ page }) => {
    await page.goto('http://localhost/booking');

    await page.click('.tour-card:first-child .book-button');
    await page.fill('#guestName', 'John Doe');
    await page.fill('#guestEmail', 'shemobura@gmail.com');
    await page.click('#confirmBooking');

    const confirmation = await page.textContent('.booking-confirmation');
    expect(confirmation).toContain('Booking successful');
  });
});