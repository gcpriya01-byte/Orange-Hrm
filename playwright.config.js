import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  retries: 0,
  workers: 1,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    browserName: 'chromium',
    headless: false,
    screenshot:'on',
    video:'on',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome']
  }
 
});