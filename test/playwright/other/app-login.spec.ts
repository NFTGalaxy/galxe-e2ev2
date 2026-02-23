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

  console.log(
    'current pages url',
    context.pages().map(page => page.url())
  );

  // Never create a brand-new page here: some login state is tab-flow dependent in CI.
  // Instead, keep polling existing context pages and reuse the live Galxe tab only.
  let activeGalxePage = !testPage.isClosed() ? testPage : undefined;
  for (let attempt = 0; attempt < 60; attempt++) {
    const candidate = context
      .pages()
      .find(
        contextPage =>
          !contextPage.isClosed() && contextPage.url().includes('app.galxe.com')
      );
    if (candidate) {
      activeGalxePage = candidate;
      break;
    }
    await delay(500);
  }

  if (!activeGalxePage || activeGalxePage.isClosed()) {
    const pageUrls = context.pages().map(contextPage => contextPage.url());
    throw new Error(
      `No active Galxe page after login flow: ${pageUrls.join(', ')}`
    );
  }

  await activeGalxePage.bringToFront();
  await activeGalxePage.waitForLoadState('domcontentloaded');

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
