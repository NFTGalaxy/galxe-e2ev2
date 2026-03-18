import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { handleLogin } from '../util'
import { DASHBOARD_DOMAIN } from '../utils/config'
import basicSetup from '../wallet-setup/basic.setup'
import { bizPaymentCases } from './cases'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const SPACE_ID = process.env.PW_SPACE_ID_BIZ_PAYMENT

async function openBusinessPage(params: {
  context: Parameters<typeof handleLogin>[1]
  page: Parameters<typeof handleLogin>[2]
  extensionId: Parameters<typeof handleLogin>[3]
}) {
  test.skip(!SPACE_ID, '缺少 PW_SPACE_ID_BIZ_PAYMENT，跳过 Biz Payment 场景')
  if (!SPACE_ID) return params.page

  const testPage = await handleLogin(
    DASHBOARD_DOMAIN,
    params.context,
    params.page,
    params.extensionId,
  )
  await testPage.goto(`${DASHBOARD_DOMAIN}/business?space=${SPACE_ID}`, {
    waitUntil: 'domcontentloaded',
  })
  await testPage.waitForLoadState('networkidle').catch(() => undefined)
  return testPage
}

async function openUpgradeModal(
  page: Parameters<typeof openBusinessPage>[0]['page'],
) {
  const upgradeButton = page
    .getByRole('button', { name: /Upgrade|Extend/i })
    .first()
  await expect(upgradeButton).toBeVisible({ timeout: 30_000 })
  await upgradeButton.click()

  await expect(page.getByText('Upgrade to Galxe Business+')).toBeVisible({
    timeout: 20_000,
  })
}

test.describe('Biz Payment P0', () => {
  test('BP-001 [P0] 打开 UpgradeModal 基础信息渲染', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await openBusinessPage({ context, page, extensionId })
    await openUpgradeModal(testPage)

    await expect(testPage.getByText('Subscription Type')).toBeVisible()
    await expect(testPage.getByText('Payment Amount')).toBeVisible()
    await expect(testPage.getByText('Payment Method')).toBeVisible()
    await expect(testPage.getByText('You pay')).toBeVisible()
    await expect(
      testPage.getByRole('button', { name: 'Confirm' }),
    ).toBeVisible()
  })

  test('BP-002 [P0] Activation Date 必填（非 grace period）', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await openBusinessPage({ context, page, extensionId })
    await openUpgradeModal(testPage)

    const activationDate = testPage.getByText('Activation Date')
    const confirmButton = testPage.getByRole('button', { name: 'Confirm' })

    const hasActivationDate = await activationDate
      .isVisible({ timeout: 3_000 })
      .catch(() => false)
    test.skip(
      !hasActivationDate,
      '当前账户为 grace period，无 Activation Date 必填约束',
    )

    await expect(confirmButton).toBeDisabled()
  })

  test('BP-005 [P0] Gas Station 余额为 0 时禁用', async ({
    context,
    page,
    extensionId,
  }) => {
    const expectGasZero = process.env.PW_EXPECT_GAS_STATION_ZERO === 'true'
    test.skip(
      !expectGasZero,
      '未设置 PW_EXPECT_GAS_STATION_ZERO=true，跳过该环境依赖场景',
    )

    const testPage = await openBusinessPage({ context, page, extensionId })
    await openUpgradeModal(testPage)

    const gasStationButton = testPage.getByRole('button', {
      name: /From Gas Station/i,
    })
    await expect(gasStationButton).toBeDisabled({ timeout: 10_000 })
  })

  test('BP-008 [P0] Service Agreement 未勾选拦截', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await openBusinessPage({ context, page, extensionId })
    await openUpgradeModal(testPage)

    const confirmButton = testPage.getByRole('button', { name: 'Confirm' })
    await expect(confirmButton).toBeDisabled()
  })

  test('BP-021 [P1] Gas Station History 改名检查', async ({
    context,
    page,
    extensionId,
  }) => {
    const testPage = await openBusinessPage({ context, page, extensionId })

    await testPage.goto(
      `${DASHBOARD_DOMAIN}/gasStation/history?space=${SPACE_ID}`,
      {
        waitUntil: 'domcontentloaded',
      },
    )
    await testPage.waitForLoadState('networkidle').catch(() => undefined)

    await expect(
      testPage.getByText('Deposit History', { exact: true }),
    ).toBeVisible({
      timeout: 20_000,
    })
    await expect(
      testPage.getByText('Type', { exact: true }).first(),
    ).toBeVisible({
      timeout: 20_000,
    })
  })
})

const automatedCaseIds = new Set([
  'BP-001',
  'BP-002',
  'BP-005',
  'BP-008',
  'BP-021',
])

test.describe('Biz Payment Pending Cases', () => {
  for (const c of bizPaymentCases) {
    if (automatedCaseIds.has(c.id)) continue
    test(`${c.id} [${c.priority}] ${c.title}`, async () => {
      const reason = c.envDependent
        ? 'env-dependent: 需稳定链上钱包/RPC 或交易 mock 才可自动化'
        : '待补自动化实现：已在计划中完成编号与断言定义'
      test.skip(true, reason)
    })
  }
})
