import synpress from '../synpress'

const test = synpress

const { expect } = test


const delay = (ms:number) => new Promise(res => setTimeout(res, ms));



test('app login', async ({ page, metamask }) => {
  await page.goto('https://app.stg.galxe.com');// test
  // await page.locator('#personalSign').click()
  await metamask.importWalletFromPrivateKey('0xbf54083c4ac85ea4720d19a0b9d1b3cc3230e77b9693424a653fb81d96c86932')

  await page.locator('.e2e-login-btn').click()
  await page.locator('.e2e-MetaMask').click()
  await metamask.connectToDapp()
  // 弹窗之间有延迟
  await delay(3000)
  await metamask.confirmSignature()
  // 确认完到登录成功有延迟
  // await page.locator('.e2e-avatar').click()

    // 确认完到登录成功有延迟
  await delay(3000)
  await page.screenshot({ path: 'screenshot5.png', fullPage: true });

})