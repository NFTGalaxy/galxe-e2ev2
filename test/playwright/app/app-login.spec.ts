import synpress from '../synpress'

const test = synpress

const { expect } = test


const delay = (ms:number) => new Promise(res => setTimeout(res, ms));



test('app login', async ({ page, metamask }) => {
  await page.goto('https://app.stg.galxe.com');// test
  // await page.locator('#personalSign').click()

  // 或者截图到 test-results 目录（会自动上传）
  await page.screenshot({ 
    path: 'test-results/import.png',
    fullPage: true 
  });

  await page.locator('.e2e-login-btn').click()
  await delay(3000)
  console.log('click login btn success')
    // 或者截图到 test-results 目录（会自动上传）
  await page.screenshot({ 
    path: 'test-results/login-module.png',
    fullPage: true 
  });
  await page.locator('.e2e-MetaMask').click()
  console.log('click metamask btn success')
  await delay(5000)
  await page.locator('.e2e-MetaMask').click()
  // 或者截图到 test-results 目录（会自动上传）
  await page.screenshot({ 
    path: 'test-results/click.png',
    fullPage: true 
  });
  await metamask.connectToDapp()
  console.log('connectToDapp success1')
  // 弹窗之间有延迟
  await delay(3000)
  await metamask.confirmSignature()
  console.log('confirmSignature success')
  await delay(3000)

  // 确认完到登录成功有延迟
  await page.locator('.e2e-avatar').click()
    // 确认完到登录成功有延迟
  // await page.screenshot({ path: 'screenshot5.png', fullPage: true });
})