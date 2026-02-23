import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';
import { handleLogin } from '../util';
import basicSetup from '../wallet-setup/basic.setup';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

test('app login', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(
    'https://app.galxe.com',
    context,
    page,
    extensionId
  );

  // CI may recreate/close the original tab during wallet-connect callbacks.
  // Always re-resolve the current Galxe page from the context before interacting.
  let activeGalxePage = context.pages().find(
    contextPage =>
      !contextPage.isClosed() && contextPage.url().includes('app.galxe.com')
  );

  // In CI the original page can be fully closed after extension popups finish.
  // Re-open the dapp page in the same context so session/cookies are preserved.
  if (!activeGalxePage || activeGalxePage.isClosed()) {
    activeGalxePage = !testPage.isClosed() ? testPage : await context.newPage();
    if (activeGalxePage.url() === 'about:blank' || activeGalxePage.isClosed()) {
      activeGalxePage = await context.newPage();
    }
    await activeGalxePage.goto('https://app.galxe.com', {
      waitUntil: 'domcontentloaded',
    });
  }

  await activeGalxePage
    .locator('.e2e-avatar')
    .first()
    .waitFor({ state: 'visible', timeout: 20_000 });

  // console.log(
  //   'pages111',
  //   context.pages().map(page => page.url())
  // );

  // const newPage = await context.newPage();
  // await newPage.goto('https://app.galxe.com');

  // await page.screenshot({
  //   path: 'test-results/mm-login.png',
  //   fullPage: true,
  // });

  // 确认完到登录成功有延迟
  await activeGalxePage.locator('.e2e-avatar').first().click();
  await delay(3000);
  // await testPage.screenshot({
  //   path: 'test-results/user-home.png',
  //   fullPage: true,
  // });
});
