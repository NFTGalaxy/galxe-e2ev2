import { type BrowserContext, expect, type Page } from '@playwright/test'

import { handleLogin } from '../../../test/playwright/util'

export const DASHBOARD_DOMAIN =
  process.env.PW_DASHBOARD_DOMAIN ?? 'https://dashboard.galxe.com'

export const SPACE_ID = process.env.PW_CREATE_SPACE_ID ?? '1659'

export const CREATE_CAMPAIGN_IDS = {
  draft: process.env.PW_CREATE_CAMPAIGN_DRAFT_ID || 'GCdN2tY2HH',
  active: process.env.PW_CREATE_CAMPAIGN_ACTIVE_ID || 'GCruFtYsgH',
  fastCreate: process.env.PW_CREATE_CAMPAIGN_FAST_CREATE_ID || 'GCiqFtYFTo',
}

export function buildCreateUrl(params?: Record<string, string | undefined>) {
  const search = new URLSearchParams({ space: SPACE_ID })
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) search.set(key, value)
  })
  return `${DASHBOARD_DOMAIN}/quest/create?${search.toString()}`
}

export async function loginAndOpenCreate(
  context: BrowserContext,
  page: Page,
  extensionId: string,
  params?: Record<string, string | undefined>,
) {
  const testPage = await handleLogin(
    DASHBOARD_DOMAIN,
    context,
    page,
    extensionId,
  )
  await testPage.goto(buildCreateUrl(params), { waitUntil: 'domcontentloaded' })
  await testPage.waitForLoadState('networkidle').catch(() => undefined)
  return testPage
}

export async function expectStep1(page: Page) {
  await expect(
    page.getByText('Quest Info', { exact: true }).nth(1),
  ).toBeVisible({
    timeout: 20_000,
  })
}

export async function expectStep2(page: Page) {
  await expect(page.getByText('Rewards', { exact: true }).nth(1)).toBeVisible({
    timeout: 20_000,
  })
}

export async function expectStep3(page: Page) {
  await expect(
    page.getByText('Task Settings', { exact: true }).nth(1),
  ).toBeVisible({
    timeout: 20_000,
  })
}

export async function gotoStep3ByHeader(page: Page) {
  const next = page.locator('.e2e-next-step-btn')
  await expect(next).toBeVisible({ timeout: 20_000 })
  await next.click()
  await next.click()
  await expectStep3(page)
}
