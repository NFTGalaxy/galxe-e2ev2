import type { Page } from '@playwright/test'

const PROFILE_LINK = 'https://x.com/Galxe'
const TWEET_LINK = 'https://x.com/Galxe/status/1541895132667990016'

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const openCredentialSetup = async (page: Page) => {
  const editOrAddTasksLabel = await page.getByText('Edit or Add tasks', {
    exact: true,
  })

  if (await editOrAddTasksLabel.count()) {
    console.log('edit or add tasks label visible')
    await editOrAddTasksLabel.click()
  } else {
    console.log('edit or add tasks label not visible')

    await page.getByTestId('setUpCred').click()
  }
  // await page
  //   .getByText('Set Up Quest Task', { exact: true })
  //   .waitFor({ state: 'visible' })
}

export async function createXFollowerCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Follower').click()
  await page.getByPlaceholder('e.g. https://x.com/Galxe').fill(PROFILE_LINK)
  await saveCred(page)
}

export async function createFollowSpaceCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByText('Set Up Quest Task').waitFor({ state: 'visible' })

  await delay(3000)

  // console.log('x follow space credential')
  await page.getByTestId('Follow Space').click()
  await delay(1000)

  await page.screenshot({
    path: 'test-results/x-follow-space-credential.png',
    fullPage: true,
  })
  await saveCred(page)
}

export async function createSpaceQuestParticipantCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByText('Set Up Quest Task').waitFor({ state: 'visible' })

  await delay(3000)

  // console.log('x space participant credential')
  await page.getByTestId('Space Quest Participant').click()
  await delay(1000)
  await page.screenshot({
    path: 'test-results/x-space-participant-credential.png',
    fullPage: true,
  })
  await saveCred(page)
}

export async function createXFollowedByCredential(page: Page) {
  // console.log(
  // '-------------------------------- create X Followed By credential --------------------------------',
  // )
  await openCredentialSetup(page)
  await page.getByTestId('X Followed By').click()
  await page.getByPlaceholder('e.g. https://x.com/Galxe').fill(PROFILE_LINK)
  await saveCred(page)
}

export async function createXLikeCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Like').click()
  await page
    .getByPlaceholder('e.g. https://x.com/Galxe/status/1541895132667990016')
    .fill(TWEET_LINK)
  await saveCred(page)
}

export async function createXRetweetCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Retweet').click()
  await page
    .getByPlaceholder('e.g. https://x.com/Galxe/status/1541895132667990016')
    .fill(TWEET_LINK)
  await saveCred(page)
}

export async function createXQuoteTweetCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Quote Tweet').click()
  await page
    .getByPlaceholder('e.g. https://x.com/Galxe/status/1541895132667990016')
    .fill(TWEET_LINK)
  await saveCred(page)
}

export async function createXBullishAboutCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Bullish About').click()
  await page.getByPlaceholder('e.g. https://x.com/Galxe').fill(PROFILE_LINK)
  await saveCred(page)
}

export async function createXAccountRequirementCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Account Requirement').click()
  await saveCred(page)
}

export async function createXBlueCheckmarkAccountCredential(page: Page) {
  await openCredentialSetup(page)
  await page.getByTestId('X Blue Checkmark Account').click()
  await saveCred(page)
}

// 初次右下角会弹出一个support 窗口，挡住savebutton
export async function closeSupportWindow(page: Page) {
  // 填写任务奖励点，避免 Step3 校验不通过
  const frame = await page.getByTitle('Intercom notifications message').first()
  if (await frame.count()) {
    await frame.evaluate((el) => el.remove())
  }
}

export const saveCred = async (page: Page) => {
  await closeSupportWindow(page)
  await delay(1000)
  await page.getByTestId('saveCredBtn').click()
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'hidden' })
}

// 设置多维cred
export const setMultiCredential = async (page: Page) => {
  // console.log(
  // '-------------------------------- set credential search  --------------------------------',
  // )
  await openCredentialSetup(page)
  await page.getByText('Set Up Quest Task').waitFor({ state: 'visible' })

  await page.screenshot({
    path: 'test-results/cred-search-11.png',
    fullPage: true,
  })

  // console.log('ready to fill')
  await page
    .getByPlaceholder('Enter credential name to search')
    .fill('G balance on Ethereum')

  await delay(3000)
  await page.screenshot({
    path: 'test-results/cred-search-result.png',
    fullPage: true,
  })
  await page.getByText('G balance on Ethereum', { exact: true }).first().click()

  await delay(2000)

  await saveCred(page)
  await page.getByText('Set Up Quest Task').waitFor({ state: 'hidden' })

  // console.log(
  // '-------------------------------- set multi entry rule  --------------------------------',
  // )

  // 设置多维度任务规则
  await page.getByTestId('open-multi-entry-rule-modal').click()
  await delay(1000)

  await page
    .getByText('Set Multiple Entries Rules', { exact: true })
    .waitFor({ state: 'visible' })
  await page.getByTestId('select-multi-dimension-credential').click()
  await page.getByRole('option').first().click()

  await delay(1000)

  await page.getByTestId('select-multi-dimension-credential').click()
  await page.getByRole('option').first().click()

  await page.getByTestId('select-multi-dimension-field').click()
  await page.getByRole('option').first().click()

  await page.screenshot({
    path: 'test-results/cred-save-2.png',
    fullPage: true,
  })

  await page.getByTestId('multi-entry-rule-number-field').fill('12')

  // 再点一下其他区域激活save，这里是galxe-web逻辑有问题
  await page.getByTestId('select-multi-dimension-credential').click()

  await page.getByRole('button', { name: 'Save' }).click()
  await page.screenshot({
    path: 'test-results/multi-save.png',
    fullPage: true,
  })
}

// 打开verifyBeforeTasks
export const selectVerifyBeforeTasks = async (page: Page) => {
  // console.log(
  // '-------------------------------- select verify before tasks --------------------------------',
  // )
  const verifyRow = page.getByText('Verify Before Tasks').locator('..')
  await verifyRow.locator('img[alt="checkbox"]').click()
  await verifyRow
    .locator('img[src*="checkbox-selected"]')
    .first()
    .waitFor({ state: 'visible' })

  await delay(1000)

  await page.screenshot({
    path: 'test-results/verify-before-tasks.png',
    fullPage: true,
  })
}

// 创建Visit a Page credential
export async function createVisitAPageCredential(page: Page) {
  // console.log(
  // '-------------------------------- create visit a page credential fill info save --------------------------------',
  // )
  await openCredentialSetup(page)
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'visible' })

  await page.getByTestId('Visit a Page').click()
  await page.getByPlaceholder('Please input the Page name').fill('Test Page')
  await page
    .getByPlaceholder('Please paste the link the users need to visit')
    .fill('https://x.com/Galxe')

  await saveCred(page)
  // console.log('saved')
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'hidden' })
}

// 创建两个任务组，一个访问页面，一个关注空间
export async function setTwoTaskGroups(page: Page) {
  // console.log(
  // '-------------------------------- set oat two task groups visit page follow space reward count 1 --------------------------------',
  // )

  await createVisitAPageCredential(page)

  await page.getByText('+ Add New Task Group', { exact: true }).click()

  await page.getByTestId('setUpCred').nth(1).click()
  await page
    .getByText('Set Up Quest Task', { exact: true })
    .waitFor({ state: 'visible' })
  await page.getByTestId('Follow Space').click()
  await saveCred(page)
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

export const createQuestCredential = async (page: Page) => {
  await openCredentialSetup(page)

  await page.getByTestId('Quiz').click()
  // Fill Title
  await page
    .getByPlaceholder('Please input the Page name')
    .fill('My Awesome Quiz')

  // Fill Description (Markdown editor)
  // Targeting the textarea inside the markdown editor
  await page
    .locator('.markdown-placeholder textarea')
    .first()
    .fill('Answer these questions to verify your knowledge.')

  // --- Question 1 (Default is Multiple Choice) ---
  const question1 = page.locator('.bg-component-textfield').nth(0)

  // Fill Question Title
  await question1
    .getByPlaceholder('Question1 title')
    .fill('What is the native token of Ethereum?')

  // Option A
  await question1.locator('input[value="Option A"]').fill('BTC')

  // Option B
  await question1.locator('input[value="Option B"]').fill('ETH')

  // Mark Option B as correct
  // We find the "Option B" input, then find the prefix node (the circle icon) to click
  // The structure is TextField -> prefixNode -> div(onClick)
  // We can target the container of the option which has the input with value "ETH"
  // And then click the icon inside it.
  await question1
    .locator('div')
    .filter({ has: page.locator('input[value="ETH"]') })
    .locator('.cursor-pointer')
    .first()
    .click()

  // Add a 3rd option
  await question1.getByText('+ Add Option').click()
  await question1.locator('input[value="Option C"]').fill('SOL')

  // --- Add Question 2 (Short Answer) ---
  await page.getByText('+Add').click()

  const question2 = page.locator('.bg-component-textfield').nth(1)

  // Fill Question Title
  await question2
    .getByPlaceholder('Question2 title')
    .fill('What is the capital of France?')

  // Change Type to Short Answer
  // Click the Select trigger (combobox)
  await question2.locator('.repo-select-trigger').click() // Assuming class name or use role
  // Since Select implementation might vary, try clicking the text "Multiple Choice" inside the second question
  // await question2.getByText('Multiple Choice').click();
  // Select "Short Answer" from dropdown
  await page.getByText('Short Answer').click()

  // Fill Answer
  await question2.getByPlaceholder('Short answer text').fill('Paris')

  await saveCred(page)
}
