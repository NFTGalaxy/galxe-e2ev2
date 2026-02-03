
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { nextStep, release } from '../utils/actions';
import { setStep1 } from '../utils/step1';
import { selectVerifyBeforeTasks } from '../utils/step3';
import { setMultiCredential } from '../utils/step3';
const test = testWithSynpress(metaMaskFixtures(basicSetup))
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));



const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"
// const domain = "https://dashboard.galxe.com"

test('Set multi dimension and release', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`);// test

  await delay(3000)

  setStep1(testPage)
  await delay(3000)
  await testPage.screenshot({ path: 'test-results/dashboard-space.png', fullPage: true });


  await nextStep(testPage)

  await nextStep(testPage)

  await selectVerifyBeforeTasks(testPage)

  await setMultiCredential(testPage)

  await delay(2000)

  await page.screenshot({ path: 'test-results/final-save4.png', fullPage: true });

  await page.getByTestId('pointCount').fill('10')

  await release(testPage)
  await testPage.screenshot({ path: 'test-results/quest.png', fullPage: true });


})

