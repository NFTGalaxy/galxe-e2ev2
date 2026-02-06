import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';
import { handleLogin } from '../util';
import {
  closeLevelUpModal,
  isCredentialCompleted,
  verifyTwitterFollowerCredentialAndFollow,
} from '../utils/verify';
import basicSetup from '../wallet-setup/basic.setup';
const test = testWithSynpress(metaMaskFixtures(basicSetup));
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const domain = 'https://galxe-web-git-feat-likaiagent-e2e-galxe.vercel.app';

test('Set verify twitter cred', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(domain, context, page, extensionId);
  await delay(3000);
  await testPage.screenshot({ path: 'test-results/login.png', fullPage: true });
  await testPage.goto(`${domain}/quest/fico/GCHCEU4C7u`); // test

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

  const isCompleted = await isCredentialCompleted(
    testPage,
    'cred-item-TWITTER_FOLLOW'
  );
  if (isCompleted) {
    console.log(' Twitter follow credential is completed, returning directly');
    return;
  }

  await verifyTwitterFollowerCredentialAndFollow(testPage);

  await delay(3000);
  await testPage.screenshot({
    path: 'test-results/quest-detail.png',
    fullPage: true,
  });
});
