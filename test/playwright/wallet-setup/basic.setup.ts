import { defineWalletSetup } from '@synthetixio/synpress-cache'
import { MetaMask } from '../../../src/playwright'

export const SEED_PHRASE = 'test test test test test test test test test test test junk'

export const PASSWORD = 'Tester@1234'

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD)

  await metamask.importWallet(SEED_PHRASE)

  await metamask.importWalletFromPrivateKey('0x09a71425dc58b4ef068a264d93ca217204838bab2321e66c3da75580fed8f41b')
  console.log('importWalletFromPrivateKey success')
})
