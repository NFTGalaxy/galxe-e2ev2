import synpress from '../synpress'

const test = synpress

const { expect } = test


const delay = (ms:number) => new Promise(res => setTimeout(res, ms));



test('app login', async ({ page, metamask }) => {
  await page.goto('https://app.stg.galxe.com');// test
  // await page.locator('#personalSign').click()
  await metamask.importWalletFromPrivateKey('0xbf54083c4ac85ea4720d19a0b9d1b3cc3230e77b9693424a653fb81d96c86932')

  console.log('importWalletFromPrivateKey success')

  // 或者截图到 test-results 目录（会自动上传）
  await page.screenshot({ 
    path: 'test-results/import.png',
    fullPage: true 
  });

  await page.locator('.e2e-login-btn').click()
  await delay(1000)
  console.log('click login btn success')
  await page.locator('.e2e-MetaMask').click()
  console.log('click metamask btn success')

  // 或者截图到 test-results 目录（会自动上传）
  await page.screenshot({ 
    path: 'test-results/click.png',
    fullPage: true 
  });
  await metamask.connectToDapp()
  console.log('connectToDapp success')
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