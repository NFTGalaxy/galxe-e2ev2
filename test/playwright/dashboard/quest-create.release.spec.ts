import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { setStep1 } from '../../../test/playwright/utils/step1'
import { createVisitAPageCredential } from '../../../test/playwright/utils/step3'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  CREATE_CAMPAIGN_IDS,
  gotoStep3ByHeader,
  loginAndOpenCreate,
} from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Release (M10/M11)', () => {
  test('QC-M10-001 Save Draft 成功后 URL 带 id', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    await setStep1(testPage)
    await testPage.getByRole('button', { name: 'Save Draft' }).click()

    await expect(
      testPage.getByText('Saved Quest Successfully.').first(),
    ).toBeVisible({
      timeout: 30_000,
    })
    await expect(testPage).toHaveURL(/id=/)
  })

  test('QC-M10-002 Preview: 无 id 禁用，有 id 可点击', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    await expect(
      testPage.getByRole('button', { name: 'Preview' }),
    ).toBeDisabled()

    await setStep1(testPage)
    await testPage.getByRole('button', { name: 'Save Draft' }).click()
    await expect(
      testPage.getByText('Saved Quest Successfully.').first(),
    ).toBeVisible({
      timeout: 30_000,
    })

    await expect(
      testPage.getByRole('button', { name: 'Preview' }),
    ).toBeEnabled()
  })

  test('QC-M10-003 Step3 点击 Release 弹确认窗', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    await setStep1(testPage)
    await gotoStep3ByHeader(testPage)
    await createVisitAPageCredential(testPage)

    // 填写任务奖励点，避免 Step3 校验不通过
    const pointCount = testPage.getByTestId('pointCount').first()
    if (await pointCount.count()) {
      await pointCount.fill('10')
    }

    const releaseBtn = testPage.locator('.e2e-release-btn')
    await expect(releaseBtn).toBeEnabled({ timeout: 20_000 })
    await releaseBtn.click()

    await expect(
      testPage.getByRole('button', { name: 'Release Now' }),
    ).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M10-004 纯社媒类任务触发 Reminder 再确认', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    await setStep1(testPage)
    await gotoStep3ByHeader(testPage)
    await createVisitAPageCredential(testPage)

    const pointCount = testPage.getByTestId('pointCount').first()
    if (await pointCount.count()) {
      await pointCount.fill('10')
    }

    // 关闭participate requirement
    const participateSwitch = await page
      .getByTestId('participation-requirement-switch')
      .locator('button')
      .first()

    await participateSwitch.click()

    await testPage.locator('.e2e-release-btn').click()

    await expect(
      testPage.getByRole('button', { name: 'Ignore and Release' }),
    ).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M11-001 编辑态加载 active campaign 回填（数据相关）', async ({
    context,
    page,
    extensionId,
  }) => {
    test.skip(
      !CREATE_CAMPAIGN_IDS.active,
      '缺少 PW_CREATE_CAMPAIGN_ACTIVE_ID，跳过编辑态回填场景',
    )

    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      id: CREATE_CAMPAIGN_IDS.active,
    })

    await expect(
      testPage.getByPlaceholder('Enter quest title'),
    ).not.toHaveValue('')
  })

  test('QC-M11-004 草稿编辑态可再次保存', async ({
    context,
    page,
    extensionId,
  }) => {
    test.skip(
      !CREATE_CAMPAIGN_IDS.draft,
      '缺少 PW_CREATE_CAMPAIGN_DRAFT_ID，跳过草稿编辑场景',
    )

    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      id: CREATE_CAMPAIGN_IDS.draft,
    })

    await testPage.getByRole('button', { name: 'Save Draft' }).click()
    await expect(
      testPage.getByText('Saved Quest Successfully.').first(),
    ).toBeVisible()
  })
})
