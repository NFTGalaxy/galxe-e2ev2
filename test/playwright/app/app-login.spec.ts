import synpress from '../synpress'

const test = synpress

const { expect } = test


const delay = (ms:number) => new Promise(res => setTimeout(res, ms));



test('app login', async ({ page, metamask }) => {
  await page.goto('https://app.stg.galxe.com');
  // await page.locator('#personalSign').click()
  await metamask.importWalletFromPrivateKey('0x09a71425dc58b4ef068a264d93ca217204838bab2321e66c3da75580fed8f41b')

  await page.locator('.e2e-login-btn').click()
  await page.locator('.e2e-MetaMask').click()
  await metamask.connectToDapp()
  // 弹窗之间有延迟
  await delay(3000)
  await metamask.confirmSignature()
  // 确认完到登录成功有延迟
  // await page.locator('.e2e-avatar').click()
})