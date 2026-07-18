import { test } from '@playwright/test';

test.use({
	serviceWorkers: 'block',
	storageState: './playwright/.authentication/user.json'
});

test('Search', async ({ page }) => {
	await page.routeFromHAR('playwright/recordings/openlibrary.har', {
		url: '**/openlibrary.org/**'
		// update: true // If I want to update the HAR recording of http network reqs
	});
	await page.goto('/search');
	await page.getByRole('link', { name: 'Search' }).click();
	await page.getByRole('textbox', { name: 'Search by title, author, or' }).click();
	await page.getByRole('textbox', { name: 'Search by title, author, or' }).fill('Huxley');
	await page.getByRole('button', { name: 'Search' }).click();
});
