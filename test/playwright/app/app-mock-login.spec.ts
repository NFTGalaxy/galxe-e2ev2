const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

import { test as Test2, chromium } from "@playwright/test";


import { testWithSynpress } from '@synthetixio/synpress-core'
import { MetaMask, metaMaskFixtures } from '../../../src/playwright'

import basicSetup from '../wallet-setup/basic.setup'

const test = testWithSynpress(metaMaskFixtures(basicSetup))


test("check browser version", async ({ context, page, extensionId }) => {

  // const browser = await chromium.launch();
  // const context = await browser.newContext();

    // Define the cookies to be set
  const cookies = [
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
      value: '{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItOTM4ODU0MDIzLjE3NjUwMjk4ODIiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc2NTcxODI4MCwianRpIjoiYjk3MDYyY2JhNzg2OTkyYzE4MDAxZjY4NDk5NGU3MzI1NjNjNWNiMWU3ZDExZmY5YzllNjQ2ZGY2ZTcxNGQyZSIsIkFkZHJlc3MiOiIweDkzQ2IxYTRBOUJkZWEwOTE2MjU0ODI0M2ZEMjk4RjU3Y0ZjMjdGNzAiLCJBZGRyZXNzVHlwZSI6MSwiQWNjb3VudFVzZXJuYW1lIjoiIn0.fUVUZwkZOZaqGewTzHKqGB0QeofiL5wE1bXtpLY6Rdo"}',
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
      value: '{"state":{"connections":{"__type":"Map","value":[["47eff801640",{"accounts":["0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70"],"chainId":56,"connector":{"id":"metaMaskSDK","name":"MetaMask","type":"metaMask","uid":"47eff801640"}}]]},"chainId":56,"current":"47eff801640"},"version":2}',
      domain: 'app.galxe.com', // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as any, // Optional: 'Strict', 'Lax', or 'None'
    },
  ];

  // Add the cookies to the browser context
  await context.addCookies(cookies);

    // Now, navigate to a page within the domain where the cookies are set
  // const page = await context.newPage();
  await page.goto('https://app.galxe.com');// test

  await delay(3000)
  await page.screenshot({ 
  path: 'test-results/mock-login.png',
  fullPage: true 
});
});