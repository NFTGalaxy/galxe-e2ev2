import { testWithSynpress } from '@synthetixio/synpress-core';
import { metaMaskFixtures } from '../../../src/playwright';
import { handleLogin } from '../util';
import { delay, nextStep, release } from '../utils/actions';
import basicSetup from '../wallet-setup/basic.setup';
// Step 1: 基本信息设置
import { setStep1 } from '../utils/step1';
// Step 2: 奖励设置 - Custom Reward
import { setupCustomReward } from '../utils/step2';
// Step 3: 任务/凭证设置 - Visit a Page
import { createVisitAPageCredential } from '../utils/step3';
import { excuteVisitPageQuest } from '../utils/verify';
// 验证功能

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const dashboardDomain =
  'https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app';
// const domain = "https://dashboard.galxe.com"

const appDomain = 'https://galxe-web-git-feat-likaiagent-e2e-galxe.vercel.app';

/**
 * 端到端测试：创建Custom Reward + Visit Page的Quest，然后进行验证
 *
 * 完整流程：
 * 1. 创建Quest (Custom Reward + Visit Page credential)
 * 2. 发布Quest并获取URL
 * 3. 使用获取的URL进行Visit Page验证
 */
test('E2E: Create Custom Reward Quest with Visit Page and Verify', async ({
  context,
  page,
  extensionId,
}) => {
  console.log(
    '================================ 开始端到端测试 ================================'
  );

  console.log(
    '-------------------------------- Part 1: Creating Quest --------------------------------'
  );

  // 1. 登录和导航到 Quest 创建页面
  const testPage = await handleLogin(
    dashboardDomain,
    context,
    page,
    extensionId
  );
  await testPage.goto(`${dashboardDomain}/quest/create?space=192`); // 测试空间 ID

  // 等待页面加载完成
  await delay(3000);

  // 2. Step 1: 设置基本信息
  console.log('Setting up basic information...');
  await setStep1(testPage);
  await delay(3000);
  await testPage.screenshot({
    path: 'test-results/e2e-create-step1.png',
    fullPage: true,
  });

  // 3. Step 2: 设置 Custom Reward
  console.log('Setting up Custom Reward...');
  await nextStep(testPage);
  await setupCustomReward(testPage);
  await delay(2000);
  await testPage.screenshot({
    path: 'test-results/e2e-create-step2.png',
    fullPage: true,
  });

  // 4. Step 3: 设置 Visit a Page 凭证
  console.log('Setting up Visit a Page credential...');
  await nextStep(testPage);
  await createVisitAPageCredential(testPage);
  await delay(2000);
  await testPage.screenshot({
    path: 'test-results/e2e-create-step3.png',
    fullPage: true,
  });

  // 5. 发布Quest并获取URL
  console.log('Releasing Quest and getting URL...');
  const questUrl = await release(testPage);
  console.log('Quest创建完成！URL:', questUrl);

  await testPage.screenshot({
    path: 'test-results/e2e-quest-released.png',
    fullPage: true,
  });

  // ==================== 第二部分：验证Quest ====================
  console.log(
    '-------------------------------- Part 2: Verifying Quest --------------------------------'
  );

  // 等待一段时间确保Quest完全生效
  await delay(5000);

  // 访问传入的quest URL
  await handleLogin(questUrl, context, testPage, extensionId);

  // 使用获取到的URL进行验证
  await excuteVisitPageQuest(questUrl, testPage);

  console.log(
    '================================ 端到端测试完成 ================================'
  );
});
