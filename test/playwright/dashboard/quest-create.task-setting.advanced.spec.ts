import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import {
  selectVerifyBeforeTasks,
  setMultiCredential,
} from '../../../test/playwright/utils/step3'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  gotoStep3ByHeader,
  loginAndOpenCreate,
} from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Advanced (M17/M18/M19)', () => {
  test('QC-M17-001/002 多维 credential 可配置 Multi-Entry Rule', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await gotoStep3ByHeader(testPage)

    await selectVerifyBeforeTasks(testPage)
    await setMultiCredential(testPage)
  })

  test('QC-M18-003 开启 Boost 后显示 Verify Before Tasks 区块', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '3',
    })

    // Boost 模块当前实现默认打开（新建态）
    await expect(testPage.getByText('Verify Before Tasks')).toBeVisible({
      timeout: 20_000,
    })

    await expect(
      testPage.getByTestId('advanced-sybil-prevention-switch'),
    ).toBeVisible({
      timeout: 20_000,
    })
  })
})
