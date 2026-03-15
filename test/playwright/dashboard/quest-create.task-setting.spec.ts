import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import {
  gotoStep3ByHeader,
  loginAndOpenCreate,
} from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Task Setting (M4~M9)', () => {
  test('QC-M4-001 Task Group 默认存在并可编辑', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId)
    await gotoStep3ByHeader(testPage)

    await expect(testPage.getByTestId('setUpCred')).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M6-001 Participate Requirement 开关可开关', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '3',
    })

    const switchEl = testPage
      .getByTestId('participation-requirement-switch')
      .getByRole('switch')
    await expect(switchEl).toBeVisible({ timeout: 20_000 })

    const before = await switchEl.getAttribute('data-state')
    await switchEl.click()
    const after = await switchEl.getAttribute('data-state')
    expect(before).not.toBe(after)
  })

  test('QC-M7-001 Referral Program 开关关闭时不展示配置体', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '3',
    })

    const switchEl = testPage
      .getByTestId('referral-program-switch')
      .getByRole('switch')
    await expect(switchEl).toBeVisible({ timeout: 20_000 })

    const state = await switchEl.getAttribute('data-state')
    if (state === 'checked') {
      await switchEl.click()
    }

    await expect(testPage.getByText('Referral Count')).toHaveCount(0)
  })

  test('QC-M8-001 Collect Info 开关可开关', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '3',
    })

    const switchEl = testPage
      .getByTestId('collect-info-switch')
      .getByRole('switch')
    await expect(switchEl).toBeVisible({ timeout: 20_000 })

    const before = await switchEl.getAttribute('data-state')
    await switchEl.click()
    const after = await switchEl.getAttribute('data-state')
    expect(before).not.toBe(after)
  })

  test('QC-M9-001 User Agreement 默认关闭，不阻塞显示', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '3',
    })

    const switchEl = testPage
      .getByTestId('user-agreement-switch')
      .getByRole('switch')
    await expect(switchEl).toBeVisible({ timeout: 20_000 })

    const state = await switchEl.getAttribute('data-state')
    if (state === 'checked') {
      await switchEl.click()
    }

    await expect(
      testPage.getByPlaceholder('Enter agreement details here'),
    ).toHaveCount(0)
  })
})
