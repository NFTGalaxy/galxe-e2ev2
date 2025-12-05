import { defineWalletSetup } from '@synthetixio/synpress-cache'
import { MetaMask, getExtensionId } from '../../../src/playwright'

const SEED_PHRASE = 'test test test test test test test test test test test junk'

const PASSWORD = 'Tester@1234'

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, 'MetaMask')

  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId)

  await metamask.importWallet(SEED_PHRASE)

  await metamask.openSettings()

  const SidebarMenus = metamask.homePage.selectors.settings.SettingsSidebarMenus
  await metamask.openSidebarMenu(SidebarMenus.Advanced)

  await metamask.toggleDismissSecretRecoveryPhraseReminder()


  await metamask.importWalletFromPrivateKey('0xbf54083c4ac85ea4720d19a0b9d1b3cc3230e77b9693424a653fb81d96c86932')

  console.log('importWalletFromPrivateKey success')

  walletPage.screenshot({ 
    path: 'test-results/wallet-page.png',
    fullPage: true 
  })

  // const page = await context.newPage()

  // await page.goto('http://localhost:9999')

  // await page.locator('#connectButton').click()

  // await metamask.connectToDapp()

  // await page.close()
})
