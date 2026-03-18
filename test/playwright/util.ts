import type { BrowserContext, Page } from '@playwright/test'

import { MetaMask } from '../../src/playwright'
import basicSetup from './wallet-setup/basic.setup'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const payload = {
  'auth@twitter:1638008581491421184':
    '{"auth":{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItMzU2OTc2Njk5LjE3NzM4MTEyMjkiLCJHYWx4ZUlEIjoidG1nWk5zaXV2NHBuTms2cnhDNjJiYyIsImV4cCI6MTc3NDQxNjA3MSwianRpIjoiZmNmM2EzNWU0NTYwNDgwZmNkMTQ4M2VhNDVjNmJjZjliYmZmMWM0M2Q3OGU5YWU0MmI3NDhjZGMwZWI1YWIxOSIsIkFkZHJlc3MiOiIxNjM4MDA4NTgxNDkxNDIxMTg0IiwiQWRkcmVzc1R5cGUiOjEwLCJBY2NvdW50VXNlcm5hbWUiOiJLYWlMSTk2NDk1OTY3MDMifQ.6owUFEENYuHqtHhZ8lSL8HQ9c4ZRJpd2_tAaju2RRYQ"},"expire":1774416071000}',
  userXPLevel: '4:tmgZNsiuv4pnNk6rxC62bc',
}

const auth = JSON.parse(payload['auth@twitter:1638008581491421184']).auth

const addObjectToLocalStorageWithInitScript = async (
  page: Page,
  data: Record<string, unknown>,
) => {
  await page.addInitScript((payload) => {
    Object.entries(payload).forEach(([key, value]) => {
      const storageValue =
        typeof value === 'string' ? value : JSON.stringify(value)
      window.localStorage.setItem(key, storageValue)
    })
  }, data)
}

const getCookies = () => {
  return [
    {
      name: 'galxe-id',
      value: 'tmgZNsiuv4pnNk6rxC62bc',
      domain: `app.galxe.com`, // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as const, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'galxe-id',
      value: 'tmgZNsiuv4pnNk6rxC62bc',
      domain: `dashboard.galxe.com`, // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as const, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'auth-token',
      // Encode JSON cookie value to satisfy browser cookie character constraints.
      value: JSON.stringify(auth),
      domain: `app.galxe.com`, // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as const, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'auth-token',
      // Encode JSON cookie value to satisfy browser cookie character constraints.
      value: JSON.stringify(auth),
      domain: `dashboard.galxe.com`, // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as const, // Optional: 'Strict', 'Lax', or 'None'
    },

    {
      name: 'account',
      value: 'TWITTER:1638008581491421184',
      // value: 'EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70',
      domain: `app.galxe.com`, // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as const, // Optional: 'Strict', 'Lax', or 'None'
    },
    {
      name: 'account',
      value: 'TWITTER:1638008581491421184',
      // value: 'EVM:0x93Cb1a4A9Bdea09162548243fD298F57cFc27F70',
      domain: `dashboard.galxe.com`, // The domain for which the cookie is valid
      path: '/', // The path for which the cookie is valid
      expires: -1, // Optional: Expiration date in seconds since epoch. -1 for session cookie.
      httpOnly: false, // Optional: If true, the cookie is not accessible via JavaScript
      secure: false, // Optional: If true, the cookie is only sent over HTTPS
      sameSite: 'Lax' as const, // Optional: 'Strict', 'Lax', or 'None'
    },
  ]
}

export const handleLogin = async (
  url: string,
  context: BrowserContext,
  page: Page,
  extensionId: string,
) => {
  if (process.env.login === 'mock') {
    return await handleMockLogin(url, context, page)
  }

  const metamask = new MetaMask(
    context,
    page,
    basicSetup.walletPassword,
    extensionId,
  )

  await page.goto(url) // test

  await page.locator('.e2e-login-btn').first().click()
  await delay(3000)

  await page.locator('.e2e-MetaMask').click()
  await delay(3000)

  await metamask.connectToDapp()
  // console.log('Connected')

  // 弹窗之间有延迟
  await delay(3000)

  await metamask.confirmSignature()

  // console.log(
  //   'pages',
  //   context.pages().map((page) => page.url()),
  // )
  // console.log('confirmSignature success')
  await delay(3000)

  return page
}

export const handleMockLogin = async (
  url: string,
  context: BrowserContext,
  page: Page,
) => {
  await context.addCookies(getCookies())
  await addObjectToLocalStorageWithInitScript(page, payload)
  await delay(1000)
  await page.goto(url) // test
  await delay(1000)

  // await expect(page.locator('.e2e-avatar')).toBeVisible({
  //   timeout: 20_000,
  // })
  return page
}
