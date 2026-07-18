import { expect, test } from '@playwright/test';
import path from 'node:path';

const authenticationFile = path.resolve('playwright/.authentication/user.json');

/*
I can also run:
 npm run build && npm run preview -- --host 127.0.0.1 --port 4173
then, in a second terminal:
 npx playwright codegen --load-storage ./playwright/.authentication/user.json http://127.0.0.1:4173

And To save the cookie:
 npx playwright codegen --save-storage ./playwright/.authentication/user-dev.json http://localhost:5173

*/
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

// test('Login in with the user information', async ({ page }) => {

// });
