import type { BrowserContext, Page } from '@playwright/test';
import { MetaMask } from '../../src/playwright';
import basicSetup from './wallet-setup/basic.setup';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const payload = {
  'auth@twitter:1638008581491421184':
    '{"auth":{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNTUxNDkzNDE2LjE3NzE5MDIxNjgiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjUwODM2OSwianRpIjoiNGFiYmVhMzg3YzM5ZjcyNDcyY2M2NjZiNDdlMjQ2NWJjZGI0YzQ0YWYyOTk1MGVkNGEwMzZjZWQ5YTI2NTAxNyIsIkFkZHJlc3MiOiIxNjM4MDA4NTgxNDkxNDIxMTg0IiwiQWRkcmVzc1R5cGUiOjEwLCJBY2NvdW50VXNlcm5hbWUiOiJLYWlMSTk2NDk1OTY3MDMifQ.5TpVj3Q83Vwcyk5w3whUy0wX8xFkma4HYfSC7RtUt24"},"expire":1772508369000}',
  userXPLevel: '4:tmgZNsiuv4pnNk6rxC62bc',
};

const auth = {
  authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNTUxNDkzNDE2LjE3NzE5MDIxNjgiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjUwODM2OSwianRpIjoiNGFiYmVhMzg3YzM5ZjcyNDcyY2M2NjZiNDdlMjQ2NWJjZGI0YzQ0YWYyOTk1MGVkNGEwMzZjZWQ5YTI2NTAxNyIsIkFkZHJlc3MiOiIxNjM4MDA4NTgxNDkxNDIxMTg0IiwiQWRkcmVzc1R5cGUiOjEwLCJBY2NvdW50VXNlcm5hbWUiOiJLYWlMSTk2NDk1OTY3MDMifQ.5TpVj3Q83Vwcyk5w3whUy0wX8xFkma4HYfSC7RtUt24',
};

const addObjectToLocalStorageWithInitScript = async (
  page: Page,
  data: Record<string, unknown>
) => {
  await page.addInitScript(payload => {
    Object.entries(payload).forEach(([key, value]) => {
      const storageValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, storageValue);
    });
  }, data);
};

const getCookies = () => {
  return [
    {
      name: 'galxe-id',
      value: 'tmgZNsiuv4pnNk6rxC62bc',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'auth-token',
      // Encode JSON cookie value to satisfy browser cookie character constraints.
      value: JSON.stringify(auth),
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },

    {
      name: 'account',
      value: 'TWITTER:1638008581491421184',
      // value: 'EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
  ];
};

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

export const handleMockLogin = async (
  url: string,
  context: BrowserContext,
  page: Page
) => {
  await context.addCookies(getCookies());
  await addObjectToLocalStorageWithInitScript(page, payload);
  await delay(1000);
  await page.goto(url); // test
  await delay(1000);
  console.log('Mock login success');
  return page;
};
