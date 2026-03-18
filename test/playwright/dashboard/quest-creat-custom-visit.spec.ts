import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { handleLogin } from '../util'
import { delay, nextStep } from '../utils/actions'
import { DASHBOARD_DOMAIN } from '../utils/config'
// Step 1: 基本信息设置
import { setStep1 } from '../utils/step1'
// Step 2: 奖励设置 - NFT
import { setupCustomReward } from '../utils/step2'
// Step 3: 任务/凭证设置
import { closeSupportWindow, createVisitAPageCredential } from '../utils/step3'
import basicSetup from '../wallet-setup/basic.setup'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

/**
 * 测试用例：创建 NFT 奖励类型的 Quest，使用 X Quote Tweet 凭证和多维 cred，并打开 verifyBeforeTasks
 *
 * 测试流程：
 * 1. Step 1: 设置 Quest 基本信息（标题、日期范围）
 * 2. Step 2: 设置 NFT 奖励（上传媒体、名称、合约、铸造上限 12）
 * 3. Step 3:
 *    - 打开 verifyBeforeTasks
 *    - 设置 X Quote Tweet 凭证
 *    - 设置多维 cred
 */
test('Custom reward with visit page credential', async ({
  context,
  page,
  extensionId,
}) => {
  // 1. 登录和导航到 Quest 创建页面
  const testPage = await handleLogin(
    DASHBOARD_DOMAIN,
    context,
    page,
    extensionId,
  )
  await testPage.goto(`${DASHBOARD_DOMAIN}/quest/create?space=1659`)

  // 等待页面加载
  await delay(3000)

  // 进来之前先关掉 可能弹出的support窗口
  await closeSupportWindow(page)

  // 2. Step 1: 设置基本信息（标题、日期范围）
  await setStep1(testPage)
  await delay(3000)
  await testPage.screenshot({
    path: 'test-results/nft-quote-tweet-multi-step1.png',
    fullPage: true,
  })

  // console.log('-------------------- Step 1 completed ------------------------')

  // 3. 进入下一步（奖励设置页面）
  await nextStep(testPage)

  // 4. Step 2: 设置 NFT 奖励类型
  await setupCustomReward(testPage)
  await testPage.screenshot({
    path: 'test-results/nft-quote-tweet-multi-step2.png',
    fullPage: true,
  })

  // console.log('--------------------- Step 2 completed -----------------')

  // 5. 进入下一步（任务设置页面）
  await nextStep(testPage)

  // 6.2 设置 X Quote Tweet 凭证
  await createVisitAPageCredential(testPage)
  // console.log('--------------- Visit page credential created ---------------')
})
