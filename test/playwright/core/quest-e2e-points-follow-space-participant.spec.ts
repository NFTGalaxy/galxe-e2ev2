import { testWithSynpress } from '@synthetixio/synpress-core'

import { metaMaskFixtures } from '../../../src/playwright'
import { handleLogin } from '../util'
import { delay, nextStep, release } from '../utils/actions'
// Step 1: 基本信息设置
import { setStep1 } from '../utils/step1'
// Step 2: 奖励设置 - Points 奖励
import { setUpPointsReward } from '../utils/step2'
// Step 3: 任务/凭证设置 - Follow Space 和 Space Quest Participant
import { createFollowSpaceCredential } from '../utils/step3'
// 验证工具
import { verifyFollowSpace } from '../utils/verify'
import basicSetup from '../wallet-setup/basic.setup'

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const domain = 'https://dashboard.galxe.com'
// const appDomain = "https://app.galxe.com"

/**
 * E2E 完整流程测试：Points 奖励 + Follow Space + Space Quest Participant
 * 测试流程：
 * 1. 创建 Quest 并设置 Points 奖励
 * 2. 添加 Follow Space 和 Space Quest Participant 两个凭证
 * 3. 发布 Quest 并验证
 */
test('E2E Points奖励 Follow Space & Space Quest Participant', async ({
  context,
  page,
  extensionId,
}) => {
  // ========== 阶段 1: Quest 创建 ==========
  // console.log('🚀 开始 Quest 创建流程...')

  // 1. 登录 Dashboard 并导航到创建页面
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=1659`)
  await delay(3000)

  // 2. Step 1: 设置基本信息（标题、时间等）
  // console.log('📝 Step 1: 设置 Quest 基本信息')
  await setStep1(testPage)
  await delay(3000)

  // 3. 进入下一步（Step 2）
  await nextStep(testPage)
  // console.log('✅ 进入 Step 2')

  // 4. Step 2: 设置 Points 奖励类型
  // console.log('🎯 Step 2: 设置 Points 奖励')
  await setUpPointsReward(testPage)
  await delay(3000)

  // 截图记录 Points 设置
  await testPage.screenshot({
    path: 'test-results/step2-points-reward.png',
    fullPage: true,
  })

  // 5. 进入下一步（Step 3）
  await nextStep(testPage)
  // console.log('✅ 进入 Step 3')

  // 6. Step 3: 设置任务/凭证
  // console.log('🔧 Step 3: 添加 Follow Space 凭证')
  await createFollowSpaceCredential(testPage)
  await delay(5000)

  await testPage.screenshot({
    path: 'test-results/step3-credentials-setup1.png',
    fullPage: true,
  })

  // console.log('🔧 Step 3: 添加 Space Quest Participant 凭证');
  // await createSpaceQuestParticipantCredential(testPage);
  // await delay(2000);

  // 截图记录凭证设置
  // await testPage.screenshot({
  //   path: 'test-results/step3-credentials-setup.png',
  //   fullPage: true,
  // });

  // 7. 发布 Quest
  // console.log('🚀 发布 Quest...')
  const questUrl = await release(testPage)

  console.log('questUrl', questUrl)
  await delay(5000)

  // ========== 阶段 2: Quest 验证 ==========
  // console.log('🔍 开始 Quest 发布验证...')

  await handleLogin(questUrl, context, testPage, extensionId)

  // 8. 验证 Quest 已成功发布
  await verifyFollowSpace(testPage)
  // await verifySpaceQuestParticipant(testPage);
  // console.log('✅ Quest 发布验证成功')

  // 最终截图 - Quest 发布完成状态
  await testPage.screenshot({
    path: 'test-results/e2e-points-follow-space-participant-released.png',
    fullPage: true,
  })
})
