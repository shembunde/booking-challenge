const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

let browser;
let page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

// Shared steps
Given('I navigate to the login page', async () => {
  await page.goto('/login');
});

When('I enter {string} as email and {string} as password', async (email, password) => {
  await page.fill('#email', email);
  await page.fill('#password', password);
});

When('I click the login button', async () => {
  await page.click('button[type="submit"]');
});

Then('I should see an error message {string}', async (message) => {
  const errorText = await page.textContent('.error-message');
  expect(errorText).toContain(message);
});

// Booking management steps
Given('the following tours exist:', async (dataTable) => {
  // Implementation for test data setup would typically use API calls
});

When('I visit the home page', async () => {
  await page.goto('/');
});

When('I select the {string} tour', async (tourName) => {
  await page.click(`text=${tourName}`);
});

When('I book as guest with:', async (dataTable) => {
  const { name, email } = dataTable.hashes()[0];
  await page.fill('#guest-name', name);
  await page.fill('#guest-email', email);
  await page.click('#confirm-booking');
});

Then('I should see booking confirmation', async () => {
  await expect(page.locator('.booking-confirmation')).toBeVisible();
});

Given('I am logged in as admin', async () => {
  await page.goto('/admin/login');
  await page.fill('#email', process.env.ADMIN_EMAIL);
  await page.fill('#password', process.env.ADMIN_PASSWORD);
  await page.click('button[type="submit"]');
});

When('I create a new tour with:', async (dataTable) => {
  const tourData = dataTable.hashes()[0];
  await page.goto('/admin/tours/create');
  
  await page.fill('#name', tourData.name);
  await page.fill('#price', tourData.price);
  await page.fill('#slots', tourData.slots);
  await page.fill('#description', tourData.description);
  await page.selectOption('#destination', { label: tourData.destination });
  
  await page.click('#save-tour');
});

Then('I should see {string} in tours list', async (tourName) => {
  await expect(page.locator('.tour-list')).toContainText(tourName);
});

When('I view all bookings', async () => {
  await page.goto('/admin/bookings');
});

Then('I should see at least {int} booking', async (count) => {
  const bookings = await page.locator('.booking-item').count();
  expect(bookings).toBeGreaterThanOrEqual(count);
});

When('I view all tickets', async () => {
  await page.goto('/admin/tickets');
});

Then('I should see at least {int} ticket', async (count) => {
  const tickets = await page.locator('.ticket-item').count();
  expect(tickets).toBeGreaterThanOrEqual(count);
});