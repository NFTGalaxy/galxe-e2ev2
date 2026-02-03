import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { delay, nextStep } from '../utils/actions';
// Step 1: 基本信息设置
import { setStep1 } from '../utils/step1';
// Step 2: 奖励设置 - OAT
import { setRewardTypeOatUseTemplateBnbChainMintingCap12 } from '../utils/step2';
// Step 3: 任务/凭证设置 - X Quote Tweet
import { createXQuoteTweetCredential } from '../utils/step3';

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"
// const domain = "https://dashboard.galxe.com"

/**
 * 测试用例：创建 OAT 奖励类型的 Quest，使用 X Quote Tweet 凭证
 * 
 * 测试流程：
 * 1. Step 1: 设置 Quest 基本信息（标题、日期范围）
 * 2. Step 2: 设置 OAT 奖励（使用模板，BNB Chain，铸造上限 12）
 * 3. Step 3: 设置 X Quote Tweet 凭证
 */
test('OAT reward with X Quote Tweet credential', async ({ context, page, extensionId }) => {
  // 1. 登录和导航到 Quest 创建页面
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`)

  // 等待页面加载
  await delay(3000)

  // 2. Step 1: 设置基本信息（标题、日期范围）
  await setStep1(testPage)
  await delay(3000)
  await testPage.screenshot({ path: 'test-results/oat-quote-tweet-step1.png', fullPage: true })

  console.log('-------------------------------- Step 1 completed --------------------------------')

  // 3. 进入下一步（奖励设置页面）
  await nextStep(testPage)

  // 4. Step 2: 设置 OAT 奖励类型
  await setRewardTypeOatUseTemplateBnbChainMintingCap12(testPage)
  await testPage.screenshot({ path: 'test-results/oat-quote-tweet-step2.png', fullPage: true })

  console.log('-------------------------------- Step 2 completed --------------------------------')

  // 5. 进入下一步（任务设置页面）
  await nextStep(testPage)

  // 6. Step 3: 设置 X Quote Tweet 凭证
  await createXQuoteTweetCredential(testPage)
  await testPage.screenshot({ path: 'test-results/oat-quote-tweet-step3.png', fullPage: true })

  console.log('-------------------------------- Step 3 completed --------------------------------')

  // 7. 最终截图
  await testPage.screenshot({ path: 'test-results/oat-quote-tweet-final.png', fullPage: true })
})
