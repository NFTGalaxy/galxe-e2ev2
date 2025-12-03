// import synpress from '../synpress'

// const test = synpress

// const { expect } = test


// const delay = (ms:number) => new Promise(res => setTimeout(res, ms));



// test('quest creation', async ({ page, metamask }) => {
//   if(!process.env.PRIVATE_KEY) throw new Error('No private key found')
//   await page.goto('https://dashboard.stg.galxe.com');
//   // await page.locator('#personalSign').click()
//   await metamask.importWalletFromPrivateKey(process.env.PRIVATE_KEY)

//   await page.locator('.e2e-login-btn').click()
//   await page.locator('.e2e-MetaMask').click()
//   await metamask.connectToDapp()
//   // 弹窗之间有延迟
//   await delay(3000)
//   await metamask.confirmSignature()
//   // 确认完到登录成功有延迟
//   await delay(3000)
//   await page.screenshot({ path: 'screenshot5.png', fullPage: true });

//   // await page.locator('.e2e-avatar').click()
// })