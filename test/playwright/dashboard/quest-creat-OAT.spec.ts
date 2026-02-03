
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { delay, nextStep } from '../utils/actions';
import { setRewardTypeOatUseTemplateBnbChainMintingCap12 } from '../utils/step2';
import { setStep1 } from '../utils/step1';

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"
// const domain = "https://dashboard.galxe.com"

test('Oat Reward', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`);// test

  await delay(3000)
  await setStep1(testPage)
  await testPage.screenshot({ path: 'test-results/dashboard-space.png', fullPage: true });

  console.log('-------------------------------- step 3 --------------------------------')

  await nextStep(testPage)

  await setRewardTypeOatUseTemplateBnbChainMintingCap12(testPage)

  await testPage.screenshot({ path: 'test-results/oat-settings.png', fullPage: true });

})


