import { expect, test } from '@playwright/test';

test('template app renders and accepts input', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { name: 'SvelteKit Template' })).toBeVisible();
	const nameInput = page.getByLabel('Name');
	await nameInput.fill('MPX smoke');
	await expect(nameInput).toHaveValue('MPX smoke');
});
