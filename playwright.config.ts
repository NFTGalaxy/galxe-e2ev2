import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

const TEST_TIMEOUT = 120 * 1000
const EXPECT_TIMEOUT = 120 * 1000
const GLOBAL_TIMEOUT_PER_TEST = 90 * 1000
const TEST_DIR = './test/playwright'
const TEST_IGNORE: string[] = [
  // 'test/playwright/apps/*',
  'test/playwright/dashboard/quest-create-*',
  // 'test/playwright/e2e/quest-e2e-custom-visit.spec.ts',
  // 'test/playwright/e2e/quest-e2e-custom-visit.spec.ts',
  // 'test/playwright/generate/quest-detail.*',
  // 'test/playwright/generate/quest-create.bootstrap.spec.ts',
  // 'test/playwright/generate/quest-create.info.spec.ts',
  // 'test/playwright/generate/quest-create.reward.spec.ts',
  // 'test/playwright/generate/quest-create.task-setting.spec.ts',
  // 'test/playwright/generate/quest-create.task-setting.credentials.spec.ts',
  // 'test/playwright/generate/quest-create.task-setting.advanced.spec.ts',
  // 'test/playwright/generate/quest-create.release.spec.ts',
  // 'test/playwright/login/*',
]

const TEST_FILE_PATTERN = /\.(spec|test)\.[cm]?[jt]sx?$/
const TEST_CALL_PATTERN = /\btest(?:\.(?:only|skip|fixme|fail|slow))?\s*\(/g

function globToRegExp(pattern: string) {
  const normalized = pattern
    .replace(/\\/g, '/')
    .replace(/([.+^${}()|[\]\\])/g, '\\$1')
  const regexBody = normalized
    .split('**')
    .join('__DOUBLE_STAR__')
    .split('*')
    .join('[^/]*')
    .split('__DOUBLE_STAR__')
    .join('.*')
    .split('?')
    .join('[^/]')

  return new RegExp(`^${regexBody}$`)
}

function getAllTestFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return []

  const allFiles: string[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      allFiles.push(...getAllTestFiles(fullPath))
      continue
    }

    if (entry.isFile() && TEST_FILE_PATTERN.test(entry.name)) {
      allFiles.push(fullPath)
    }
  }

  return allFiles
}

function getAutoTestCount() {
  const ignoreMatchers = TEST_IGNORE.map(globToRegExp)
  const testDirPath = path.resolve(currentDir, TEST_DIR)
  const files = getAllTestFiles(testDirPath)

  return files.reduce((count, filePath) => {
    const relativePath = path
      .relative(currentDir, filePath)
      .split(path.sep)
      .join('/')
    if (ignoreMatchers.some((matcher) => matcher.test(relativePath))) {
      return count
    }

    const source = fs.readFileSync(filePath, 'utf8')
    const testCaseCount = source.match(TEST_CALL_PATTERN)?.length ?? 0
    return count + testCaseCount
  }, 0)
}

const testCountFromEnv = Number.parseInt(process.env.PW_TEST_COUNT ?? '', 10)
const autoTestCount = getAutoTestCount()
const resolvedTestCount =
  Number.isFinite(testCountFromEnv) && testCountFromEnv > 0
    ? testCountFromEnv
    : Math.max(1, autoTestCount)
const resolvedGlobalTimeout = Math.max(
  TEST_TIMEOUT,
  resolvedTestCount * GLOBAL_TIMEOUT_PER_TEST,
)

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "test/e2e" directory, relative to this configuration file.
  testDir: TEST_DIR,

  // Run all tests in parallel.
  fullyParallel: true,

  testIgnore: TEST_IGNORE,

  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  globalTimeout: resolvedGlobalTimeout,

  // Use half of the number of logical CPU cores for running tests in parallel.
  workers: 4,

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
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Serve MetaMask Test Dapp locally before starting the tests.
  // webServer: {
  //   command: 'pnpm run serve:test-dapp',
  //   url: 'http://localhost:9999',
  //   reuseExistingServer: true,
  // },
})
