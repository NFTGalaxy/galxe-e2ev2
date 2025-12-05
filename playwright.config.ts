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
    // baseURL: 'https://app.stg.galxe.com',
    // // 录制测试视频（失败时保留，成功时删除以节省空间）
    // video: 'on', // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
    // // 在失败时自动截图
    // screenshot: 'on', // 'on' | 'off' | 'only-on-failure'
    // // 录制 trace 文件（可用于回放测试过程）
    // trace: 'on' // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
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
