import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const appDomain =
  'https://galxe-web-git-feat-likaiagent-e2e-galxe.vercel.app'
export const dashboardDomain = 'https://dashboard.galxe.com'

// Release quest
export const release = async (page: Page) => {
  // 点击 Release 按钮
  const releaseButton = await page.getByRole('button', { name: 'Release' })

  expect(releaseButton).toBeVisible({ timeout: 5000 })

  await releaseButton.click()

  // 等待1秒，确保页面元素加载完成
  await delay(1000)

  // 点击 "Release Now" 按钮
  await page.getByRole('button', { name: 'Release Now' }).click()

  // 等待发布完成
  await delay(15000)

  await page.screenshot({
    path: 'test-results/quest-released.png',
    fullPage: true,
  })

  let url = await page.url()

  if (url.includes(dashboardDomain)) {
    await delay(5000)
    url = await page.url()
  }

  return url.replace('https://app.stg.galxe.com', appDomain)
}

export const nextStep = async (page: Page) => {
  await page.getByText('Next Step').click()
  await delay(1000)
}
