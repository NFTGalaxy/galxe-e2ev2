import type { Page } from '@playwright/test';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


// Release quest
export const release = async (page: Page) => {
  // 点击 Release 按钮
  await page.getByRole('button', { name: 'Release' }).click()

  // 等待1秒，确保页面元素加载完成
  await delay(1000)

  // 查找 "Ignore and Release" 按钮
  const ignoreAndReleaseButton = page.getByRole('button', { name: 'Ignore and Release' })

  // 使用 count() 方法判断按钮是否存在（更可靠的方式）
  // count() 返回匹配的元素数量，如果为 0 则表示不存在
  const buttonCount = await ignoreAndReleaseButton.count()

  // 如果 "Ignore and Release" 按钮存在（count > 0），先点击它
  if (buttonCount > 0) {
    console.log('找到 "Ignore and Release" 按钮，正在点击...')
    await ignoreAndReleaseButton.click()
    await delay(2000) // 等待按钮点击后的响应
  } else {
    console.log('未找到 "Ignore and Release" 按钮，直接点击 "Release Now"')
  }

  // 点击 "Release Now" 按钮
  await page.getByRole('button', { name: 'Release Now' }).click()

  // 等待发布完成
  await delay(10000)
}

export const nextStep = async (page: Page) => {
  await page.getByText('Next Step').click()
  await delay(1000)
}






