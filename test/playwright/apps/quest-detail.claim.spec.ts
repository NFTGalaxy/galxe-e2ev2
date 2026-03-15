import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  clickClaimPrimaryButton,
  expectLoginModal,
  loginAndOpenQuest,
  openQuest,
  QUEST_IDS,
} from '../utils/config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Claim (T4/T5)', () => {
  test('VC-001 未登录点击 claim -> Log in + 登录弹窗', async ({ page }) => {
    await openQuest(page, QUEST_IDS.valid)

    const loginButton = page.getByRole('button', { name: 'Log in' }).first()
    await expect(loginButton).toBeVisible({ timeout: 20_000 })
    await loginButton.click()

    await expectLoginModal(page)
  })

  test('VC-006 requiredInfo 不满足时拦截 claim', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimRequiredInfo
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_REQUIRED_INFO_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )
    await clickClaimPrimaryButton(testPage)

    await expect(testPage.getByText('Connect Account')).toBeVisible({
      timeout: 20_000,
    })
    await expect(
      testPage.getByText(
        'Please connect to following accounts first, then try again:',
      ),
    ).toBeVisible({ timeout: 20_000 })
  })

  test('VC-007 user agreement 拦截后可同意放行', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimAgreement
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_AGREEMENT_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )

    await clickClaimPrimaryButton(testPage)
    await expect(testPage.getByRole('button', { name: 'Approve' })).toBeVisible(
      {
        timeout: 20_000,
      },
    )

    await testPage.getByRole('button', { name: 'Cancel' }).click()
    await expect(testPage.getByRole('button', { name: 'Approve' })).toBeHidden({
      timeout: 20_000,
    })

    await clickClaimPrimaryButton(testPage)
    await testPage.getByRole('button', { name: 'Approve' }).click()
    await expect(testPage.getByRole('button', { name: 'Approve' })).toBeHidden({
      timeout: 20_000,
    })
  })

  test('VC-008 sequential quest 锁定状态提示', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimLocked
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_LOCKED_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )

    const lockIcon = testPage.locator('img[alt="lock"]').first()
    await expect(lockIcon).toBeVisible({ timeout: 20_000 })
    await lockIcon.hover()

    await expect(
      testPage.getByText('Please complete the previous campaigns in order.'),
    ).toBeVisible({ timeout: 20_000 })
  })

  test('VC-009 claim 成功后出现结果反馈', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimSuccess
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_SUCCESS_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )

    await clickClaimPrimaryButton(testPage)

    await expect(
      testPage.getByText(
        /Claimed successfully!|Claimed reward successfully\.|Claiming/,
      ),
    ).toBeVisible({ timeout: 60_000 })
  })

  test('VC-010 多奖励 quest 显示 multi reward 入口', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimMultiReward
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_MULTI_REWARD_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )

    await clickClaimPrimaryButton(testPage)

    await expect(
      testPage.getByText('Claim all rewards together to save on gas fees.'),
    ).toBeVisible({ timeout: 20_000 })
  })

  test('VC-011 FCFS 多奖励提示可关闭', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimMultiReward
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_MULTI_REWARD_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )

    const tipText = testPage.getByText(
      'Claim all rewards together to save on gas fees.',
    )
    await expect(tipText).toBeVisible({ timeout: 20_000 })

    await tipText
      .locator('xpath=ancestor::div[2]')
      .locator('svg')
      .first()
      .click()
    await expect(tipText).toBeHidden({ timeout: 20_000 })
  })

  test('VC-012 地址未绑定时弹 ParticipantDialog', async ({
    context,
    page,
    extensionId,
  }) => {
    const questId = QUEST_IDS.claimAddressBinding
    test.skip(!questId, '缺少 PW_QUEST_CLAIM_BIND_ADDRESS_ID，跳过该场景')
    if (!questId) return

    const testPage = await loginAndOpenQuest(
      context,
      page,
      extensionId,
      questId,
    )

    await clickClaimPrimaryButton(testPage)

    await expect(
      testPage.getByText('To participate in this quest, you need to bind your'),
    ).toBeVisible({ timeout: 20_000 })
    await expect(testPage.getByRole('button', { name: 'Go Now' })).toBeVisible({
      timeout: 20_000,
    })
  })
})
