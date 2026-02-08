import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://localhost:8088';

test.describe('Account management', () => {
  test('Load home page and dashboard leads to log in', async ({ context, page }) => {
    await context.clearCookies();

    await page.goto('http://localhost:8088/');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tanstart Cumberland' })).toBeVisible();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome back to Acme Inc.' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('Log in with invalid credentials', async ({ context, page }) => {
    await context.clearCookies();

    await page.goto(baseUrl);
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome back to Acme Inc.' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
    await expect(page.getByText("Don't have an account? Sign up")).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('unknownUser@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('somerandompassworddoes jdsffkjds');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page.getByRole('listitem')).toBeVisible();
  });

  test('Create user Persona Ichi', async ({ context, page }) => {
    await context.clearCookies();

    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome back to Acme Inc.' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Persona Ichi');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('persona.ichi@gmail.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('persona.ichi@gmail.com');
    await page.getByRole('textbox', { name: 'Confirm Password' }).click();
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('persona.ichi@gmail.com');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByRole('button', { name: '?? No organization' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cumberland' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Eddy' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'PI Persona Ichi persona.ichi@' })).toBeVisible();
    await expect(page.getByText('Dashboard index pageroutes/(')).toBeVisible();
  });
});
