import type { Page } from "@playwright/test"

// 设置NFT奖励
export const setRewardTypeNftUploadMediaNameContractCap12 = async (
  page: Page,
) => {
  await page.getByTestId('NFT').click()
  await page.getByText('NFT Setting').waitFor({ state: 'visible' })


  await page.getByText('Select contract').click()
  await page.getByText('NFT Contracts List').waitFor({ state: 'visible' })
  await page.getByRole('option').first().click()

  await page.getByPlaceholder('Try a Number').fill('12')
  const mintingCapValue = await page
    .getByPlaceholder('Try a Number')
    .inputValue()

  if (mintingCapValue !== '12') {
    throw new Error(`Expected Minting Cap to be 12, got ${mintingCapValue}`)
  }

  await page.getByPlaceholder('e.g 4 Million Galxe ID Users NFT').fill('Test')


  await page.locator('input[type="file"]').nth(1).setInputFiles('./assets/nft.png')
  await page.screenshot({ path: 'test-results/NFT-settings1.png', fullPage: true });


}


//打开gasStation
export async function enablePointsAndGasStation(page: Page) {
  // await page.getByTestId('OAT').click()

  await page.getByTestId('Points').click()

  const gasStationLabel = page.getByText('Enable Gas Station', { exact: true })
  if (await gasStationLabel.count()) {
    await gasStationLabel.locator('..').getByRole('switch').click()
  }
}



// set oat reward
export const setRewardTypeOatUseTemplateBnbChainMintingCap12 = async (
  page: Page,
) => {
  await page.getByTestId('OAT').click()
  await page.getByText('OAT Setting').waitFor({ state: 'visible' })


  const useTemplateSwitch = page
    .locator('div', { hasText: 'Use a Template' })
    .filter({ has: page.getByRole('switch') })
    .getByRole('switch')
    .first()
  await useTemplateSwitch.click()

  await page.screenshot({ path: 'test-results/oat-settings2.png', fullPage: true });


  // await page.getByText('Create OAT', { exact: true }).click()
  // await delay(3000)
  // await page.getByText('Select a Template').waitFor({ state: 'visible' })

  // await page.getByRole('button', { name: 'Save' }).click()
  // await delay(5000)

  // await page.getByPlaceholder('Select network').click()
  await page.getByText('Select network').click()
  await page.getByText('BNB Chain', { exact: true }).click()

  await page.screenshot({ path: 'test-results/oat-settings4.png', fullPage: true });


  await page.getByPlaceholder('Try a Number').fill('12')
  const mintingCapValue = await page
    .getByPlaceholder('Try a Number')
    .inputValue()
  if (mintingCapValue !== '12') {
    throw new Error(`Expected Minting Cap to be 12, got ${mintingCapValue}`)
  }

  await page.screenshot({ path: 'test-results/oat-settings3.png', fullPage: true });

}
