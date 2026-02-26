const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';

import { handleMockLogin } from '../util';
import basicSetup from '../wallet-setup/basic.setup';
const test = testWithSynpress(metaMaskFixtures(basicSetup));

test('check browser version', async ({ context, page, extensionId }) => {
  await handleMockLogin('https://app.galxe.com', context, page);

  await page.screenshot({
    path: 'test-results/screenshot5.png',
    fullPage: true,
  });
});
