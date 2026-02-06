
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { delay, nextStep } from '../utils/actions';
import { createXFollowedByCredential } from '../utils/step3';
import { setStep1 } from '../utils/step1';

const test = testWithSynpress(metaMaskFixtures(basicSetup))


const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"
// const domain = "https://dashboard.galxe.com"

test('point reward with x followed by', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`);// test

  await delay(3000)

  await setStep1(testPage)

  await nextStep(testPage)
  await nextStep(testPage)

  await createXFollowedByCredential(testPage)
  await testPage.screenshot({ path: 'test-results/x-followed-by.png', fullPage: true });
})
