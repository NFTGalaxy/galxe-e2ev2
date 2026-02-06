import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';
import { handleLogin } from '../util';
import {
  accessVisitPageCredential,
  clickClaimPointsButton,
  closeLevelUpModal,
} from '../utils/verify';
import basicSetup from '../wallet-setup/basic.setup';

const test = testWithSynpress(metaMaskFixtures(basicSetup));
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const appDomain = 'https://galxe-web-git-feat-likaiagent-e2e-galxe.vercel.app';

// 原有的测试用例，使用固定URL
test('Set Visit - Fixed URL', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(appDomain, context, page, extensionId);
  await delay(3000);
  await testPage.screenshot({ path: 'test-results/login.png', fullPage: true });

  // 使用固定的quest URL进行测试
  await testPage.goto(`${appDomain}/quest/fico/GCHrEU4Gxq`); // test

  await delay(3000);
  await testPage.screenshot({
    path: 'test-results/login2.png',
    fullPage: true,
  });

  // 每次进入前都要关闭levelUp Modal
  await closeLevelUpModal(testPage);

  await delay(2000);
  await testPage.screenshot({
    path: 'test-results/login3.png',
    fullPage: true,
  });

  await accessVisitPageCredential(testPage);

  await delay(3000);
  await testPage.screenshot({
    path: 'test-results/quest-detail.png',
    fullPage: true,
  });

  await clickClaimPointsButton(page);

  await delay(3000);
  await testPage.screenshot({
    path: 'test-results/quest-claim.png',
    fullPage: true,
  });
});
