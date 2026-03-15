import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import { buildQuestUrl, openQuest, QUEST_IDS } from '../utils/config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Detail Bootstrap (T1)', () => {
  test('T1-001 有效 quest 页面渲染 QuestInfo/CredList/ClaimSection', async ({
    page,
  }) => {
    await openQuest(page, QUEST_IDS.valid)

    await expect(
      page.locator('[data-testid^="cred-item-"]').first(),
    ).toBeVisible({
      timeout: 20_000,
    })

    await expect(
      page
        .getByRole('button', {
          name: /Log in|Claim|Claimed|Release|Participate/i,
        })
        .first(),
    ).toBeVisible({ timeout: 20_000 })
  })

  test('T1-002 无效 questId 返回 not found', async ({ page }) => {
    const invalidQuestId = 'INVALID_QUEST_ID_E2E'
    const response = await page.goto(buildQuestUrl(invalidQuestId), {
      waitUntil: 'domcontentloaded',
    })

    expect(response).not.toBeNull()
    expect(response?.status()).toBe(404)
  })

  test('T1-003 space inactive 显示 inactive 信息', async ({ page }) => {
    const questId = QUEST_IDS.inactive
    test.skip(!questId, '缺少 PW_QUEST_INACTIVE_ID，跳过该场景')
    if (!questId) return

    await openQuest(page, questId)
    await expect(
      page.getByText('This space has been set as in-active'),
    ).toBeVisible({
      timeout: 20_000,
    })
  })

  test('T1-004 parent campaign 走 collection 页面分支', async ({ page }) => {
    const questId = QUEST_IDS.parentCollection
    test.skip(!questId, '缺少 PW_QUEST_PARENT_COLLECTION_ID，跳过该场景')
    if (!questId) return

    await openQuest(page, questId)

    await expect(page.locator('[data-testid="verify-button"]')).toHaveCount(0)
    await expect(page.locator('[data-testid^="cred-item-"]')).toHaveCount(0)
  })
})
