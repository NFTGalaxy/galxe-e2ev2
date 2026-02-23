import type { BrowserContext, Page } from '@playwright/test';
import { MetaMask } from '../../src/playwright';
import basicSetup from './wallet-setup/basic.setup';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const handleLogin = async (
  url: string,
  context: BrowserContext,
  page: Page,
  extensionId: string
) => {
  const metamask = new MetaMask(
    context,
    page,
    basicSetup.walletPassword,
    extensionId
  );

  await page.goto(url); // test

  await page.locator('.e2e-login-btn').first().click();
  await delay(3000);

  await page.locator('.e2e-MetaMask').click();
  console.log('click metamask btn success');
  await delay(3000);

  // const newPage = await metamask.connectToDapp();

  // connectToDapp 关闭 notification 弹窗后，将焦点切回 dapp 页面
  await page.bringToFront();
  await delay(1000);

  await page.screenshot({
    path: 'test-results/mm-login-sign222.png',
    fullPage: true,
  });

  // 弹窗之间有延迟
  await delay(3000);

  await metamask.confirmSignature();

  console.log(
    'pages',
    context.pages().map(page => page.url())
  );
  console.log('confirmSignature success');
  await delay(3000);

  return newPage;
};
