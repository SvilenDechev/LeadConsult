import type { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 300 * 1000,
  expect: {
    timeout: 10 * 1000,
    toMatchSnapshot: { maxDiffPixelRatio: 0.3 },
  },
  //testIgnore: '../path/to/test/whichWantToIgnore.ts',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only */
  retries: process.env['CI'] ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 1 : undefined,
  /* TestOptions https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    headless: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    deviceScaleFactor: 1,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: { width: 1280, height: 1024 },
        ignoreHTTPSErrors: true,
        launchOptions: {
         ignoreDefaultArgs: ['--headless'],
          args: [
            process.env['CI'] ? '--headless=new' : '--headed',
          ],
        },
      },
    },
  ],
  reporter: process.env['CI']
    ? [['junit', { outputFolder: 'e2e-reports', outputFile: 'results.xml' }]]
    : [
      ['list'],
      ['html', { open: 'never', outputFolder: 'e2e-reports' }],
      ['allure-playwright']
    ],
};

export default config;
