# Biz Payment 替换测试计划（Daimo Pay -> Biz+ 自研支付）

## 1. 目标
- 基于 `openspec/changes/archive/2026-03-12-replace-daimo-pay-biz-payment/` 的 proposal/design/spec，输出可直接落地到 Playwright 的测试计划。
- 覆盖 Business+ 新支付主链路：Gas Station、Wallet、Gas Station & Wallet 组合支付，以及 Billing/Gas Station History 展示改造。
- 建立「需求编号（BP-REQ-*）」与「用例编号（BP-*）」可追踪映射。

## 2. 范围

### 2.1 In Scope
- Business 页面 Upgrade/Extend 支付确认弹窗（新 UpgradeModal）
- `registerSpacePaymentTask` 新入参/新返回处理
- 链上支付流程：allowance、approve、`GalxePaymentContract.pay()`、5 种 PaymentTaskStatus 轮询
- PayProcessModal 三步状态
- Billing 新列（Payment Method / TXID）
- Gas Station History 改名（Deposit History / Type）
- Expense Statement 新增 Type 列（Quest Subsidy / Business+ Subscription）
- Daimo Pay 相关流程移除验证

### 2.2 Out of Scope
- 第三方钱包插件稳定性与浏览器扩展兼容性
- 真实主网资金结算与链上最终性（由预发/灰度环境专项覆盖）
- Stripe Auto Renew 相关能力（该变更明确非目标）

## 3. 当前代码事实映射

### 3.1 需求到代码入口映射
- 支付确认弹窗：`apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx`
  - 已实现 Payment Method 选择（From Wallet / From Gas Station）、Activation Date、Service Agreement、余额不足提示。
  - 已调用新 mutation 字段 `businessPlusTaskViaNewPaymentMethod`，并处理 `success/failureReason`。
- 支付处理流程：`apps/dashboard/src/app/(app)/(space)/business/page.tsx`
  - 已实现 `newPaymentMethodPaymentData == null`（纯 Gas Station）直接轮询。
  - 已实现 `newPaymentMethodPaymentData != null` 走 `executePayment`，并串联 PayProcessModal。
  - 已实现 `SPACE_PAYMENT_TASK_INFO` 1 秒轮询，`Success/Failed` 终态分支。
- 合约交互：`apps/dashboard/src/app/(app)/(space)/business/components/usePaymentContract.ts`
  - 已实现 allowance 检查、approve、Ethereum USDT `approve(0)->approve(amount)` 特殊路径。
  - 已实现原生币分支（`tokenAddress=0x0`，`value=amount`）与自动切链。
- PayProcessModal：`apps/dashboard/src/app/(app)/(space)/business/components/PayProcessModal.tsx`
  - 已实现 `confirming/processing/success` 三步配置。
- Billing 展示：`apps/dashboard/src/app/(app)/(space)/settings/components/billing/index.tsx`
  - 已实现 Payment Method 和 TXID 展示逻辑（含 tx/txid 兼容回退）。
  - 仍保留 `BusinessPaymentMethod.DaimoPay -> 'Daimo Pay'` 分支，需作为回归检查点。
- Gas Station History：
  - Tab 改名已生效：`apps/dashboard/src/app/(app)/(space)/gasStation/history/index.tsx`
  - Payment 列改为 Type=Deposit：`apps/dashboard/src/app/(app)/(space)/gasStation/history/components/payment.tsx`
- Expense Statement：`apps/dashboard/src/app/(app)/(space)/gasStation/history/components/expense.tsx`
  - 已实现 Type 列和 `Business+ Subscription` 行显示规则。
- GraphQL 定义：
  - Mutation：`packages/graphql/modules/dashboard/mutations/Space/RegisterSpacePaymentTask.ts`
  - Billing Query：`packages/graphql/modules/dashboard/queries/space/BusinessSubscriptionHistory.ts`

### 3.2 自动化代码事实（Playwright）
- 当前 `apps/tests/test/playwright/` 下无 Business Payment/Billing/Gas Station History 专项 spec。
- 仅在 `quest-create.reward.spec.ts` 有 Gas Station 开关相关断言，无法覆盖本次 Biz+ 支付改造。

## 4. 风险优先级
- P0：支付成功与失败主链路（会直接阻断升级/续费）。
- P0：余额不足拦截、Service Agreement 拦截、轮询终态处理。
- P1：Ethereum USDT approve 特殊逻辑、Gravity 原生币路径、组合支付拆分金额。
- P1：Billing/Gas Station/Expense 三处展示一致性与可追溯性（支付方式、TXID、Type）。
- P2：文案、tooltip、样式和非阻断提示。

## 5. 编号规则
- 需求编号：`BP-REQ-01` ~ `BP-REQ-14`
- 用例编号：`BP-001` 起
- Playwright 标题规范建议：`BP-001 [P0] xxx`

## 6. 需求映射矩阵（当前代码事实）

| 需求编号 | OpenSpec requirement | 计划用例 | 自动化现状 |
|---|---|---:|---|
| BP-REQ-01 | 支付确认弹窗展示 | 4 | 未实现 |
| BP-REQ-02 | 支付方式选择 - Wallet | 3 | 未实现 |
| BP-REQ-03 | 支付方式选择 - Gas Station | 3 | 未实现 |
| BP-REQ-04 | 支付方式选择 - 组合支付 | 4 | 未实现 |
| BP-REQ-05 | Service Agreement 验证 | 2 | 未实现 |
| BP-REQ-06 | 注册支付任务 mutation | 3 | 未实现 |
| BP-REQ-07 | ERC-20 approve + 合约调用 | 4 | 未实现 |
| BP-REQ-08 | 三步 Processing 状态 | 2 | 未实现 |
| BP-REQ-09 | 支付状态轮询 | 2 | 未实现 |
| BP-REQ-10 | Billing 页面展示扩展 | 2 | 未实现 |
| BP-REQ-11 | Gas Station History 改名 | 1 | 未实现 |
| BP-REQ-12 | Expense Statement Type 列 | 2 | 未实现 |
| BP-REQ-13 | 移除 Daimo Pay 流程 | 2 | 未实现 |
| BP-REQ-14 | 链/币种支持矩阵（5 链） | 3 | 未实现 |

## 7. 详细测试用例（按优先级）

### 7.1 P0 核心链路
1. `BP-001`（P0）打开 UpgradeModal 基础信息渲染
- 前置：Business 页面可见 Upgrade 或 Extend。
- 步骤：点击 Upgrade/Extend。
- 断言：展示 Subscription Type、Payment Amount、Payment Method、You pay、Service Agreement、Confirm。

2. `BP-002`（P0）Activation Date 必填（非 grace period）
- 步骤：不选日期直接尝试 Confirm。
- 断言：Confirm disabled；选择日期后可继续校验。

3. `BP-003`（P0）仅 Wallet 且余额充足可支付
- 前置：钱包余额覆盖支付金额。
- 步骤：选 Wallet + token。
- 断言：You pay 显示金额与币种近似值，Confirm 可点击。

4. `BP-004`（P0）仅 Wallet 余额不足拦截
- 前置：钱包余额不足。
- 步骤：选 Wallet + token。
- 断言：显示 `Insufficient Balance`，Confirm disabled。

5. `BP-005`（P0）Gas Station 余额为 0 时禁用
- 前置：SpaceBalance=0。
- 步骤：打开弹窗。
- 断言：From Gas Station 为禁用态。

6. `BP-006`（P0）仅 Gas Station 且余额不足拦截
- 前置：0 < Gas Station < 支付金额。
- 步骤：只选 Gas Station。
- 断言：显示不足提示，Confirm disabled。

7. `BP-007`（P0）组合支付金额拆分
- 前置：Gas Station 与 Wallet 合计足够。
- 步骤：同时勾选 Wallet + Gas Station。
- 断言：You pay breakdown 显示 Wallet 与 Gas Station 两段金额。

8. `BP-008`（P0）Service Agreement 未勾选不可确认
- 步骤：完成支付方式选择但不勾选协议。
- 断言：Confirm disabled；勾选后进入可点击态（其余前置满足）。

9. `BP-009`（P0）`success=false` 错误处理
- mock：`registerSpacePaymentTask.success=false` + `failureReason`。
- 断言：出现 error toast，不弹出 PayProcessModal，不进入轮询。

10. `BP-010`（P0）纯 Gas Station 支付直连轮询成功
- mock：`newPaymentMethodPaymentData=null`，轮询最终 `Success`。
- 断言：PayProcessModal 显示 Processing -> Success，成功弹窗出现。

11. `BP-011`（P0）Wallet/组合支付三步状态
- mock：返回 `newPaymentMethodPaymentData`。
- 断言：`Waiting for Confirmation` -> `Processing Payment` -> 成功反馈。

12. `BP-012`（P0）轮询失败终态
- mock：`spacePaymentTaskInfo=Failed`。
- 断言：停止轮询，关闭 processing，展示 PayFailModal。

### 7.2 P1 高价值分支
13. `BP-013`（P1）Allowance 足够跳过 approve
- mock：allowance >= amount。
- 断言：直接调用 `pay()`，无 approve 交易。

14. `BP-014`（P1）Allowance 不足先 approve 再 pay
- mock：allowance < amount。
- 断言：先执行 approve，再执行 `pay()`。

15. `BP-015`（P1）Ethereum USDT 特殊 approve 路径
- 前置：Ethereum + USDT，且 0 < allowance < amount。
- 断言：调用顺序为 `approve(0)` -> `approve(amount)` -> `pay()`。

16. `BP-016`（P1）Gravity G 原生币路径
- 前置：Gravity + G。
- 断言：跳过 ERC-20 allowance/approve，`pay()` 带 `value=amount`。

17. `BP-017`（P1）自动切链
- 前置：钱包当前链与支付链不一致。
- 断言：先触发切链，再进入 approve/pay。

18. `BP-018`（P1）用户拒签/交易失败后任务取消
- mock：approve 或 pay 抛错。
- 断言：展示 Payment Failed，触发 `cancelSpacePaymentTask` best-effort。

19. `BP-019`（P1）Billing Payment Method 显示映射
- 前置：历史数据包含 GasStation/Token/GasStationAndToken。
- 断言：分别显示 `Gas Station` / `Wallet` / `Gas Station & Wallet`。

20. `BP-020`（P1）Billing TXID 显示与跳转
- 前置：分别给 `txid`、仅 `tx` 两类数据。
- 断言：短链显示 + 点击跳 explorer；空值显示 `--`。

21. `BP-021`（P1）Gas Station History 标签与 Type 列
- 断言：Tab 为 `Deposit History`，列表 Type 固定 `Deposit`。

22. `BP-022`（P1）Expense Statement Type 列渲染
- 断言：出现 Type 列，存在 `Quest Subsidy` 与 `Business+ Subscription` 两类行。

23. `BP-023`（P1）Business+ Subscription 行占位规则
- 断言：Time/Amount/Network 以外列显示 `-`。

24. `BP-024`（P1）组合支付中 Gas Station 足额场景
- 前置：Gas Station >= total。
- 断言：Gas Station 扣满 total，Wallet 金额为 0。

### 7.3 P2 回归与清理
25. `BP-025`（P2）Daimo Pay 跳转流程不可达
- 断言：Upgrade 支付不再出现 `paymentUrl` 跳转行为。

26. `BP-026`（P2）Daimo Pay 文案清理回归
- 断言：Business+/Billing 关键用户路径不出现 `Daimo Pay` 文案。

27. `BP-027`（P2）Activation Date tooltip 文案可见
- 断言：hover 信息提示符合 spec 描述。

28. `BP-028`（P2）余额不足文案准确性
- 断言：Wallet 不足和 Gas Station 不足文案分别正确。

29. `BP-029`（P2）支付处理中防误操作提示
- 断言：Waiting/Processing 两步均包含请勿刷新/关闭提示。

30. `BP-030`（P2）支付后页面数据刷新
- 断言：成功后 Business plan 状态与 Billing 历史更新。

## 8. 覆盖率表（计划 vs 当前自动化）

| 维度 | 计划用例数 | 已实现 | Skip | 未实现 | 覆盖率 |
|---|---:|---:|---:|---:|---:|
| P0 | 12 | 0 | 0 | 12 | 0% |
| P1 | 12 | 0 | 0 | 12 | 0% |
| P2 | 6 | 0 | 0 | 6 | 0% |
| 总计 | 30 | 0 | 0 | 30 | 0% |

## 9. 自动化落地建议（Playwright）
- 文件拆分建议：
  - `apps/tests/test/playwright/dashboard/biz-payment.upgrade-modal.spec.ts`（BP-001~BP-009）
  - `apps/tests/test/playwright/dashboard/biz-payment.contract.spec.ts`（BP-010~BP-018）
  - `apps/tests/test/playwright/dashboard/biz-payment.billing-history.spec.ts`（BP-019~BP-023）
  - `apps/tests/test/playwright/dashboard/biz-payment.regression.spec.ts`（BP-024~BP-030）
- 选择器优先级：`data-testid` > `role/name` > 文案（目前业务页面 data-testid 较少，建议补充）。
- helper 复用建议：优先复用 `apps/tests/test/playwright/utils/actions.ts`、`apps/tests/test/playwright/utils/config.ts`；支付流程可新增 `utils/biz-payment.ts` 统一 mock 与钱包交互封装。

## 10. 环境与数据依赖（含 skip 规则）
- 必要环境变量（建议）：
  - `APP_DOMAIN`
  - `PW_SPACE_ID_BIZ_PAYMENT`
  - `PW_BIZ_PLAN_TYPE`（Essential/Growth）
  - `PW_BIZ_PAYMENT_CYCLE`（Quarterly/Annually）
  - `PW_WALLET_EVM_ADDRESS`
- 依赖数据集：
  - S1：Gas Station=0
  - S2：Gas Station<price
  - S3：Gas Station>=price
  - S4：Wallet balance 足额
  - S5：Wallet balance 不足
  - S6：历史账单含三种 paymentMethod + tx/txid 组合
- `skip` 约定：
  - 链上真实交易场景（BP-013~BP-018）若无稳定测试钱包与测试 RPC，默认 `test.skip` 并在标题注明 `env-dependent`。
  - 若 `PW_SPACE_ID_BIZ_PAYMENT` 缺失，整组 Biz Payment spec 应统一 `skip`，避免误报失败。

## 11. 缺口清单（当前）
- 缺口 1：无任何 Biz Payment 专项 Playwright 用例（P0/P1 全缺失）。
- 缺口 2：关键流程 data-testid 覆盖不足（UpgradeModal、PayProcessModal、Billing 卡片列）。
- 缺口 3：链上路径依赖钱包与 RPC，需独立准备稳定测试夹具与 mock 策略。
- 缺口 4：`Daimo Pay` 文案分支仍存在于 Billing 映射逻辑，需明确是否保留历史兼容。
