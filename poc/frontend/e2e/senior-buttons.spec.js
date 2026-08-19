import { expect, test } from '@playwright/test';

test('senior POC buttons and journey controls work', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('button', { name: 'Try as a Senior' })).toBeVisible();
  await page.getByRole('button', { name: 'Try as a Senior' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome, Margaret' })).toBeVisible();
  await page.getByRole('button', { name: 'Back to start' }).click();
  await expect(page.getByRole('button', { name: 'Try as a Senior' })).toBeVisible();
  await page.getByRole('button', { name: 'Try as a Senior' }).click();
  await page.locator('#poc-document-upload').setInputFiles({
    name: 'poc-gate-fixture.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4 approved POC fixture'),
  });
  await expect(page.getByText('Selected: poc-gate-fixture.pdf')).toBeVisible();
  await page.getByRole('button', { name: 'Process this document' }).click();
  await expect(page.getByText('Your document is ready.')).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('heading', { name: 'What this document is about' })).toBeVisible();

  for (const label of ['Original', 'Simple', 'Standard', 'Detailed']) {
    await page.getByRole('tab', { name: label }).click();
    await expect(page.getByText(`Selected view: ${label}`)).toBeVisible();
    await expect(page.getByRole('tab', { name: label })).toHaveAttribute('aria-selected', 'true');
  }

  const root = page.locator('body > #root > div');
  await page.getByRole('button', { name: 'Large' }).click();
  await expect(root).toHaveClass(/font-scale-large/);
  await page.getByRole('button', { name: 'Small' }).click();
  await expect(root).toHaveClass(/font-scale-small/);
  await page.getByRole('button', { name: 'High Contrast Off' }).click();
  await expect(root).toHaveClass(/high-contrast/);

  await page.getByRole('button', { name: 'Back to documents' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome, Margaret' })).toBeVisible();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Start Over' }).click();
  await expect(page.getByRole('button', { name: 'Try as a Senior' })).toBeVisible();
});
