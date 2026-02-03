import type { Page } from "@playwright/test"


const PROFILE_LINK = 'https://x.com/Galxe'
const TWEET_LINK = 'https://x.com/Galxe/status/1541895132667990016'


export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


const openCredentialSetup = async (page: Page) => {
  const editOrAddTasksLabel = await page
    .getByText('Edit or Add tasks', { exact: true })

  if (await editOrAddTasksLabel.count()) {
    console.log('edit or add tasks label visible')
    await editOrAddTasksLabel.click()
  } else {
    await page.getByTestId('setUpCred').click()

  }
  // await page
  //   .getByText('Set Up Quest Task', { exact: true })
  //   .waitFor({ state: 'visible' })
}

const saveCredentialSetup = async (page: Page) => {
  await page.getByTestId('saveCredBtn').click()
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'hidden' })
}

export async function createXFollowerCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Follower').click()
  await page.getByPlaceholder('e.g. https://x.com/Galxe').fill(PROFILE_LINK)
  await saveCredentialSetup(page)
}

export async function createXFollowedByCredential(page: Page) {
  console.log('-------------------------------- create X Followed By credential --------------------------------')
  await openCredentialSetup(page)
  await page.getByTestId('X Followed By').click()
  await page.getByPlaceholder('e.g. https://x.com/Galxe').fill(PROFILE_LINK)
  await saveCredentialSetup(page)
}

export async function createXLikeCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Like').click()
  await page
    .getByPlaceholder(
      'e.g. https://x.com/Galxe/status/1541895132667990016',
    )
    .fill(TWEET_LINK)
  await saveCredentialSetup(page)
}

export async function createXRetweetCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Retweet').click()
  await page
    .getByPlaceholder(
      'e.g. https://x.com/Galxe/status/1541895132667990016',
    )
    .fill(TWEET_LINK)
  await saveCredentialSetup(page)
}

export async function createXQuoteTweetCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Quote Tweet').click()
  await page
    .getByPlaceholder(
      'e.g. https://x.com/Galxe/status/1541895132667990016',
    )
    .fill(TWEET_LINK)
  await saveCredentialSetup(page)
}

export async function createXBullishAboutCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Bullish About').click()
  await page.getByPlaceholder('e.g. https://x.com/Galxe').fill(PROFILE_LINK)
  await saveCredentialSetup(page)
}

export async function createXAccountRequirementCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Account Requirement').click()
  await saveCredentialSetup(page)
}

export async function createXBlueCheckmarkAccountCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Blue Checkmark Account').click()
  await saveCredentialSetup(page)
}


// 设置多维cred
export const setMultiCredential = async (page: Page) => {
  console.log('-------------------------------- set credential search test dogeos  --------------------------------')
  await openCredentialSetup(page)
  await page.getByText('Set Up Quest Task').waitFor({ state: 'visible' })

  await page.screenshot({ path: 'test-results/cred-search-11.png', fullPage: true });
  await page.getByPlaceholder('Enter credential name to search').fill(
    'Test Dogeos',
  )
  await delay(3000)
  await page.screenshot({ path: 'test-results/cred-search-result.png', fullPage: true });
  await page.getByText('Test Dogeos', { exact: true }).first().click()

  await page.getByTestId('saveCredBtn').click()
  await page.getByText('Set Up Quest Task').waitFor({ state: 'hidden' })

  await page.screenshot({ path: 'test-results/cred-save.png', fullPage: true });


  console.log('-------------------------------- set multi entry rule  --------------------------------')

  // 设置多维度任务规则
  await page.getByTestId('open-multi-entry-rule-modal').click()
  await delay(1000)




  await page
    .getByText('Set Multiple Entries Rules', { exact: true })
    .waitFor({ state: 'visible' })
  console.log('visible')
  await page.getByTestId('select-multi-dimension-credential').click()
  await page.getByRole('option').first().click()


  console.log('credential visible')

  await delay(1000)

  console.log('select multi dimension credential')

  await page.getByTestId('select-multi-dimension-credential').click()
  await page.getByRole('option').first().click()



  console.log('select multi dimension field')
  await page.getByTestId('select-multi-dimension-field').click()
  await page.getByRole('option').first().click()

  await page.screenshot({ path: 'test-results/cred-save-2.png', fullPage: true });



  // 再点一下其他区域
  console.log('field visible')
  // await page.getByPlaceholder('Try a number').fill('12')
  await page.getByTestId('multi-entry-rule-number-field').fill('12')

  console.log('fill number')
  // 再点一下其他区域激活save，这里是galxe-web逻辑有问题
  await page.getByTestId('select-multi-dimension-credential').click()


  await page.getByRole('button', { name: 'Save' }).click()
  await page.screenshot({ path: 'test-results/multi-save.png', fullPage: true });

}


// 打开verifyBeforeTasks
export const selectVerifyBeforeTasks = async (page: Page) => {
  console.log('-------------------------------- select verify before tasks --------------------------------')
  const verifyRow = page.getByText('Verify Before Tasks').locator('..')
  await verifyRow.locator('img[alt="checkbox"]').click()
  await verifyRow
    .locator('img[src*="checkbox-selected"]')
    .first()
    .waitFor({ state: 'visible' })

  await delay(1000)

  await page.screenshot({ path: 'test-results/verify-before-tasks.png', fullPage: true });
}

// 创建Visit a Page credential
export async function createVisitAPageCredential(page: Page) {
  console.log('-------------------------------- create visit a page credential fill info save --------------------------------')
  await openCredentialSetup(page)
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'visible' })

  await page.getByTestId('Visit a Page').click()
  await page.getByPlaceholder('Please input the Page name').fill('Test Page')
  await page
    .getByPlaceholder('Please paste the link the users need to visit')
    .fill('https://example.com')

  await page.getByTestId('saveCredBtn').click()
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'hidden' })
}

// 创建两个任务组，一个访问页面，一个关注空间
export async function setTwoTaskGroups(
  page: Page,
) {

  console.log('-------------------------------- set oat two task groups visit page follow space reward count 1 --------------------------------')

  await createVisitAPageCredential(page)

  await page.getByText('+ Add New Task Group', { exact: true }).click()

  await page.getByTestId('setUpCred').nth(1).click()
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'visible' })
  await page.getByTestId('Follow Space').click()
  await page.getByTestId('saveCredBtn').click()
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'hidden' })

  await page.getByTestId('rewardCount').nth(1).fill('1')
  const secondRewardCount = await page
    .getByTestId('rewardCount')
    .nth(1)
    .inputValue()
  if (secondRewardCount !== '1') {
    throw new Error(
      `Expected rewardCount for group 2 to be 1, got ${secondRewardCount}`,
    )
  }
}

