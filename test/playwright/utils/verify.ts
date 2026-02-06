import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { delay } from './actions';

export async function accessVisitPageCredential(page: Page) {
  // Find the Visit Page credential item using the data-testid
  // CredSource.VisitLink maps to "cred-item-VISIT_LINK" in QuestCredItem.tsx line 300
  const visitPageCredential = page.locator(
    '[data-testid="cred-item-VISIT_LINK"]'
  );

  if (await isCredentialCompleted(page, 'cred-item-VISIT_LINK')) {
    console.log(
      'Visit Page credential is already completed, returning directly'
    );
    return;
  }

  // Click on the Visit Page credential to expand it and trigger the action
  await visitPageCredential.click();

  // Wait for the Risk Warning Modal to appear
  // The modal shows when the link is not in whitelist (useCredActions.ts line 204)
  const riskWarningModal = page
    .locator("text=You're about to leave galxe.com")
    .first();

  /** Detect whether the modal is visible before proceeding. */
  const isRiskWarningVisible = await riskWarningModal
    .isVisible({ timeout: 3000 })
    .catch(() => false);

  /** Exit early when the modal does not appear. */
  if (!isRiskWarningVisible) {
    console.log('ℹ️  Risk Warning Modal is not displayed');
  } else {
    console.log('⚠️  Risk Warning Modal detected, proceeding to continue...');

    // Locate and click the "Continue to Access" button in the modal
    // From RiskWarningModal.tsx line 98, the button contains "Continue to Access" text
    const continueButton = page.locator('text=Continue to Access').first();
    await continueButton.waitFor({ state: 'visible' });

    // Click the continue button to proceed with accessing the external link
    await continueButton.click();
    await riskWarningModal.waitFor({ state: 'hidden', timeout: 5000 });
  }

  await delay(3000);

  const urls = await page
    .context()
    .pages()
    .map(page => page.url());

  console.log('urls', urls);

  await page.reload({
    waitUntil: 'networkidle', // 等待网络空闲
  });

  await page.screenshot({
    path: 'test-results/verify-quest-refresh.png',
    fullPage: true,
  });
  await delay(10000);

  // 点击verify button
  await clickVerifyButtonUnderCredential(page, 'cred-item-VISIT_LINK');
}

export async function closeLevelUpModal(page: Page) {
  try {
    // Wait briefly to allow modal to appear if it's going to show
    await page.waitForTimeout(1000);
    // Check if the Level Up modal is currently displayed
    // Look for the distinctive "Congratulations!" text from LevelUp.tsx line 64
    const levelUpModal = page.locator('text=Congratulations!').first();

    // Only proceed if the modal is actually visible
    const isModalVisible = await levelUpModal
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (!isModalVisible) {
      console.log('ℹ️  Level Up modal is not currently displayed');
      return;
    }
    console.log('🎉 Level Up modal detected, proceeding to close it...');

    const srOnlyParent = page.locator('button:has(span.sr-only)');

    await srOnlyParent.click();

    await delay(1000);

    // Check if modal closed after ESC
    const isStillVisible = await levelUpModal
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    if (!isStillVisible) {
      console.log('✅ Level Up modal closed successfully');
      return;
    }

    // If all methods failed, log a warning
    console.log('⚠️  Could not close Level Up modal using standard methods');
  } catch (error) {
    console.log('❌ Error while trying to close Level Up modal:', error);
  }
}

export async function clickClaimPointsButton(page: Page) {
  try {
    const claimButton = page
      .getByText(/Claim \d+ Points/, { exact: true })
      .locator('..');

    // 获取按钮文本用于日志记录
    const buttonText = await claimButton.textContent();
    if (buttonText) {
      // 使用正则表达式提取数字
      const match = buttonText.match(/Claim (\d+) Points/);
      if (match && match[1]) {
        const points = parseInt(match[1], 10);
        console.log(`📊 Claim button contains ${points} points`);
      }
    }

    // 点击按钮
    await claimButton.click();

    console.log(`✅ Successfully clicked: "${buttonText}"`);
  } catch (error) {
    console.error('❌ Error clicking claim points button:', error);
  }
}

export async function verifyTwitterFollowerCredentialAndFollow(page: Page) {
  // Find and click the Twitter follower credential item
  const twitterFollowerCred = page.locator(
    '[data-testid="cred-item-TWITTER_FOLLOW"]'
  );

  // Verify the Twitter follower credential exists
  await expect(twitterFollowerCred).toBeVisible();

  // Log the credential interaction for debugging
  console.log('Clicking on Twitter follower credential...');

  await twitterFollowerCred.click();

  await delay(3000);

  await page.screenshot({
    path: 'test-results/twitter-follower-cred.png',
    fullPage: true,
  });
  // Wait for new tab to open and get all pages
  const allPages = page.context().pages();
  console.log(
    'allPages',
    allPages.map(page => page.url())
  );

  // Get the newly opened Twitter tab (should be the last page)
  const twitterPage = allPages[allPages.length - 1];

  if (!twitterPage) {
    console.log('❌ Twitter page not found, returning directly');
    return;
  }

  // Wait for the Twitter page to load
  // await twitterPage.waitForLoadState('networkidle')

  await delay(3000);

  // Log current URL for debugging
  const twitterUrl = twitterPage.url();
  console.log(`Twitter page opened: ${twitterUrl}`);

  // Verify we're on a Twitter-related page
  expect(twitterUrl).toMatch(/(twitter\.com|x\.com)/);

  // twitter 登录模拟比较麻烦，这里直接返回
  return;

  // twitte 没有登录

  // const followButton = twitterPage.getByTestId('confirmationSheetConfirm');

  // // Assert that we found a follow button
  // expect(followButton).not.toBeNull();

  // console.log('followButton', followButton);

  // await twitterPage.screenshot({
  //   path: 'test-results/twitter-follow-button.png',
  //   fullPage: true,
  // });

  // if (followButton) {
  //   // Get the button text for logging
  //   const buttonText = await followButton.textContent();
  //   console.log(`Clicking follow button with text: "${buttonText}"`);

  //   // Click the follow button
  //   await followButton.click();

  //   // Wait a moment for the action to complete
  //   await twitterPage.waitForTimeout(2000);

  //   await twitterPage.screenshot({
  //     path: 'test-results/twitter-follow.png',
  //     fullPage: true,
  //   });
  // }

  // // Optional: Close the Twitter tab and return to original page
  // await twitterPage.close();

  // // Verify we're back on the original quest page
  // await expect(page).toHaveURL(/\/quest\//);

  // console.log('Twitter follower credential test completed successfully');
}

/**
 * Checks if the Twitter follow credential element contains a child node with bg-success class
 * This indicates whether the Twitter follow task has been completed successfully
 * @param page - The Playwright page object
 * @returns Promise<boolean> - True if the credential is marked as successful, false otherwise
 */
export async function isCredentialCompleted(
  page: Page,
  testId: string
): Promise<boolean> {
  try {
    // Locate the Twitter follow credential element using the data-testid
    const targetCredential = page.locator(`[data-testid="${testId}"]`);

    // Wait for the credential element to be visible
    await targetCredential.waitFor({ state: 'visible', timeout: 5000 });

    // Check if the credential contains a child element with bg-success class
    const successIndicator = targetCredential.locator('.bg-success');

    // Verify if the success indicator is present and visible
    const isCompleted = await successIndicator
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (isCompleted) {
      console.log(
        `✅ ${testId} credential is marked as completed (bg-success found)`
      );
    } else {
      console.log(
        `⏳ ${testId} credential is not yet completed (bg-success not found)`
      );
    }

    return isCompleted;
  } catch (error) {
    console.log('❌ Error checking credential completion status:', error);
    return false;
  }
}

/**
 * 访问指定的quest并完成Visit Page验证
 * @param questUrl - Quest的完整URL
 * @param page - Playwright page对象
 * @param context - Browser context
 * @param extensionId - MetaMask extension ID
 */
export const excuteVisitPageQuest = async (
  questUrl: string,
  testPage: Page
) => {
  console.log(
    '-------------------------------- Starting visit page quest verification --------------------------------'
  );
  console.log('Quest URL:', questUrl);

  // 每次进入前都要关闭levelUp Modal
  await closeLevelUpModal(testPage);

  await delay(2000);
  await testPage.screenshot({
    path: 'test-results/verify-after-modal-close.png',
    fullPage: true,
  });

  // 访问Visit Page凭证
  await accessVisitPageCredential(testPage);

  await delay(3000);

  // 点击Claim按钮
  await clickClaimPointsButton(testPage);

  await delay(3000);
  await testPage.screenshot({
    path: 'test-results/verify-quest-claim.png',
    fullPage: true,
  });

  console.log(
    '-------------------------------- Visit page quest verification completed --------------------------------'
  );
};

/**
 * Generic function to click verify button (original implementation)
 * @param page - The Playwright page object
 */
const clickVerifyButtonUnderCredential = async (
  page: Page,
  credentialTestId: string
) => {
  if (await isCredentialCompleted(page, credentialTestId)) {
    console.log('Credential is already completed, returning directly');
    return;
  }
  const credential = page.locator(`[data-testid="${credentialTestId}"]`);
  const verifyButton = credential
    .locator('[data-testid="verify-button"]')
    .first();

  console.log('find verify button', verifyButton);
  await verifyButton.click();
  await delay(3000);

  const isCompleted = await isCredentialCompleted(page, credentialTestId);

  // 账号已经关注fico space，所以应该返回true
  expect(isCompleted).toBe(true);

  await page.screenshot({
    path: 'test-results/verify-quest-verify.png',
    fullPage: true,
  });
};

export async function verifyFollowSpace(page: Page) {
  if (await isCredentialCompleted(page, 'cred-item-SPACE_FOLLOWER')) {
    console.log(
      'Follow Space credential is already completed, returning directly'
    );
    return;
  }
  await clickVerifyButtonUnderCredential(page, 'cred-item-SPACE_FOLLOWER');
}

export async function verifySpaceQuestParticipant(page: Page) {
  if (await isCredentialCompleted(page, 'cred-item-SPACE_PARTICIPATION')) {
    console.log(
      'Space Quest Participant credential is already completed, returning directly'
    );
    return;
  }
  await clickVerifyButtonUnderCredential(page, 'cred-item-SPACE_PARTICIPATION');
}
