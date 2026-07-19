import { test, expect } from '@playwright/test';

test('Search', async ({ page }) => {
	await page.routeFromHAR('./playwright/recordings/openlibrary.har', {
		url: '**/openlibrary.org/**'
		// update: true // If I want to update the HAR recording of http network reqs
	});
	await page.goto('/search');
	await page.getByRole('textbox', { name: 'Search by title, author, or' }).click();
	await page.getByRole('textbox', { name: 'Search by title, author, or' }).fill('Huxley');
	await page.getByRole('button', { name: 'Search' }).click();

	await expect(page.getByRole('heading', { name: 'Brave New World', exact: true })).toBeVisible();
});
