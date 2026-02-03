
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import { expect } from "@playwright/test";
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { delay, nextStep } from '../utils/actions';
import { setStep1 } from '../utils/step1';
import { setRewardTypeNftUploadMediaNameContractCap12 } from '../utils/step2';

const test = testWithSynpress(metaMaskFixtures(basicSetup))



const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"
// const domain = "https://dashboard.galxe.com"

test('NFT reward', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`);// test

  await delay(3000)

  setStep1(testPage)
  await delay(3000)

  await nextStep(testPage)

  await setRewardTypeNftUploadMediaNameContractCap12(testPage)

  await testPage.screenshot({ path: 'test-results/NFT-settings.png', fullPage: true });

})
