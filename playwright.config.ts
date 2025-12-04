import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "test/e2e" directory, relative to this configuration file.
  testDir: './test/playwright',

  // Run all tests in parallel.
  fullyParallel: true,


  timeout:  6000 * 1000,
  expect: {
    timeout: 30 * 1000
  },  
  globalTimeout: 6000 * 1000,

  // Use half of the number of logical CPU cores for running tests in parallel.
  workers: undefined,

  use: {
    // We are using locally deployed MetaMask Test Dapp.
    baseURL: 'https://app.stg.galxe.com',
    // 在测试失败时自动截图和录制视频
    screenshot: 'only-on-failure', // 'on' | 'off' | 'only-on-failure'
    video: 'retain-on-failure',    // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
    trace: 'retain-on-failure'      // 保留失败时的 trace 文件，方便调试
  },

  // Synpress currently only supports Chromium, however, this will change in the future.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  // Serve MetaMask Test Dapp locally before starting the tests.
  webServer: {
    command: 'pnpm run serve:test-dapp',
    url: 'http://localhost:9999',
    reuseExistingServer: true
  }
})
