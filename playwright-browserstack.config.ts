import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */


export default defineConfig({
  //testMatch:["/e2e/placeOrder.test.ts"],
  testDir: './e2e',
  /* Maximum time one test can run for. */
  timeout: 90000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */

    baseURL:"https://bstackdemo.com",
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

  },
  reporter: 'html',


  /* Configure projects for major browsers */
  projects: [

    {
        name: 'chrome@latest:Windows 10@browserstack',
        use: {
          browserName: 'chromium',
          channel: 'chrome'
        },
    }
      /*,
      {
        name: 'chrome@latest-beta:OSX Big Sur@browserstack',
        use: {
          browserName: 'chromium',
          channel: 'chrome',
        },
      },
      {
        name: 'edge@90:Windows 10@browserstack',
        use: {
          browserName: 'chromium'
        },
      },
      {
        name: 'playwright-firefox@latest:OSX Catalina@browserstack',
        use: {
          browserName: 'firefox',
          ignoreHTTPSErrors: true
        },
      },
      {
        name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
        use: {
          browserName: 'webkit',
          // Config to use playwright emulated devices.
          // ...devices['iPhone 12 Pro Max'],
        },
      }
      */
    


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',cs
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
