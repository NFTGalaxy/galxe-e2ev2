import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  CREDENTIAL_TEST_IDS,
  expectLoginModal,
  loginAndOpenQuest,
  openQuest,
  QUEST_IDS,
} from '../utils/config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Verify (T2/T3)', () => {
  test('VC-002 未登录点击 credential 触发登录弹窗', async ({ page }) => {
    await openQuest(page, QUEST_IDS.valid)

    const firstCred = page.locator('[data-testid^="cred-item-"]').first()
    await expect(firstCred).toBeVisible({ timeout: 20_000 })
    await firstCred.click()

    await expectLoginModal(page)
  })

  test('VC-003 已登录 verify 成功后更新 eligible/claim 状态', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.verifySuccess
    test.skip(!questId, '缺少 PW_QUEST_VERIFY_SUCCESS_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )
    const cred = testPage.locator(
      `[data-testid="${CREDENTIAL_TEST_IDS.verifySuccess}"]`,
    )

    await expect(cred).toBeVisible({ timeout: 20_000 })

    const alreadyCompleted = await cred
      .locator('.bg-success')
      .isVisible({ timeout: 3_000 })
      .catch(() => false)
    test.skip(alreadyCompleted, '当前账号已完成该 credential，跳过成功验证场景')

    await cred.locator('[data-testid="verify-button"]').click()

    await expect(cred.locator('.bg-success')).toBeVisible({ timeout: 45_000 })

    await expect(
      testPage
        .getByRole('button', { name: /Claim|Claimed|Participate|Release/i })
        .first(),
    ).toBeVisible({ timeout: 20_000 })
  })

  test('VC-004 verify 失败进入倒计时并支持重试', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.verifyFailed
    const credTestId = CREDENTIAL_TEST_IDS.verifyFailed
    test.skip(
      !questId || !credTestId,
      '缺少 PW_QUEST_VERIFY_FAILED_ID 或 PW_VERIFY_FAILED_CRED_TEST_ID，跳过该场景',
    )
    if (!questId || !credTestId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )
    const cred = testPage.locator(`[data-testid="${credTestId}"]`)

    await expect(cred).toBeVisible({ timeout: 20_000 })
    await cred.locator('[data-testid="verify-button"]').click()

    await expect(testPage.getByText('Verification failed.')).toBeVisible({
      timeout: 20_000,
    })

    const countdown = cred.locator('[data-testid="verify-button"] p')
    await expect(countdown).toBeVisible({ timeout: 20_000 })
    await expect(countdown).toBeHidden({ timeout: 60_000 })

    await cred.locator('[data-testid="verify-button"]').click()
  })

  test('VC-005 multi-dimension credential 验证分支', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.verifyMultiDimension
    const credTestId = CREDENTIAL_TEST_IDS.verifyMultiDimension
    test.skip(
      !questId || !credTestId,
      '缺少 PW_QUEST_VERIFY_MULTI_DIMENSION_ID 或 PW_VERIFY_MULTI_DIMENSION_CRED_TEST_ID，跳过该场景',
    )
    if (!questId || !credTestId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )
    const cred = testPage.locator(`[data-testid="${credTestId}"]`)

    await expect(cred).toBeVisible({ timeout: 20_000 })
    await cred.locator('[data-testid="verify-button"]').click()

    await expect
      .poll(
        async () => {
          const success = await cred
            .locator('.bg-success')
            .isVisible({ timeout: 1_000 })
            .catch(() => false)
          if (success) return 'success'

          const failed = await testPage
            .getByText('Verification failed.')
            .isVisible({ timeout: 1_000 })
            .catch(() => false)
          if (failed) return 'failed'

          return 'pending'
        },
        { timeout: 45_000 },
      )
      .not.toBe('pending')
  })
})
