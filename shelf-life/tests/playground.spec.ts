import { expect, test } from '@playwright/test';

test('"Remove" in the third list item', async ({ page }) => {
	await page.goto('/playground');

	const readingList = page.getByRole('list', { name: 'Reading List' });
	const thirdItem = readingList.getByRole('listitem').nth(2);
	await expect(thirdItem.getByRole('button', { name: 'Remove' })).toBeVisible();
});
