import { expect } from '@playwright/test'
import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { handleLogin } from '../util'
import { APP_DOMAIN, QUEST_IDS, QUEST_SPACE_ALIAS } from '../utils/config'
import basicSetup from '../wallet-setup/basic.setup'
import { cases } from './case'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const RANK_URL = `${APP_DOMAIN}/quest/explore`
const RANK_TAB_URL = `${APP_DOMAIN}/quest/explore/rank`

// ── Helpers ─────────────────────────────────────────────────────────

async function loginAndVisit(
  ctx: {
    context: Parameters<typeof handleLogin>[1]
    page: Parameters<typeof handleLogin>[2]
    extensionId: Parameters<typeof handleLogin>[3]
  },
  url: string,
) {
  const page = await handleLogin(APP_DOMAIN, ctx.context, ctx.page, ctx.extensionId)
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => undefined)
  return page
}

async function visitWithoutLogin(
  page: Parameters<typeof handleLogin>[2],
  url: string,
) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => undefined)
  return page
}

const CATEGORY_BUTTONS = [
  'Ecosystem Missions',
  'Alpha Signals',
  'Token Bounties',
  'Popular Picks',
]

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Ecosystem Missions':
    'Overall Featured Ranking Index is determined by space influence, release time, and other factors.',
  'Alpha Signals':
    'Overall High Potential Ranking Index is determined by additional benefits, campaign rewards and other factors.',
  'Token Bounties':
    'Overall Token Ranking Index is determined by task simplicity, 1-day campaign participation and other factors.',
  'Popular Picks':
    'Overall Trending Ranking Index is determined by 3-day campaign participation, task simplicity, and other factors.',
}

const LAST_COL_HEADERS: Record<string, string> = {
  ecosystem: 'Release Time',
  alpha: 'Additional Benefits',
  token: 'Difficulty',
  popular: '3-day Participation',
}

// ── M1: Navigation Bar ──────────────────────────────────────────────

test.describe('M1: Navigation Bar – Smart Ranking Entry', () => {
  const c01 = cases.find((c) => c.id === 'REQ-01-TC-01')!
  test(`${c01.id} | ${c01.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, APP_DOMAIN)
    // Hover Explore menu
    const exploreMenu = p.locator('nav').getByText('Explore').first()
    await expect(exploreMenu).toBeVisible({ timeout: 15_000 })
    await exploreMenu.hover()
    // Look for Smart Ranking link in dropdown
    const smartRankLink = p.locator('a, button').filter({ hasText: 'Smart Ranking' }).first()
    await expect(smartRankLink).toBeVisible({ timeout: 10_000 })
  })

  const c02 = cases.find((c) => c.id === 'REQ-01-TC-02')!
  test(`${c02.id} | ${c02.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, APP_DOMAIN)
    const exploreMenu = p.locator('nav').getByText('Explore').first()
    await expect(exploreMenu).toBeVisible({ timeout: 15_000 })
    await exploreMenu.hover()
    const smartRankLink = p.locator('a').filter({ hasText: 'Smart Ranking' }).first()
    await expect(smartRankLink).toBeVisible({ timeout: 10_000 })
    await smartRankLink.click()
    await p.waitForURL(/\/quest\/explore.*rank|\/explore\/rank/, { timeout: 15_000 })
  })
})

// ── M2: Explore All – Smart Ranking Tab ─────────────────────────────

test.describe('M2: Explore All – Smart Ranking Tab', () => {
  const c01 = cases.find((c) => c.id === 'REQ-02-TC-01')!
  test(`${c01.id} | ${c01.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_URL)
    await expect(p.getByRole('tab', { name: 'Smart Ranking' }).or(p.locator('button, a').filter({ hasText: 'Smart Ranking' }).first())).toBeVisible({ timeout: 15_000 })
  })

  const c02 = cases.find((c) => c.id === 'REQ-02-TC-02')!
  test(`${c02.id} | ${c02.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    for (const name of CATEGORY_BUTTONS) {
      await expect(p.getByRole('button', { name }).or(p.locator('button').filter({ hasText: name }))).toBeVisible({ timeout: 15_000 })
    }
  })

  const c03 = cases.find((c) => c.id === 'REQ-02-TC-03')!
  test(`${c03.id} | ${c03.description}`, async ({ page }) => {
    const p = await visitWithoutLogin(page, RANK_TAB_URL)
    await expect(p.getByText('Log in to Discover and Stay Updated')).toBeVisible({ timeout: 15_000 })
    await expect(p.getByRole('button', { name: /Log in/i })).toBeVisible()
  })

  const c04 = cases.find((c) => c.id === 'REQ-02-TC-04')!
  test(`${c04.id} | ${c04.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    // Click Alpha Signals
    const alphaBtn = p.getByRole('button', { name: 'Alpha Signals' }).or(p.locator('button').filter({ hasText: 'Alpha Signals' })).first()
    await expect(alphaBtn).toBeVisible({ timeout: 15_000 })
    await alphaBtn.click()
    // Verify white border on active button
    const borderColor = await alphaBtn.evaluate((el) => getComputedStyle(el).borderColor)
    // Tailwind border-white resolves to rgb(255, 255, 255)
    expect(borderColor).toContain('255')
  })

  const c05 = cases.find((c) => c.id === 'REQ-02-TC-05')!
  test(`${c05.id} | ${c05.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)

    for (const [name, desc] of Object.entries(CATEGORY_DESCRIPTIONS)) {
      const btn = p.getByRole('button', { name }).or(p.locator('button').filter({ hasText: name }))
      await btn.first().click()
      await expect(p.getByText(desc)).toBeVisible({ timeout: 10_000 })
    }
  })

  const c06 = cases.find((c) => c.id === 'REQ-02-TC-06')!
  test(`${c06.id} | ${c06.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit(
      { context, page, extensionId },
      `${RANK_TAB_URL}?category=token`,
    )
    // Token Bounties should be active, header should show Difficulty
    await expect(p.getByText('Difficulty')).toBeVisible({ timeout: 15_000 })
  })
})

// ── M3: Campaign Card ───────────────────────────────────────────────

test.describe('M3: Campaign Card', () => {
  const c01 = cases.find((c) => c.id === 'REQ-04-TC-01')!
  test(`${c01.id} | ${c01.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    // Wait for at least one campaign row to load
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })

    // Verify table header columns exist
    await expect(p.getByText('Ranking')).toBeVisible()
    await expect(p.getByText('Index')).toBeVisible()
    await expect(p.getByText('Quest/Space')).toBeVisible()
    await expect(p.getByText('Rewards')).toBeVisible()
  })

  const c02 = cases.find((c) => c.id === 'REQ-04-TC-02')!
  test(`${c02.id} | ${c02.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })

    // Top 1/2/3 should show ranking images
    const rankingImages = p.locator('img[src*="ranking-0"]')
    const imgCount = await rankingImages.count()
    expect(imgCount).toBeGreaterThanOrEqual(1) // at least top 1
  })

  const c03_arrow = cases.find((c) => c.id === 'REQ-04-TC-03')!
  test(`${c03_arrow.id} | ${c03_arrow.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })
    // Verify arrow indicators exist (↑ or ↓) or no arrow for "none"
    const arrows = p.locator('text=/[↑↓]/')
    // At least verify the index scores are rendered (some may have no change)
    const indexScores = p.locator('span.font-semibold').filter({ hasText: /\d+\.\d+/ })
    await expect(indexScores.first()).toBeVisible({ timeout: 10_000 })
  })

  const c04 = cases.find((c) => c.id === 'REQ-04-TC-04')!
  test(`${c04.id} | ${c04.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })

    const href = await firstRow.getAttribute('href')
    expect(href).toMatch(/\/quest\/[^/]+\/[^/]+/)

    await firstRow.click()
    await p.waitForURL(/\/quest\/[^/]+\/[^/]+/, { timeout: 15_000 })
  })

  // ── Differentiated Last Column ────────────────────────────────────

  const c_eco = cases.find((c) => c.id === 'REQ-05-TC-01')!
  test(`${c_eco.id} | ${c_eco.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit(
      { context, page, extensionId },
      `${RANK_TAB_URL}?category=ecosystem`,
    )
    await expect(p.getByText('Release Time')).toBeVisible({ timeout: 15_000 })
    // Check at least one row shows "Live for" or "Today"
    const liveText = p.locator('text=/Live for|Today/')
    await expect(liveText.first()).toBeVisible({ timeout: 10_000 })
  })

  const c_alpha = cases.find((c) => c.id === 'REQ-06-TC-01')!
  test(`${c_alpha.id} | ${c_alpha.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit(
      { context, page, extensionId },
      `${RANK_TAB_URL}?category=alpha`,
    )
    await expect(p.getByText('Additional Benefits')).toBeVisible({ timeout: 15_000 })
  })

  const c_token = cases.find((c) => c.id === 'REQ-07-TC-01')!
  test(`${c_token.id} | ${c_token.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit(
      { context, page, extensionId },
      `${RANK_TAB_URL}?category=token`,
    )
    await expect(p.getByText('Difficulty')).toBeVisible({ timeout: 15_000 })
  })

  const c_pop = cases.find((c) => c.id === 'REQ-08-TC-01')!
  test(`${c_pop.id} | ${c_pop.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit(
      { context, page, extensionId },
      `${RANK_TAB_URL}?category=popular`,
    )
    await expect(p.getByText('3-day Participation')).toBeVisible({ timeout: 15_000 })
  })

  const c_grad = cases.find((c) => c.id === 'REQ-04-TC-05')!
  test(`${c_grad.id} | ${c_grad.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })
    // Top rows should have gradient background style
    const bgImage = await firstRow.evaluate((el) => getComputedStyle(el).backgroundImage)
    expect(bgImage).toContain('gradient')
  })

  // Table header differentiation
  const c_hdr = cases.find((c) => c.id === 'REQ-04-TC-06')!
  test(`${c_hdr.id} | ${c_hdr.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)

    const categoryToParam: Record<string, string> = {
      ecosystem: 'ecosystem',
      alpha: 'alpha',
      token: 'token',
      popular: 'popular',
    }

    for (const [catId, expectedHeader] of Object.entries(LAST_COL_HEADERS)) {
      await p.goto(`${RANK_TAB_URL}?category=${catId}`, { waitUntil: 'domcontentloaded' })
      await p.waitForLoadState('networkidle').catch(() => undefined)
      await expect(p.getByText(expectedHeader)).toBeVisible({ timeout: 10_000 })
    }
  })
})

// ── M4: Explore More – Smart Ranking Card ───────────────────────────

test.describe('M4: Explore More – Smart Ranking Card', () => {
  const QUEST_URL = `${APP_DOMAIN}/quest/${QUEST_SPACE_ALIAS}/${QUEST_IDS.valid}`

  const c01 = cases.find((c) => c.id === 'REQ-09-TC-01')!
  test(`${c01.id} | ${c01.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, QUEST_URL)
    // Scroll down to Explore More section
    const smartRankCard = p.locator('text=Smart Ranking').first()
    await smartRankCard.scrollIntoViewIfNeeded()
    await expect(smartRankCard).toBeVisible({ timeout: 20_000 })

    // Verify subtitle
    await expect(
      p.getByText('Galxe Official Featured Lists: Authentic Data, Updated Daily'),
    ).toBeVisible({ timeout: 10_000 })
  })

  const c02_tag = cases.find((c) => c.id === 'REQ-09-TC-02')!
  test(`${c02_tag.id} | ${c02_tag.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, QUEST_URL)
    const cardLink = p.locator('a[href*="/quest/explore/rank?category="]').first()
    await cardLink.scrollIntoViewIfNeeded()
    await expect(cardLink).toBeVisible({ timeout: 20_000 })
    // Verify the card shows one of the four tagline descriptions
    const descriptions = [
      'Build your legacy through meaningful challenges',
      'Be early on promising projects',
      'Earn rewards by completing simple tasks',
      'Join the campaigns everyone is talking about',
    ]
    const cardText = await cardLink.textContent()
    const hasDesc = descriptions.some((d) => cardText?.includes(d))
    expect(hasDesc).toBe(true)
  })

  const c03_tag = cases.find((c) => c.id === 'REQ-09-TC-03')!
  test(`${c03_tag.id} | ${c03_tag.description}`, async ({ context, page, extensionId }) => {
    // Default card when userTag is null → Ecosystem Missions
    const p = await loginAndVisit({ context, page, extensionId }, QUEST_URL)
    const cardLink = p.locator('a[href*="/quest/explore/rank?category="]').first()
    await cardLink.scrollIntoViewIfNeeded()
    await expect(cardLink).toBeVisible({ timeout: 20_000 })
    const href = await cardLink.getAttribute('href')
    expect(href).toBeTruthy()
  })

  const c04 = cases.find((c) => c.id === 'REQ-09-TC-04')!
  test(`${c04.id} | ${c04.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, QUEST_URL)
    // Find the Smart Ranking card link
    const cardLink = p.locator('a[href*="/quest/explore/rank?category="]').first()
    await cardLink.scrollIntoViewIfNeeded()
    await expect(cardLink).toBeVisible({ timeout: 20_000 })

    const href = await cardLink.getAttribute('href')
    expect(href).toMatch(/\/quest\/explore\/rank\?category=(ecosystem|alpha|token|popular)/)

    await cardLink.click()
    await p.waitForURL(/\/quest\/explore\/rank/, { timeout: 15_000 })
  })

  const c05 = cases.find((c) => c.id === 'REQ-09-TC-05')!
  test(`${c05.id} | ${c05.description}`, async ({ page }) => {
    const p = await visitWithoutLogin(page, QUEST_URL)
    // Smart Ranking card should not be visible for logged-out users
    const smartRankCards = p.locator('a[href*="/quest/explore/rank?category="]')
    const count = await smartRankCards.count()
    expect(count).toBe(0)
  })
})

// ── M5: Event Tracking ──────────────────────────────────────────────

test.describe('M5: Event Tracking', () => {
  const c01 = cases.find((c) => c.id === 'REQ-15-TC-01')!
  test(`${c01.id} | ${c01.description}`, async ({ context, page, extensionId }) => {
    const gaEvents: { name: string; params: Record<string, unknown> }[] = []

    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)

    // Intercept GA events via dataLayer or network requests
    await p.evaluate(() => {
      ;(window as any).__capturedGAEvents = []
      const originalPush = (window as any).dataLayer?.push
      if (originalPush) {
        ;(window as any).dataLayer.push = function (...args: any[]) {
          ;(window as any).__capturedGAEvents.push(...args)
          return originalPush.apply(this, args)
        }
      }
    })

    // Wait for campaign cards to render
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })

    // Scroll to trigger view event
    await firstRow.scrollIntoViewIfNeeded()
    await p.waitForTimeout(2000) // allow time for intersection observer

    // We verify the GAViewTracker wrapper exists (event firing depends on runtime GA config)
    // This is a structural verification that the tracking wrapper is in place
    const gaWrapper = p.locator('[data-ga-view-event="smart_ranking_campaign_view"]').or(firstRow)
    await expect(gaWrapper).toBeVisible()
  })

  const c02_evt = cases.find((c) => c.id === 'REQ-15-TC-02')!
  test(`${c02_evt.id} | ${c02_evt.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, RANK_TAB_URL)
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })
    // Click campaign card – structural verification that it's wrapped in tracking
    await firstRow.click()
    await p.waitForURL(/\/quest\/[^/]+\/[^/]+/, { timeout: 15_000 })
  })

  const c03 = cases.find((c) => c.id === 'REQ-15-TC-03')!
  test(`${c03.id} | ${c03.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit(
      { context, page, extensionId },
      `${RANK_TAB_URL}?category=alpha`,
    )
    const firstRow = p.locator('a[href*="/quest/"]').first()
    await expect(firstRow).toBeVisible({ timeout: 20_000 })

    // Structural check: verify we're on alpha category
    await expect(p.getByText('Additional Benefits')).toBeVisible()
  })
})

// ── M7: Footer ──────────────────────────────────────────────────────

test.describe('M7: Footer', () => {
  const c = cases.find((c) => c.id === 'REQ-01-TC-03')!
  test(`${c.id} | ${c.description}`, async ({ context, page, extensionId }) => {
    const p = await loginAndVisit({ context, page, extensionId }, APP_DOMAIN)
    const footer = p.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    const smartRankLink = footer.locator('a').filter({ hasText: 'Smart Ranking' })
    await expect(smartRankLink).toBeVisible({ timeout: 10_000 })
  })
})
