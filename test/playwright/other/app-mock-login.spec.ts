const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

import { test as Test2, chromium } from "@playwright/test";


import { testWithSynpress } from '@synthetixio/synpress-core'
import { MetaMask, metaMaskFixtures } from '../../../src/playwright'

import basicSetup from '../wallet-setup/basic.setup'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const getCookies = () => {
  return [
    {
      name: 'galxe-id',
      value: '2AFvyjb7DJXeAquZtqbzj3',
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
      value: '{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItMTEzMjkyNDcyMS4xNzY3Njg3MjcyIiwiR2FseGVJRCI6IjJBRnZ5amI3REpYZUFxdVp0cWJ6ajMiLCJleHAiOjE3NjgzODE2OTIsImp0aSI6IjA0YjE2NTVjOWExODI2YjI0N2UwN2NhYjIwNzYzMDRhNDU2Yzg5ZTg3ZmVkODk2NDNkN2Q0MTg3NDRmZGVlNjMiLCJBZGRyZXNzIjoiMHgyMWIxMjQ3QzBFNzgyMmE5YTE0MjcxODk2MjAxNWZBZjJmRjc5YzZmIiwiQWRkcmVzc1R5cGUiOjEsIkFjY291bnRVc2VybmFtZSI6IiJ9.2kVphLD27fMEkO4l_41K11fwIVw4k5qRq16NxywXLis"}',
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
      value: 'EVM:0x21b1247C0E7822a9a142718962015fAf2fF79c6f',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'wagmi.store',
      value: '{"state":{"connections":{"__type":"Map","value":[["f480d5c8f75",{"accounts":["0x21b1247C0E7822a9a142718962015fAf2fF79c6f"],"chainId":56,"connector":{"id":"metaMaskSDK","name":"MetaMask","type":"metaMask","uid":"f480d5c8f75"}}],["50e3a37087b",{"accounts":["0x08314d54F0d43dA8cc6016bDA324a4dA3D0d770C"],"chainId":1,"connector":{"id":"app.phantom","name":"Phantom","type":"injected","uid":"50e3a37087b"}}]]},"chainId":56,"current":"f480d5c8f75"},"version":2}',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
  ];

}


test("check browser version", async ({ context, page, extensionId }) => {
  // Define the cookies to be set

  // Add the cookies to the browser context
  await context.addCookies(getCookies());

  // Now, navigate to a page within the domain where the cookies are set
  // const page = await context.newPage();
  await page.goto('https://app.galxe.com');// test

  await delay(3000)

  await page.screenshot({ path: 'test-results/screenshot5.png', fullPage: true });

});