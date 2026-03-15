import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  buildCreateUrl,
  CREATE_CAMPAIGN_IDS,
  expectStep1,
  expectStep2,
  expectStep3,
  loginAndOpenCreate,
} from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Bootstrap (M0/M1)', () => {
  test('QC-M0-001 新建页加载成功，默认 Step=1', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await expectStep1(testPage)
  })

  test('QC-M0-002 step 参数可进入指定步骤', async ({
    context,
    page,
    extensionId,
  }) => {
    const step2Page = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })
    await expectStep2(step2Page)

    await step2Page.goto(buildCreateUrl({ step: '3' }))
    await expectStep3(step2Page)
  })

  test('QC-M0-003 id + isFastCreate 自动跳转 quick-create', async ({
    context,
    page,
    extensionId,
  }) => {
    test.skip(
      !CREATE_CAMPAIGN_IDS.fastCreate,
      '缺少 PW_CREATE_CAMPAIGN_FAST_CREATE_ID，跳过该场景',
    )

    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      id: CREATE_CAMPAIGN_IDS.fastCreate,
    })

    await expect(testPage).toHaveURL(/\/quick-create\?space=/)
  })

  test('QC-M1-001 底部左右箭头切换步骤', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    const nextArrow = testPage.getByTestId('next-arrow')
    await expect(nextArrow).toBeVisible({ timeout: 20_000 })
    await nextArrow.click()
    await expectStep2(testPage)

    const prevArrow = testPage.getByTestId('prev-arrow')
    await expect(prevArrow).toBeVisible({ timeout: 20_000 })
    await prevArrow.click()
    await expectStep1(testPage)
  })

  test('QC-M1-002 Header Next Step 行为 + Step3 显示 Release', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    const nextButton = testPage.locator('.e2e-next-step-btn')
    await expect(nextButton).toBeVisible({ timeout: 20_000 })

    await nextButton.click()
    await expectStep2(testPage)

    await nextButton.click()
    await expectStep3(testPage)

    await expect(testPage.locator('.e2e-release-btn')).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M1-003 Step 未完成时 Release disabled', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '3',
    })
    await expectStep3(testPage)

    await expect(testPage.locator('.e2e-release-btn')).toBeDisabled()
  })
})
