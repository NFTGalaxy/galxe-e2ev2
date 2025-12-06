import { testWithSynpress } from '@synthetixio/synpress-core'
import { Phantom, phantomFixtures } from '../../../src/playwright'

import basicSetup from '../wallet-setup/basic.setup'

const test = testWithSynpress(phantomFixtures(basicSetup))

const { expect } = test

const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

test('should connect multiple wallets to dapp', async ({ context, page, phantomPage, extensionId }) => {

  const phantom = new Phantom(context, phantomPage, basicSetup.walletPassword, extensionId)

  await phantom.addNewAccount('NewAccount1')
  await phantom.addNewAccount('NewAccount2')

  await page.goto('https://app.galxe.com');// test
  // Delay to avoid random fail


  await page.locator('.e2e-login-btn').click()
  await delay(3000)
  console.log('click login btn success')
    // 或者截图到 test-results 目录（会自动上传）
  await page.screenshot({ 
    path: 'test-results/login-module.png',
    fullPage: true 
  });
  await page.locator('.e2e-PhantomEVM').click()
  console.log('click PhantomEVM btn success')
  await delay(5000)

  await phantom.connectToDapp()

 await delay(5000)
    await page.screenshot({ 
    path: 'test-results/click222.png',
    fullPage: true 
  });
})
