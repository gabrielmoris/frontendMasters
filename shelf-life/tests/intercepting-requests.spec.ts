import { test, expect } from '@playwright/test';

test('Intercept search', async ({ page }) => {
	await page.route('**/openlibrary.org/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				docs: [
					{
						key: '/works/OL12345W',
						title: 'Ensayo sobre la ceguera',
						author_name: ['José Saramego'],
						first_publish_year: 1995
					}
				]
			})
		});
	});

	await page.goto('/search');
	await page.getByRole('textbox', { name: 'Search by title, author, or' }).click();
	await page
		.getByRole('textbox', { name: 'Search by title, author, or' })
		.fill('Wrong Author in purpose');
	await page.getByRole('button', { name: 'Search' }).click();

	await expect(
		page.getByRole('heading', { name: 'Ensayoss sobre la ceguera', exact: true })
	).toBeVisible();
});
