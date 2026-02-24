const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';

import basicSetup from '../wallet-setup/basic.setup';
import { addObjectToLocalStorageWithInitScript, payload } from './login-mock';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

/**
 * Dumps auth-related browser state for the current page URL.
 * Helps verify whether cookie/localStorage based mock login is actually applied.
 */
const dumpPageAuthState = async (page: any) => {
  const currentUrl = page.url();
  // Read both full cookie jar and URL-scoped cookies to diagnose domain/path mismatch issues.
  // const allCookies = await page.context().cookies();
  const cookies = await page.context().cookies([currentUrl]);
  const localStorageData = await page.evaluate(() => {
    const data: Record<string, string | null> = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key) {
        data[key] = localStorage.getItem(key);
      }
    }
    return data;
  });

  console.log('current url:', currentUrl);
  console.log('cookies:', JSON.stringify(cookies, null, 2));
  console.log('localStorage:', JSON.stringify(localStorageData, null, 2));
};

const auth = {
  authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNTUxNDkzNDE2LjE3NzE5MDIxNjgiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjUwODM2OSwianRpIjoiNGFiYmVhMzg3YzM5ZjcyNDcyY2M2NjZiNDdlMjQ2NWJjZGI0YzQ0YWYyOTk1MGVkNGEwMzZjZWQ5YTI2NTAxNyIsIkFkZHJlc3MiOiIxNjM4MDA4NTgxNDkxNDIxMTg0IiwiQWRkcmVzc1R5cGUiOjEwLCJBY2NvdW50VXNlcm5hbWUiOiJLYWlMSTk2NDk1OTY3MDMifQ.5TpVj3Q83Vwcyk5w3whUy0wX8xFkma4HYfSC7RtUt24',
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
    // {
    //   name: 'connectMethod',
    //   value: 'MetaMask',
    //   domain: 'app.galxe.com', // The domain for which the cookie is valid
    //   path: '/', // The path for which the cookie is valid
    //   expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
    //   httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
    //   secure: false, // Optional: If true, the cookie is only sent over HTTPS
    //   sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    // },
    // {
    //   name: 'chainId',
    //   value: '1',
    //   domain: 'app.galxe.com', // The domain for which the cookie is valid
    //   path: '/', // The path for which the cookie is valid
    //   expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
    //   httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
    //   secure: false, // Optional: If true, the cookie is only sent over HTTPS
    //   sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    // },
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
    // {
    //   name: 'wagmi.store',
    //   value:
    //     '{"state":{"connections":{"__type":"Map","value":[["29986d0a573",{"accounts":["0x08314d54F0d43dA8cc6016bDA324a4dA3D0d770C"],"chainId":1,"connector":{"id":"app.phantom","name":"Phantom","type":"injected","uid":"29986d0a573"}}],["fc059255299",{"accounts":["0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70"],"chainId":56,"connector":{"id":"metaMaskSDK","name":"MetaMask","type":"metaMask","uid":"fc059255299"}}]]},"chainId":56,"current":"fc059255299"},"version":2}',
    //   domain: 'app.galxe.com', // The domain for which the cookie is valid
    //   path: '/', // The path for which the cookie is valid
    //   expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
    //   httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
    //   secure: false, // Optional: If true, the cookie is only sent over HTTPS
    //   sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    // },
  ];
};

test('check browser version', async ({ context, page, extensionId }) => {
  // Define the cookies to be set

  // Add the cookies to the browser context
  await context.addCookies(getCookies());
  // await mockLoginState(page, context);
  await addObjectToLocalStorageWithInitScript(page, payload);
  await delay(2000);
  // Now, navigate to a page within the domain where the cookies are set
  // const page = await context.newPage();
  await page.goto('https://app.galxe.com'); // test

  await dumpPageAuthState(page);

  await delay(7000);

  // await page.getByPlaceholder('Enter Username').fill('likaibotacounttwitter');

  // await page.getByRole('button', { name: 'Sign up' }).click();
  // await delay(3000);

  await page.screenshot({
    path: 'test-results/screenshot5.png',
    fullPage: true,
  });
});
