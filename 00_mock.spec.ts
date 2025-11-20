import { testWithSynpress } from '@synthetixio/synpress'
import {  ethereumWalletMockFixtures } from '@synthetixio/synpress/playwright'

// Set up the test environment with Synpress and Ethereum wallet mock fixtures
const test = testWithSynpress(ethereumWalletMockFixtures)

const { expect } = test

const delay = (ms:number) => new Promise(res => setTimeout(res, ms));



test('should mock MetaMask in the Test Dapp', async ({ page, ethereumWalletMock }) => {
  // Verify that there is only one account in the wallet
  // expect(await ethereumWalletMock.getAllAccounts()).toHaveLength(1)

  //  const ethereumWalletMock = new EthereumWalletMock(page)
    // await ethereumWalletMock.importWallet('candy maple cake sugar pudding cream honey rich smooth crumble sweet treat')
    await ethereumWalletMock.importWalletFromPrivateKey('0x09a71425dc58b4ef068a264d93ca217204838bab2321e66c3da75580fed8f41b')
    // await ethereumWalletMock.addNewAccount()

  await page.goto('http://localhost:3000');

  await page.locator('.e2e-login-btn').click()
  await page.locator('.e2e-MetaMask').click()

  // await page.locator('.e2e-avatar').click()


  // await expect(page.locator('#accounts')).toHaveText(
  //   '0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70'
  // )

  // await page.goto('https://dashboard.galxe.com');

  // await expect(page).toHaveURL(/.*galxe.com\//)


  // await delay(20000)

  // // Click the connect button
  // await page.locator('#connectButton').click()

  // // Verify that the correct account address is displayed
  // await expect(page.locator('#accounts')).toHaveText('0xd73b04b0e696b0945283defa3eee453814758f1a')
})

// test('should add new account using MetaMask mock', async ({ page }) => {
//   // Create a new instance of EthereumWalletMock
//   const ethereumWalletMock = new EthereumWalletMock(page)

//   // Import a wallet using a mnemonic phrase
//   await ethereumWalletMock.importWallet('candy maple cake sugar pudding cream honey rich smooth crumble sweet treat')
//   // Add a new account to the wallet
//   await ethereumWalletMock.addNewAccount()

//   // Click the connect button on the page
//   await page.locator('#connectButton').click()

//   // Verify that both account addresses are displayed correctly
//   await expect(page.locator('#accounts')).toHaveText(
//     '0x28b9eafd6ea52e56ff4fe0a0223eddc4bc3d361e'
//   )
// })
