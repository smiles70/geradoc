import { expect, test } from '@playwright/test';

async function startSenior(page) {
  await page.goto('http://localhost:5173');
  const seniorButton = page.getByRole('button', { name: 'Try as a Senior' });
  if (!(await seniorButton.count())) {
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  }
  await seniorButton.click();
  await expect(page.getByRole('heading', { name: 'Welcome, Margaret' })).toBeVisible();
}

async function acceptStartOver(page) {
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Start Over' }).click();
}

test('all landing, persona, sample, action, navigation, and reset buttons work', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: 'Try as a Caregiver' }).click();
  await expect(page.getByRole('heading', { name: /helping Margaret/ })).toBeVisible();
  await page.getByRole('button', { name: 'Back to start' }).click();
  await expect(page.getByRole('button', { name: 'Try as a Senior' })).toBeVisible();

  await startSenior(page);
  const samples = page.locator('button').filter({ hasText: /Medicare|Bank Statement|Property Tax/ });
  const count = await samples.count();
  expect(count).toBeGreaterThanOrEqual(3);
  for (let index = 0; index < count; index += 1) {
    await startSenior(page);
    await samples.nth(index).click();
    await page.getByRole('button', { name: 'View your document now' }).click();
    await expect(page.getByRole('heading', { name: /Medicare|Bank Statement|Property Tax/ })).toBeVisible({ timeout: 10000 });
    const done = page.getByRole('button', { name: 'Done' }).first();
    if (await done.count()) {
      await done.click();
      await expect(page.getByText('Completed! Great job.')).toBeVisible();
    }
    await page.getByRole('button', { name: 'Back to documents' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome, Margaret' })).toBeVisible();
  }

  await acceptStartOver(page);
  await expect(page.getByRole('button', { name: 'Try as a Senior' })).toBeVisible();
});

test('all uploaded-document controls work end to end', async ({ page }) => {
  await startSenior(page);
  await page.locator('#poc-document-upload').setInputFiles({
    name: 'site-buttons-fixture.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4 approved POC fixture'),
  });
  await page.getByRole('button', { name: 'Process this document' }).click();
  await expect(page.getByText('Your document is ready.')).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('heading', { name: 'What this document is about' })).toBeVisible();

  for (const label of ['Original', 'Simple', 'Standard', 'Detailed']) {
    const tab = page.getByRole('tab', { name: label });
    await tab.click();
    await expect(page.getByText(`Selected view: ${label}`)).toBeVisible();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  for (const label of ['Small', 'Medium', 'Large']) {
    await page.getByRole('button', { name: label, exact: true }).click();
  }
  await page.getByRole('button', { name: 'High Contrast Off' }).click();
  await page.getByRole('button', { name: 'High Contrast On' }).click();

  await page.getByRole('button', { name: 'Back to documents' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome, Margaret' })).toBeVisible();
  await acceptStartOver(page);
  await expect(page.getByRole('button', { name: 'Try as a Senior' })).toBeVisible();
});
