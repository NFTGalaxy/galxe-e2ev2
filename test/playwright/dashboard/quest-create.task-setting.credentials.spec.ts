import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { createVisitAPageCredential } from '../../../test/playwright/utils/step3'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  gotoStep3ByHeader,
  loginAndOpenCreate,
} from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Credentials (M5/M16)', () => {
  test('QC-M5-001 可打开 credential 选择弹窗', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await gotoStep3ByHeader(testPage)

    await testPage.getByTestId('setUpCred').click()
    await expect(
      testPage.getByText('Set Up Quest Task', { exact: true }),
    ).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M5-002 添加 credential 后 EditingCredentials 可见', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await gotoStep3ByHeader(testPage)

    await createVisitAPageCredential(testPage)

    await expect(testPage.getByText('Visit the Test Page')).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M16-001 Credential 弹窗支持搜索', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await gotoStep3ByHeader(testPage)

    await testPage.getByTestId('setUpCred').click()
    await expect(
      testPage.getByText('Set Up Quest Task', { exact: true }),
    ).toBeVisible({
      timeout: 20_000,
    })

    const searchInput = testPage.getByPlaceholder(
      'Enter credential name to search',
    )
    await searchInput.fill('Visit')
    await expect(searchInput).toHaveValue('Visit')
  })

  test('QC-M16-006 Recurring 模式下第2个 credential 限制（数据相关）', async ({
    context,
    page,
    extensionId,
  }) => {
    test.skip(
      true,
      '该场景依赖 Recurrence + 受限 credential 数据，保留为执行占位',
    )

    await loginAndOpenCreate(context, page, extensionId)
  })
})
