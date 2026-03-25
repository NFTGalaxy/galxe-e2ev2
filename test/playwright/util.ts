import type { BrowserContext, Page } from '@playwright/test'

import { MetaMask } from '../../src/playwright'
import basicSetup from './wallet-setup/basic.setup'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const payload = {
  'auth@twitter:1638008581491421184':
    '{"auth":{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJRCI6ImdhLXVzZXItIiwiR2FseGVJRCI6InRtZ1pOc2l1djRwbk5rNnJ4QzYyYmMiLCJleHAiOjE3NzUwMjUwMDQsImp0aSI6IjJjMWJjYmU4ZTE2YTQxZDEzZDRkZmI1N2E1ZWJjOTZmOGFkY2Y5ZjJmOTIxYzlkMDJkNWNkMWM4ZjFkNTBjNzEiLCJBZGRyZXNzIjoiMTYzODAwODU4MTQ5MTQyMTE4NCIsIkFkZHJlc3NUeXBlIjoxMCwiQWNjb3VudFVzZXJuYW1lIjoiS2FpTEk5NjQ5NTk2NzAzIn0.OuE14DnSsAYyODLY61Xpljm7nxgMN0ztWUyzgGbTF6E"},"expire":1775025004000}',
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
