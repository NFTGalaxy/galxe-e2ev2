import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../../../test/playwright/wallet-setup/basic.setup'
import { expectStep2, loginAndOpenCreate } from '../utils/quest-create.config'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

test.describe('Quest Create Rewards (M3/M12/M13/M15)', () => {
  test('QC-M3A-001 默认奖励类型为 Points', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })
    await expectStep2(testPage)

    await expect(testPage.getByText('Point Setting')).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M3A-002 切换奖励类型渲染对应子组件', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })

    await testPage.getByTestId('OAT').click()
    await expect(testPage.getByText('OAT Setting')).toBeVisible({
      timeout: 20_000,
    })

    await testPage.getByTestId('NFT').click()
    await expect(testPage.getByText('NFT Setting')).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M12-001 Token 模式下默认发放方式为 FCFS', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })

    await testPage.getByTestId('Token').click()
    await expect(testPage.getByRole('button', { name: 'Raffle' })).toBeVisible({
      timeout: 20_000,
    })

    await expect(
      testPage.getByText('The raffle time is the same as the quest end time.'),
    ).toBeVisible({ timeout: 20_000 })
  })

  test('QC-M13-001/002 OAT/NFT 奖励下 Gas 配置可见', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })

    await testPage.getByTestId('OAT').click()
    await expect(
      testPage.getByText('Enable Gas Station', { exact: true }),
    ).toBeVisible({
      timeout: 20_000,
    })

    await testPage.getByTestId('NFT').click()
    await expect(
      testPage.getByText('Enable Gas Station', { exact: true }),
    ).toBeVisible({
      timeout: 20_000,
    })
  })

  test('QC-M13-004 Points 显示 / Custom Reward 不显示 Gas 配置', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })

    await expect(
      testPage.getByText('Enable Gas Station', { exact: true }),
    ).toHaveCount(1)

    await testPage.getByTestId('Custom Reward').click()
    await expect(
      testPage.getByText('Enable Gas Station', { exact: true }),
    ).toHaveCount(0)
  })

  test('QC-M15-001/002 Token 子类型切换 Fixed <-> Luck-Based', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await loginAndOpenCreate(context, page, extensionId, {
      step: '2',
    })

    await testPage.getByTestId('Token').click()
    await expect(testPage.getByText('Fixed Token Setting')).toBeVisible({
      timeout: 20_000,
    })

    await testPage.getByText('Luck-Based Token Reward', { exact: true }).click()
    await expect(testPage.getByText('Luck-Based Token Setting')).toBeVisible({
      timeout: 20_000,
    })
  })
})
