import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { handleLogin } from '../util'
import { DASHBOARD_DOMAIN } from '../utils/config'
import basicSetup from '../wallet-setup/basic.setup'
import { cases } from './case'

const test = testWithSynpress(metaMaskFixtures(basicSetup))
const SPACE_ID = process.env.PW_SPACE_ID_BIZ_PAYMENT

async function loginAndOpen(pageCtx: {
  context: Parameters<typeof handleLogin>[1]
  page: Parameters<typeof handleLogin>[2]
  extensionId: Parameters<typeof handleLogin>[3]
}) {
  test.skip(!SPACE_ID, '缺少 PW_SPACE_ID_BIZ_PAYMENT，跳过执行')
  if (!SPACE_ID) return pageCtx.page

  const page = await handleLogin(
    DASHBOARD_DOMAIN,
    pageCtx.context,
    pageCtx.page,
    pageCtx.extensionId,
  )
  await page.goto(`${DASHBOARD_DOMAIN}/business?space=${SPACE_ID}`, {
    waitUntil: 'domcontentloaded',
  })
  await page.waitForLoadState('networkidle').catch(() => undefined)
  return page
}

async function openUpgradeModal(
  page: Parameters<typeof loginAndOpen>[0]['page'],
) {
  const btn = page.getByRole('button', { name: /Upgrade|Extend/i }).first()
  await expect(btn).toBeVisible({ timeout: 30_000 })
  await btn.click()
  await expect(page.getByText('Upgrade to Galxe Business+')).toBeVisible({
    timeout: 20_000,
  })
}

test.describe('Spec Biz Payment - generated', () => {
  for (const c of cases) {
    test(`${c.id} | ${c.description}`, async ({
      context,
      page,
      extensionId,
    }) => {
      // 可直接自动化的核心 UI 用例
      if (c.id === 'REQ-01-TC-01') {
        const p = await loginAndOpen({ context, page, extensionId })
        await openUpgradeModal(p)
        await expect(p.getByText('Subscription Type')).toBeVisible()
        await expect(p.getByText('Payment Amount')).toBeVisible()
        await expect(p.getByText('Payment Method')).toBeVisible()
        await expect(p.getByText('You pay')).toBeVisible()
        await expect(p.getByRole('button', { name: 'Confirm' })).toBeVisible()
        return
      }

      if (c.id === 'REQ-01-TC-02') {
        const p = await loginAndOpen({ context, page, extensionId })
        await openUpgradeModal(p)
        const activationDate = p.getByText('Activation Date')
        const hasActivation = await activationDate
          .isVisible({ timeout: 3000 })
          .catch(() => false)
        test.skip(!hasActivation, '当前空间在 grace period，不适用')
        await expect(p.getByRole('button', { name: 'Confirm' })).toBeDisabled()
        return
      }

      if (c.id === 'REQ-03-TC-01') {
        test.skip(
          process.env.PW_EXPECT_GAS_STATION_ZERO !== 'true',
          '需 PW_EXPECT_GAS_STATION_ZERO=true',
        )
        const p = await loginAndOpen({ context, page, extensionId })
        await openUpgradeModal(p)
        await expect(
          p.getByRole('button', { name: /From Gas Station/i }),
        ).toBeDisabled({ timeout: 10_000 })
        return
      }

      if (c.id === 'REQ-11-TC-01') {
        const p = await loginAndOpen({ context, page, extensionId })
        await p.goto(
          `${DASHBOARD_DOMAIN}/gasStation/history?space=${SPACE_ID}`,
          { waitUntil: 'domcontentloaded' },
        )
        await p.waitForLoadState('networkidle').catch(() => undefined)
        await expect(
          p.getByText('Deposit History', { exact: true }),
        ).toBeVisible({ timeout: 20_000 })
        await expect(p.getByText('Type', { exact: true }).first()).toBeVisible({
          timeout: 20_000,
        })
        return
      }

      // 其余用例已结构化沉淀到 case.ts，待补强 mock/链上环境后自动化
      // test.skip(true, 'Pending automation: depends on backend/chain mocks or wallet transaction orchestration')
    })
  }
})
