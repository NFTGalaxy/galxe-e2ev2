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
  '@appkit/connection_status': 'disconnected',
  obs_data:
    'PAMRAxlHAloJRUoDVU4eV0oeVUsRS1pABBdBAgsRXSMDS0gfV1QDS0gfV1QDS0gfV1QCOlQREghfCBlXAhx+BgBgBBdBAloJV1QRChlaCT5SBAxcFQsRXSNuGlRIRRxSEx0RXVoBV0oFSkgBSkoDRVQRFBtcFR1ARUJoV1QDS0gfV1QDS0gfV1QDS0gfVyUfRQ1DCxdSAx1XKhlLNBtcFR0RXUgfRRVSDhZ1BhtHCApARUJoOgVu',
  'mm-sdk-anon-id': '04a174b2-c709-4a8c-9731-0a0f2f16fb2e',
  connectMethod: '"MetaMask"',
  'wagmi.store':
    '{"state":{"connections":{"__type":"Map","value":[]},"chainId":1,"current":null},"version":2}',
  '@appkit/active_caip_network_id': 'eip155:42161',
  'galxe-account-records':
    '[{"galxeId":"tmgZNsiuv4pnNk6rxC62bc","username":"likaibot","avatar":"https://appeco.galxe.com/galxe/user/avatar/score/980f5c4e-606b-4339-897d-4d0c5b332ee7.png","account":"EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70","connectMethod":"MetaMask","chainId":"56"}]',
  __not_first_visit__: '1',
  'auth@evm:0x93cb1a4a9bdea09162548243fd298f57cfc27f70':
    '{"auth":{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNjE4NzEzMTQwLjE3Njc3NzcwMjUiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjQxNDA3NywianRpIjoiNmVhZGZlZGQ5Mjg2YjhjMGM3ZTlkN2JkZDhlNzBmYTM0N2Y2ZWU2YjFmNDc5YzViYmE1OGJkYTllODkwOTE2ZiIsIkFkZHJlc3MiOiIweDkzQ2IxYTRBOUJkZWEwOTE2MjU0ODI0M2ZEMjk4RjU3Y0ZjMjdGNzAiLCJBZGRyZXNzVHlwZSI6MSwiQWNjb3VudFVzZXJuYW1lIjoiIn0.GsPbRFTz8ODBhsPJItwZpcLjTfLnnUIiBjIrz6yVzV4"},"expire":1772414077000}',
  '@appkit/active_namespace': 'eip155',
  isUserViewPagesList: '["EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70:/"]',
  'connect-domains': '["wss://nbstream.binance.info/wallet-connector"]',
  isWhitelist: 'true',
  userXPLevel: '4:tmgZNsiuv4pnNk6rxC62bc',
  aHR0cHM6Ly9hcHAuZ2FseGUuY29tL2dhbHhl: '41d697b6-e0b6-43af-81b5-56c7c7e05ace',
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
