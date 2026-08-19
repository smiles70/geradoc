import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  reporter: 'line',
  projects: [{ name: 'firefox', use: { browserName: 'firefox', headless: true } }],
});
