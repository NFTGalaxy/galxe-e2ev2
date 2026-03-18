import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

import { DASHBOARD_DOMAIN } from './config'

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

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

  // 避免有时候网速慢url没有刷新
  if (url.includes(DASHBOARD_DOMAIN)) {
    await delay(3000)
    url = await page.url()
  }

  return url
}

export const nextStep = async (page: Page) => {
  await page.getByText('Next Step').click()
  await delay(1000)
}
