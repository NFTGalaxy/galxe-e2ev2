const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';

import basicSetup from '../wallet-setup/basic.setup';
import { addObjectToLocalStorageWithInitScript, payload } from './login-mock';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

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
      name: 'chainId',
      value: '56',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'auth-token',
      value:
        '{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNjE4NzEzMTQwLjE3Njc3NzcwMjUiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjQxNDA3NywianRpIjoiNmVhZGZlZGQ5Mjg2YjhjMGM3ZTlkN2JkZDhlNzBmYTM0N2Y2ZWU2YjFmNDc5YzViYmE1OGJkYTllODkwOTE2ZiIsIkFkZHJlc3MiOiIweDkzQ2IxYTRBOUJkZWEwOTE2MjU0ODI0M2ZEMjk4RjU3Y0ZjMjdGNzAiLCJBZGRyZXNzVHlwZSI6MSwiQWNjb3VudFVzZXJuYW1lIjoiIn0.GsPbRFTz8ODBhsPJItwZpcLjTfLnnUIiBjIrz6yVzV4"}',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'connectMethod',
      value: 'MetaMask',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'account',
      value: 'EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'wagmi.store',
      value:
        '{"state":{"connections":{"__type":"Map","value":[["f480d5c8f75",{"accounts":["0x21b1247C0E7822a9a142718962015fAf2fF79c6f"],"chainId":56,"connector":{"id":"metaMaskSDK","name":"MetaMask","type":"metaMask","uid":"f480d5c8f75"}}],["50e3a37087b",{"accounts":["0x08314d54F0d43dA8cc6016bDA324a4dA3D0d770C"],"chainId":1,"connector":{"id":"app.phantom","name":"Phantom","type":"injected","uid":"50e3a37087b"}}]]},"chainId":56,"current":"f480d5c8f75"},"version":2}',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
  ];
  // return [
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1806372418.550089,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: '_ga',
  //     path: '/',
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: 'GA1.1.618713140.1767777025',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1795129372,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: 'intercom-id-x55eon90',
  //     path: '/',
  //     sameSite: 'Lax',
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: 'a43da55e-02b8-47e3-90e6-30ac04b036ba',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1795129372,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: 'intercom-device-id-x55eon90',
  //     path: '/',
  //     sameSite: 'Lax',
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: '51a3372e-2ba2-4259-9399-83f1c0610777',
  //   },
  //   {
  //     domain: '.app.galxe.com',
  //     expirationDate: 1802414294.11545,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: '_ga_F9J18S6WJV',
  //     path: '/',
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: 'deleted',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1772404172,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: 'intercom-session-x55eon90',
  //     path: '/',
  //     sameSite: 'Lax' as any,
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: '',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1805420009.348305,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: '_ga_6V7FNY6Y0J',
  //     path: '/',
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: 'GS2.1.s1770860009$o3$g0$t1770860009$j60$l0$h0',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1772423398,
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'galxe-id',
  //     path: '/',
  //     secure: true,
  //     session: false,
  //     storeId: '0',
  //     value: 'tmgZNsiuv4pnNk6rxC62bc',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'wagmi.recentConnectorId',
  //     path: '/',
  //     sameSite: 'Lax' as any,
  //     secure: false,
  //     session: true,
  //     storeId: '0',
  //     value: '"metaMaskSDK"',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'wagmi.store',
  //     path: '/',
  //     sameSite: 'Lax' as any,
  //     secure: false,
  //     session: true,
  //     storeId: '0',
  //     value:
  //       '{"state":{"connections":{"__type":"Map","value":[["4da381a266a",{"accounts":["0x08314d54F0d43dA8cc6016bDA324a4dA3D0d770C"],"chainId":1,"connector":{"id":"app.phantom","name":"Phantom","type":"injected","uid":"4da381a266a"}}],["db68b7bc4da",{"accounts":["0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70"],"chainId":56,"connector":{"id":"metaMaskSDK","name":"MetaMask","type":"metaMask","uid":"db68b7bc4da"}}]]},"chainId":56,"current":"db68b7bc4da"},"version":2}',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1772423398,
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'connectMethod',
  //     path: '/',
  //     secure: true,
  //     session: false,
  //     storeId: '0',
  //     value: 'MetaMask',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1772423398,
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'chainId',
  //     path: '/',
  //     secure: true,
  //     session: false,
  //     storeId: '0',
  //     value: '56',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1772414076,
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'auth-token',
  //     path: '/',
  //     secure: true,
  //     session: false,
  //     storeId: '0',
  //     value:
  //       '{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItNjE4NzEzMTQwLjE3Njc3NzcwMjUiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3MjQxNDA3NywianRpIjoiNmVhZGZlZGQ5Mjg2YjhjMGM3ZTlkN2JkZDhlNzBmYTM0N2Y2ZWU2YjFmNDc5YzViYmE1OGJkYTllODkwOTE2ZiIsIkFkZHJlc3MiOiIweDkzQ2IxYTRBOUJkZWEwOTE2MjU0ODI0M2ZEMjk4RjU3Y0ZjMjdGNzAiLCJBZGRyZXNzVHlwZSI6MSwiQWNjb3VudFVzZXJuYW1lIjoiIn0.GsPbRFTz8ODBhsPJItwZpcLjTfLnnUIiBjIrz6yVzV4"}',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1772423398,
  //     hostOnly: true,
  //     httpOnly: false,
  //     name: 'account',
  //     path: '/',
  //     secure: true,
  //     session: false,
  //     storeId: '0',
  //     value: 'EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70',
  //   },
  //   {
  //     domain: 'app.galxe.com',
  //     expirationDate: 1806378598.473959,
  //     hostOnly: false,
  //     httpOnly: false,
  //     name: '_ga_F9J18S6WJV',
  //     path: '/',
  //     secure: false,
  //     session: false,
  //     storeId: '0',
  //     value: 'GS2.1.s1771818463$o175$g1$t1771818598$j16$l0$h0',
  //   },
  // ];
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

  await delay(3000);

  await page.screenshot({
    path: 'test-results/screenshot5.png',
    fullPage: true,
  });
});
