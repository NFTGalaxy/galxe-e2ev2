
import { testWithSynpress } from '@synthetixio/synpress-core'
import { MetaMask, metaMaskFixtures } from '../../../src/playwright'

import basicSetup from '../wallet-setup/basic.setup'

const test = testWithSynpress(metaMaskFixtures(basicSetup))


const delay = (ms:number) => new Promise(res => setTimeout(res, ms));


test('app login', async ({ context, page, extensionId }) => {
  const metamask = new MetaMask(context, page, basicSetup.walletPassword, extensionId)

  await page.goto('https://app.galxe.com');// test

  await page.locator('.e2e-login-btn').click()
  await delay(3000)

  await page.locator('.e2e-MetaMask').click()
  console.log('click metamask btn success')
  await delay(3000)

  await metamask.connectToDapp()

  // 弹窗之间有延迟
  await delay(3000)
  await metamask.confirmSignature()
  console.log('confirmSignature success')
  await delay(3000)

  // 确认完到登录成功有延迟
  await page.locator('.e2e-avatar').click()
  await delay(3000)
  await page.screenshot({ path: 'test-results/user-home.png', fullPage: true });
})