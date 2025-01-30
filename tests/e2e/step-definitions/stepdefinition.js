// e2e/step-definitions/steps.js
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

let browser;
let page;

// Setup browser before scenarios
Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

// Teardown after scenarios
After(async () => {
  await browser.close();
});

// Challenge 1: Invalid Login test case 
Given('I navigate to the login page', async () => {
  await page.goto('/login');
});

When('I enter {string} as username and {string} as password', 
  async (username, password) => {
    await page.fill('#username', username);
    await page.fill('#password', password);
});

When('I click the login button', async () => {
  await page.click('button[type="submit"]');
});

Then('I should see an error message {string}', async (message) => {
  const errorText = await page.textContent('.error-message');
  expect(errorText).toContain(message);
});

// Challenge 2: Booking test cases
Given('I am on the homepage', async () => {
  await page.goto('/');
});

When('I select a tour and book it as a guest', async () => {
  await page.click('.tour-card:first-child');
  await page.click('#book-as-guest');
});

Then('a success booking is shown', async () => {
  await expect(page.locator('.confirmation')).toBeVisible();
});

Given('I login as admin with correct logins', async () => {
  await page.goto('/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');
  await page.click('button[type="submit"]');
});

When('I add new tour with {string}, {int} slots, {string}, {string}', 
  async (name, slots, price, description) => {
    await page.goto('/admin/tours/create');
    await page.fill('#name', name);
    await page.fill('#slots', slots.toString());
    await page.fill('#price', price);
    await page.fill('#description', description);
    await page.click('#submit-tour');
});

Then('the tour {string} appears in the tours list', async (tourName) => {
  await expect(page.locator('.tour-list')).toContainText(tourName);
});

When('I navigate to the bookings page', async () => {
  await page.click('#nav-bookings');
});

Then('I see a list of all bookings', async () => {
  await expect(page.locator('.bookings-table')).toBeVisible();
});

When('I navigate to the tickets page', async () => {
  await page.click('#nav-tickets');
});

Then('I see all generated tickets', async () => {
  await expect(page.locator('.tickets-list')).toBeVisible();
});