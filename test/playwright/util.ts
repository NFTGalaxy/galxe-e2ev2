import type { BrowserContext, Page } from '@playwright/test';
// import { cloneDeep } from 'lodash';
import { MetaMask } from '../../src/playwright';
import basicSetup from './wallet-setup/basic.setup';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const handleLogin = async (
  url: string,
  context: BrowserContext,
  page: Page,
  extensionId: string
) => {
  // const initPage = cloneDeep(page);
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

  await metamask.connectToDapp();

  // 弹窗之间有延迟
  await delay(3000);

  await metamask.confirmSignature();

  console.log(
    'pages',
    context.pages().map(page => page.url())
  );
  console.log('confirmSignature success');
  await delay(3000);

  return page;
};
