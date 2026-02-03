# 测试用例创建约定 (AGRNTS - Agreements)

本文档定义了在项目中创建测试用例的规则和约定。

## 测试文件位置规则

### Dashboard 测试用例

**当用户要求创建 dashboard 相关的测试用例时：**

- **文件位置**：`test/playwright/dashboard/`
- **文件命名**：使用 kebab-case，以 `.spec.ts` 结尾
- **示例**：
  - `quest-create.spec.ts`
  - `quest-creat-multi.spec.ts`
  - `quest-creat-OAT.spec.ts`
  - `quest-creat-NFT.spec.ts`

### App 测试用例

**当用户要求创建 app 相关的测试用例时：**

- **文件位置**：`test/playwright/app/`
- **文件命名**：使用 kebab-case，以 `.spec.ts` 结尾
- **示例**：
  - `app-login.spec.ts`
  - `app-mock-login.spec.ts`

## 测试文件模板

### Dashboard 测试文件模板

```typescript
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { delay, nextStep } from '../utils/actions';
// Step 1: 基本信息设置
import { setStep1 } from '../utils/step1';
// Step 2: 奖励设置（根据测试需求选择）
import { setRewardTypeOatUseTemplateBnbChainMintingCap12 } from '../utils/step2';
// Step 3: 任务/凭证设置（根据测试需求选择）
import { createXFollowedByCredential } from '../utils/step3';

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"
// const domain = "https://dashboard.galxe.com"

test('测试用例描述', async ({ context, page, extensionId }) => {
  // 1. 登录和导航
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`)
  await delay(3000)
  
  // 2. Step 1: 设置基本信息
  await setStep1(testPage)
  await delay(3000)
  
  // 3. 进入下一步
  await nextStep(testPage)
  
  // 4. Step 2: 设置奖励类型
  await setRewardTypeOatUseTemplateBnbChainMintingCap12(testPage)
  
  // 5. 进入下一步（如果需要）
  await nextStep(testPage)
  
  // 6. Step 3: 设置任务/凭证
  await createXFollowedByCredential(testPage)
  
  // 7. 截图（可选）
  await testPage.screenshot({ path: 'test-results/test-result.png', fullPage: true });
})
```

### App 测试文件模板

```typescript
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

test('测试用例描述', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin('https://app.galxe.com', context, page, extensionId)
  
  // 测试步骤
  await delay(3000)
  // ... 其他测试代码
})
```

## 测试用例三步骤结构

**重要：所有 Dashboard 测试用例都包含三个步骤，需要从对应的工具文件中导入函数并组合使用。**

### 三步骤说明

1. **Step 1 - 基本信息设置** (`test/playwright/utils/step1.ts`)
   - 设置 quest 的基本信息（标题、日期范围等）
   - 主要函数：`setStep1`

2. **Step 2 - 奖励设置** (`test/playwright/utils/step2.ts`)
   - 设置奖励类型和配置（OAT、NFT、Points 等）
   - 主要函数：
     - `setRewardTypeOatUseTemplateBnbChainMintingCap12` - 设置 OAT 奖励
     - `setRewardTypeNftUploadMediaNameContractCap12` - 设置 NFT 奖励
     - 其他奖励类型函数

3. **Step 3 - 任务/凭证设置** (`test/playwright/utils/step3.ts`)
   - 设置任务和凭证（Credential）
   - 主要函数：
     - `createXFollowerCredential` - 创建 X Follower 凭证
     - `createXFollowedByCredential` - 创建 X Followed By 凭证
     - `createXLikeCredential` - 创建 X Like 凭证
     - `setMultiCredential` - 设置多维度凭证
     - `selectVerifyBeforeTasks` - 选择验证前置任务
     - `createVisitAPageCredential` - 创建访问页面凭证
     - 其他凭证创建函数

### 标准测试流程

每个测试用例应该按照以下顺序执行：

```typescript
// 1. 登录和导航
const testPage = await handleLogin(domain, context, page, extensionId)
await testPage.goto(`${domain}/quest/create?space=192`)
await delay(3000)

// 2. Step 1: 设置基本信息
await setStep1(testPage)
await delay(3000)

// 3. 进入下一步
await nextStep(testPage)

// 4. Step 2: 设置奖励类型（根据测试需求选择）
await setRewardTypeOatUseTemplateBnbChainMintingCap12(testPage)
// 或
await setRewardTypeNftUploadMediaNameContractCap12(testPage)

// 5. 进入下一步（如果需要）
await nextStep(testPage)

// 6. Step 3: 设置任务/凭证（根据测试需求选择）
await selectVerifyBeforeTasks(testPage)
await createXFollowedByCredential(testPage)
// 或
await setMultiCredential(testPage)

// 7. 发布（如果需要）
await release(testPage)
```

## 工具函数位置

### 通用工具函数

- **位置**：`test/playwright/utils/`
- **文件**：
  - `actions.ts` - 通用操作函数（如 `nextStep`, `release`, `delay`）
  - `step1.ts` - 第一步相关函数（如 `setStep1`）
  - `step2.ts` - 第二步相关函数（奖励设置）
  - `step3.ts` - 第三步相关函数（任务/凭证设置）

### 标准导入模式

在测试文件中，必须从三个步骤文件中分别导入函数并组合使用：

```typescript
// 通用操作
import { delay, nextStep, release } from '../utils/actions';

// Step 1: 基本信息设置
import { setStep1 } from '../utils/step1';

// Step 2: 奖励设置（根据测试需求选择）
import { setRewardTypeOatUseTemplateBnbChainMintingCap12 } from '../utils/step2';
// 或
import { setRewardTypeNftUploadMediaNameContractCap12 } from '../utils/step2';

// Step 3: 任务/凭证设置（根据测试需求选择）
import { createXFollowedByCredential } from '../utils/step3';
// 或
import { selectVerifyBeforeTasks, setMultiCredential } from '../utils/step3';
```

## 文件命名约定

1. **使用 kebab-case**：所有测试文件名使用小写字母和连字符
2. **描述性命名**：文件名应该清晰描述测试的内容
3. **统一后缀**：所有测试文件以 `.spec.ts` 结尾

### 命名示例

✅ **正确**：
- `quest-create.spec.ts`
- `quest-creat-multi.spec.ts`
- `app-login.spec.ts`
- `user-profile.spec.ts`

❌ **错误**：
- `questCreate.spec.ts` (应该使用 kebab-case)
- `quest-create.ts` (缺少 .spec)
- `QuestCreate.spec.ts` (不应该使用 PascalCase)

## 测试用例结构

### 基本结构

1. **导入依赖**
   - `testWithSynpress` 和 `metaMaskFixtures`
   - `basicSetup` 和 `handleLogin`
   - 工具函数

2. **初始化测试**
   - 使用 `testWithSynpress(metaMaskFixtures(basicSetup))`

3. **定义测试用例**
   - 使用 `test()` 函数
   - 测试描述应该清晰明确

4. **测试步骤**
   - 登录和导航
   - 执行测试操作
   - 验证结果
   - 截图（如需要）

## 注意事项

1. **必须使用三步骤结构**：所有 Dashboard 测试用例都必须包含三个步骤，分别从 `step1.ts`、`step2.ts`、`step3.ts` 导入函数并组合使用
2. **统一使用 `handleLogin`**：所有需要登录的测试都应该使用 `handleLogin` 函数
3. **使用工具函数**：避免在测试文件中重复编写相同的逻辑，使用 `utils/` 目录下的工具函数
4. **步骤顺序**：严格按照 Step 1 → Step 2 → Step 3 的顺序执行
5. **添加延迟**：在关键操作后添加适当的延迟，确保页面加载完成
6. **使用 `nextStep`**：在 Step 1 和 Step 2 之间、Step 2 和 Step 3 之间使用 `nextStep()` 函数进入下一步
7. **截图**：在关键步骤后添加截图，便于调试和验证
8. **注释**：为复杂的测试逻辑添加注释说明

## 示例：创建新的 Dashboard 测试

当用户说："创建一个 dashboard 测试用例，测试创建 quest 功能"

应该：
1. 在 `test/playwright/dashboard/` 目录下创建新文件
2. 文件名：`quest-create-new.spec.ts`（或根据具体功能命名）
3. 使用 Dashboard 测试文件模板
4. **必须从三个步骤文件中导入函数**：
   - 从 `step1.ts` 导入 Step 1 函数（通常是 `setStep1`）
   - 从 `step2.ts` 导入 Step 2 函数（根据奖励类型选择，如 OAT、NFT 等）
   - 从 `step3.ts` 导入 Step 3 函数（根据任务类型选择，如凭证创建等）
5. 按照标准流程组合使用三个步骤的函数
6. 编写测试逻辑

### 完整示例

```typescript
import { testWithSynpress } from '@synthetixio/synpress-core'
import { metaMaskFixtures } from '../../../src/playwright'
import basicSetup from '../wallet-setup/basic.setup'
import { handleLogin } from '../util';
import { delay, nextStep } from '../utils/actions';
// Step 1
import { setStep1 } from '../utils/step1';
// Step 2
import { setRewardTypeOatUseTemplateBnbChainMintingCap12 } from '../utils/step2';
// Step 3
import { createXFollowedByCredential } from '../utils/step3';

const test = testWithSynpress(metaMaskFixtures(basicSetup))

const domain = "https://galxe-web-dashboard-git-feat-likaiagent-e2e-galxe.vercel.app"

test('OAT reward with X Followed By', async ({ context, page, extensionId }) => {
  const testPage = await handleLogin(domain, context, page, extensionId)
  await testPage.goto(`${domain}/quest/create?space=192`)
  
  await delay(3000)
  
  // Step 1: 设置基本信息
  await setStep1(testPage)
  await delay(3000)
  
  // 进入下一步
  await nextStep(testPage)
  
  // Step 2: 设置奖励类型
  await setRewardTypeOatUseTemplateBnbChainMintingCap12(testPage)
  
  // 进入下一步
  await nextStep(testPage)
  
  // Step 3: 设置任务/凭证
  await createXFollowedByCredential(testPage)
  
  await testPage.screenshot({ path: 'test-results/result.png', fullPage: true });
})
```

## 示例：创建新的 App 测试

当用户说："创建一个 app 测试用例，测试用户登录功能"

应该：
1. 在 `test/playwright/app/` 目录下创建新文件
2. 文件名：`user-login.spec.ts`（或根据具体功能命名）
3. 使用 App 测试文件模板
4. 编写测试逻辑

## 可用的工具函数参考

### Step 1 函数 (`test/playwright/utils/step1.ts`)
- `setStep1` - 设置 quest 基本信息（标题、日期范围）

### Step 2 函数 (`test/playwright/utils/step2.ts`)
- `setRewardTypeOatUseTemplateBnbChainMintingCap12` - 设置 OAT 奖励（使用模板，BNB Chain，铸造上限 12）
- `setRewardTypeNftUploadMediaNameContractCap12` - 设置 NFT 奖励（上传媒体，名称，合约，铸造上限 12）

### Step 3 函数 (`test/playwright/utils/step3.ts`)
- `createXFollowerCredential` - 创建 X Follower 凭证
- `createXFollowedByCredential` - 创建 X Followed By 凭证
- `createXLikeCredential` - 创建 X Like 凭证
- `createXRetweetCredential` - 创建 X Retweet 凭证
- `createXQuoteTweetCredential` - 创建 X Quote Tweet 凭证
- `createXBullishAboutCredential` - 创建 X Bullish About 凭证
- `createXAccountRequirementCredential` - 创建 X Account Requirement 凭证
- `createXBlueCheckmarkAccountCredential` - 创建 X Blue Checkmark Account 凭证
- `setMultiCredential` - 设置多维度凭证
- `selectVerifyBeforeTasks` - 选择验证前置任务
- `createVisitAPageCredential` - 创建访问页面凭证
- `setTwoTaskGroups` - 设置两个任务组

### 通用操作函数 (`test/playwright/utils/actions.ts`)
- `delay` - 延迟函数
- `nextStep` - 进入下一步
- `release` - 发布 quest（包含 "Ignore and Release" 按钮判断逻辑）

## 更新日志

- 2024-XX-XX: 添加三步骤结构说明，明确测试用例必须从 step1.ts、step2.ts、step3.ts 分别导入函数并组合使用
- 2024-XX-XX: 初始版本，定义测试用例创建规则
