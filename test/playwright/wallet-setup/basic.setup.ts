import { defineWalletSetup } from '@synthetixio/synpress-cache'
import { MetaMask } from '../../../src/playwright'

export const SEED_PHRASE = 'test test test test test test test test test test test junk'

export const PASSWORD = 'Tester@1234'

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD)

  await metamask.importWallet(SEED_PHRASE)

  await metamask.importWalletFromPrivateKey('0xbf54083c4ac85ea4720d19a0b9d1b3cc3230e77b9693424a653fb81d96c86932')

  console.log('importWalletFromPrivateKey success2222 ss')

  walletPage.screenshot({ 
    path: 'test-results/wallet-page222.png',
    fullPage: true 
  })
})
