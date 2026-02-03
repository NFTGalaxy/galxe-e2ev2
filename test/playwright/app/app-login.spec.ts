
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

test('app login', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin('https://app.galxe.com', context,page,extensionId)

  // 确认完到登录成功有延迟
  await testPage.locator('.e2e-avatar').click()
  await delay(3000)
  await testPage.screenshot({ path: 'test-results/user-home.png', fullPage: true });
})