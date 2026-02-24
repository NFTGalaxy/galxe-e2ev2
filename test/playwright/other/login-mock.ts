import type { BrowserContext, Page } from '@playwright/test';

export async function mockLoginState(
  page: Page,
  context: BrowserContext,
  options?: {
    baseURL?: string;
    account?: string;
    chainId?: string;
    connectMethod?: string;
    userId?: string;
  }
) {
  const baseURL = options?.baseURL ?? 'https://app.galxe.com';
  const account =
    options?.account ?? 'EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70';
  const chainId = options?.chainId ?? '56';
  const connectMethod = options?.connectMethod ?? 'MetaMask';
  const userId = options?.userId ?? 'e2e-user';
  const host = new URL(baseURL).hostname;
  const nowSec = Math.floor(Date.now() / 1000);
  const expSec = nowSec + 7 * 24 * 60 * 60;

  const base64url = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');

  const auth = {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNjE4NzEzMTQwLjE3Njc3NzcwMjUiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjQxNDA3NywianRpIjoiNmVhZGZlZGQ5Mjg2YjhjMGM3ZTlkN2JkZDhlNzBmYTM0N2Y2ZWU2YjFmNDc5YzViYmE1OGJkYTllODkwOTE2ZiIsIkFkZHJlc3MiOiIweDkzQ2IxYTRBOUJkZWEwOTE2MjU0ODI0M2ZEMjk4RjU3Y0ZjMjdGNzAiLCJBZGRyZXNzVHlwZSI6MSwiQWNjb3VudFVzZXJuYW1lIjoiIn0.GsPbRFTz8ODBhsPJItwZpcLjTfLnnUIiBjIrz6yVzV4',
  };

  await context.addCookies([
    {
      name: 'auth-token',
      value: JSON.stringify(auth),
      domain: host,
      path: '/',
    },
    {
      name: 'galxe-id',
      value: 'tmgZNsiuv4pnNk6rxC62bc',
      domain: host,
      path: '/',
    },
    { name: 'account', value: account, domain: host, path: '/' },
    { name: 'connectMethod', value: connectMethod, domain: host, path: '/' },
    { name: 'chainId', value: chainId, domain: host, path: '/' },
  ]);

  const authKey = `auth@${account.toLowerCase()}`;
  const authValue = JSON.stringify({
    auth,
    expire: expSec * 1000,
  });

  await page.addInitScript(
    ({ key, value }) => window.localStorage.setItem(key, value),
    { key: authKey, value: authValue }
  );

  if (page.url().startsWith(baseURL)) {
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, value),
      { key: authKey, value: authValue }
    );
  }
}

export const payload = {
  'auth@twitter:1638008581491421184':
    '{"auth":{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNTUxNDkzNDE2LjE3NzE5MDIxNjgiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjUwODM2OSwianRpIjoiNGFiYmVhMzg3YzM5ZjcyNDcyY2M2NjZiNDdlMjQ2NWJjZGI0YzQ0YWYyOTk1MGVkNGEwMzZjZWQ5YTI2NTAxNyIsIkFkZHJlc3MiOiIxNjM4MDA4NTgxNDkxNDIxMTg0IiwiQWRkcmVzc1R5cGUiOjEwLCJBY2NvdW50VXNlcm5hbWUiOiJLYWlMSTk2NDk1OTY3MDMifQ.5TpVj3Q83Vwcyk5w3whUy0wX8xFkma4HYfSC7RtUt24"},"expire":1772508369000}',
  userXPLevel: '4:tmgZNsiuv4pnNk6rxC62bc',
};

export async function addObjectToLocalStorageWithInitScript(
  page: Page,
  data: Record<string, unknown>
) {
  await page.addInitScript(payload => {
    Object.entries(payload).forEach(([key, value]) => {
      const storageValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, storageValue);
    });
  }, data);
}
