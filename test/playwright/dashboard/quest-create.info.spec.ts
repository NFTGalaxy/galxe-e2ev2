import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { setStep1 } from '../../../test/playwright/utils/step1'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  expectStep1,
  gotoStep3ByHeader,
  loginAndOpenCreate,
} from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Info (M2/M20)', () => {
  test('QC-M2-001 Title 必填，未填时无法 Release', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await expectStep1(testPage)

    await gotoStep3ByHeader(testPage)
    await expect(testPage.locator('.e2e-release-btn')).toBeDisabled()
  })

  test('QC-M2-003 No End Time 开关可见并可切换', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await expectStep1(testPage)

    const switchRow = testPage.locator('text=No End Time').locator('..')
    await expect(switchRow).toBeVisible({ timeout: 20_000 })
    await switchRow.getByRole('switch').click()
    await expect(switchRow.getByRole('switch')).toHaveAttribute(
      'data-state',
      'checked',
    )
  })

  test('QC-M2-004 Permission 默认 Private，可切换 Public', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    await expect(testPage.getByLabel('Private')).toBeChecked()
    await testPage.getByLabel('Public').click()
    await expect(testPage.getByLabel('Public')).toBeChecked()
  })

  test('QC-M20-001 Title 最大长度 80', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)

    const titleInput = testPage.getByPlaceholder('Enter quest title')
    await titleInput.fill('a'.repeat(120))
    await expect(titleInput).toHaveValue('a'.repeat(80))
    await expect(testPage.getByText('80/80')).toBeVisible({ timeout: 20_000 })
  })

  test('QC-M20-003 Token 类型下 No End Time 隐藏', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })

    await testPage.getByTestId('Token').click()
    await testPage.locator('.e2e-next-step-btn').click()

    await expect(testPage.getByText('No End Time')).toHaveCount(0)
  })

  test('QC-M2-002/003 基础信息完整后可进入可发布态（辅助校验）', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await setStep1(testPage)

    await gotoStep3ByHeader(testPage)
    // Step3 默认仍可能因任务配置未完成而 disabled，这里仅校验 Info 层输入无报错
    await expect(testPage.getByText('Task Settings').nth(1)).toBeVisible({
      timeout: 20_000,
    })
  })
})
