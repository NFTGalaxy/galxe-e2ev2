import { type BrowserContext, expect, type Page } from '@playwright/test'

import { handleLogin } from '../../../test/playwright/util'
import { closeLevelUpModal } from '../../../test/playwright/utils/verify'

export const APP_DOMAIN = process.env.DOMAIN
  ? 'https://app.beta.galxe.com'
  : 'https://app.galxe.com'

export const DASHBOARD_DOMAIN = process.env.DOMAIN
  ? 'https://dashboard.beta.galxe.com'
  : 'https://dashboard.galxe.com'

export const QUEST_SPACE_ALIAS =
  process.env.PW_QUEST_SPACE_ALIAS ?? 'Web3TestSpace'

export const QUEST_IDS = {
  valid: process.env.PW_QUEST_VALID_ID ?? 'GCHrEU4Gxq',
  inactive: process.env.PW_QUEST_INACTIVE_ID,
  parentCollection: process.env.PW_QUEST_PARENT_COLLECTION_ID,
  verifySuccess: process.env.PW_QUEST_VERIFY_SUCCESS_ID,
  verifyFailed: process.env.PW_QUEST_VERIFY_FAILED_ID,
  verifyMultiDimension: process.env.PW_QUEST_VERIFY_MULTI_DIMENSION_ID,
  claimRequiredInfo: process.env.PW_QUEST_CLAIM_REQUIRED_INFO_ID,
  claimAgreement: process.env.PW_QUEST_CLAIM_AGREEMENT_ID,
  claimLocked: process.env.PW_QUEST_CLAIM_LOCKED_ID,
  claimSuccess: process.env.PW_QUEST_CLAIM_SUCCESS_ID,
  claimMultiReward: process.env.PW_QUEST_CLAIM_MULTI_REWARD_ID,
  claimAddressBinding: process.env.PW_QUEST_CLAIM_BIND_ADDRESS_ID,
}

export const CREDENTIAL_TEST_IDS = {
  verifySuccess:
    process.env.PW_VERIFY_SUCCESS_CRED_TEST_ID ?? 'cred-item-VISIT_LINK',
  verifyFailed: process.env.PW_VERIFY_FAILED_CRED_TEST_ID,
  verifyMultiDimension: process.env.PW_VERIFY_MULTI_DIMENSION_CRED_TEST_ID,
}

export function buildQuestUrl(questId: string, spaceAlias = QUEST_SPACE_ALIAS) {
  return `${APP_DOMAIN}/quest/${spaceAlias}/${questId}`
}

export async function openQuest(page: Page, questId: string) {
  await page.goto(buildQuestUrl(questId), { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => undefined)
  await closeLevelUpModal(page)
}

export async function loginAndOpenQuest(
  context: BrowserContext,
  page: Page,
  extensionId: string,
  questId: string,
) {
  const testPage = await handleLogin(APP_DOMAIN, context, page, extensionId)
  await openQuest(testPage, questId)
  return testPage
}

export async function expectLoginModal(page: Page) {
  await expect(page.locator('.e2e-MetaMask').first()).toBeVisible({
    timeout: 20_000,
  })
}

export async function clickClaimPrimaryButton(page: Page) {
  const claimButton = page
    .getByRole('button', { name: /Log in|Claim|Claimed|Release|Participate/i })
    .first()
  await expect(claimButton).toBeVisible({ timeout: 15_000 })
  await claimButton.click()
}
