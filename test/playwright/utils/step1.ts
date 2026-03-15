import type { Page } from '@playwright/test'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const setStep1 = async (testPage: Page) => {
  await testPage.getByPlaceholder('Enter quest title').fill('e2e test quest')

  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 1)

  await testPage.locator('#dateRange').click()
  const currentMonthIndex = new Date().getMonth()
  // 从本月1号到下月2号保证Quest日期范围在当前月
  await testPage
    .getByLabel(months[currentMonthIndex] as string)
    .getByRole('gridcell', { name: '1' })
    .first()
    .click()
  await testPage
    .getByLabel(months[currentMonthIndex + 1] as string)
    .getByRole('gridcell', { name: '21' })
    .click()

  await testPage.getByRole('button', { name: 'OK' }).click()
}
