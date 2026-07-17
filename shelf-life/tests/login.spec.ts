import { expect, test } from '@playwright/test';
import path from 'node:path';

const authenticationFile = path.resolve('playwright/.authentication/user.json');

test('Login into the application in a slow way (Not recommended).', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Sign in' }).click();
	await page
		.getByRole('textbox', { name: 'Email Use the email address' })
		.fill('gabrielcmoris@gmail.com');
	await page.getByRole('textbox', { name: 'Password' }).fill('verysafePassword');
	await page.getByRole('button', { name: 'Sign in' }).click();

	await expect(page.getByText('gabrielcmoris@gmail.com')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
	await expect(page).toHaveURL('/shelf');
	await page.context().storageState({ path: authenticationFile }); // Save the AUTH credentials
});

// test('Login in a ');
