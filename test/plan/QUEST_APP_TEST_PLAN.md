# Quest App 模块功能划分与测试计划

## 1. 文档目标
- 为 `apps/web` 的 Quest App 模块建立可执行的测试边界与优先级。
- 输出可直接用于 Playwright 生成的测试清单，重点覆盖 `verify/claim` 关键链路。

## 2. 范围定义

### 2.1 In Scope（本次）
- Quest 详情页主链路：`/quest/[space]/[questId]`
- Credential 展示与验证（Verify）
- Claim 区域按钮状态、领取前置校验、领取结果反馈（Claim）
- 与领取直接相关的弹窗/提示（登录、锁定、Required Info、User Agreement）

### 2.2 Out of Scope（建议后续）
- 外部 OAuth 平台真实授权流程（X/Discord 实网授权）
- 链上真实交易签名与链上确认（EVM/Solana/Sui 实网）
- 第三方服务 SLA（钱包插件、浏览器扩展）

## 3. 代码模块划分（按职责）

### M1 路由与服务端初始化
- 入口页：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/page.tsx`
- 职责：
  - SSR 拉取 `QUEST_BASIC_INFO`
  - 根据 quest 类型分流（普通 quest / parent collection）
  - space inactive 与 notFound 容错

### M2 Quest 参数与数据刷新总线
- 参数聚合：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/hooks/useQuestParams.ts`
- 职责：
  - 聚合 basic/cred/claim 三类 quest 数据
  - 暴露 `refetchCredAndClaimSection`，作为 verify 后刷新主入口

### M3 Credential 列表与交互壳层
- 列表容器：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/cred/QuestCredWrapper.tsx`
- 单项：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/cred/QuestCredItem.tsx`
- 职责：
  - 渲染任务组、参与条件、奖励条件
  - 单 credential 展开、引导去做任务、展示验证入口
  - 关键选择器：`data-testid="cred-item-<credSource>"`

### M4 Verify 核心逻辑
- 入口组件：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/cred/VerifyButton.tsx`
- 支撑 hook：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/hooks/useVerifyCred.ts`
- 职责：
  - 登录检查、社媒 OAuth 检查、multi-dimension 校验
  - 调用 `syncCredentialValue` / `syncEvaluateCred`
  - 失败态提示 + countdown + 重试
  - 关键选择器：`data-testid="verify-button"`

### M5 Claim 区域承载层
- Claim 区域：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/ClaimSection/ClaimSection.tsx`
- Button 入口：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/ClaimSection/ClaimButton/index.tsx`
- 职责：
  - 固定底部 claim bar 渲染
  - 单奖励/多奖励按钮分支
  - claim all tip 与支付提示入口

### M6 Claim 前置校验与执行
- 前置封装：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/ClaimSection/ClaimButton/PreCheck.tsx`
- 业务执行：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/ClaimSection/hooks/useQuestDetailClaim.ts`
- 锁定状态：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/web/src/app/(app)/quest/[space]/[questId]/components/ClaimSection/hooks/useCampaignIsLocked.ts`
- 职责：
  - 未登录 -> Log in
  - 顺序任务锁定 / private 连锁限制
  - 主地址校验、地址绑定校验、required info + user agreement 校验
  - 发起 claim 并刷新数据

## 4. 风险优先级
- P0：影响“能否完成验证/领取”的阻断项。
- P1：高频关键路径与高概率异常分支。
- P2：提示文案、样式、非阻断容错。

## 5. 分层测试策略
- E2E（Playwright）：覆盖用户视角流程与跨模块联动（主战场）。
- Integration/Hook：覆盖 `useQuestDetailClaim`、`useCampaignIsLocked` 业务分支。
- Unit：纯函数映射与文案生成逻辑。

## 6. 详细测试计划（模块维度）

### T1 路由与初始化（P0/P1）
1. 访问有效 questId，页面渲染 QuestInfo/CredList/ClaimSection。
2. 无效 questId，进入 not found。
3. space inactive，显示 inactive quest 信息而非可领取流程。
4. parent campaign 渲染 collection 页面，不进入普通 claim bar。

### T2 Credential 展示与交互（P0/P1）
1. `cred-item-<source>` 列表渲染正确。
2. 未登录点击 credential 展开触发登录弹窗。
3. 登录后点击 credential 可展开详情。
4. 任务结束/credential 参与结束时，不再可继续 verify。

### T3 Verify 流程（P0/P1）
1. verify 按钮可见性与 eligibility 联动。
2. verify 成功后出现 success 状态（对勾/成功态）并刷新 claim 区域数据。
3. verify 失败出现提示并进入 countdown，倒计时结束可重试。
4. multi-dimension credential 走 `syncEvaluateCred` 分支。
5. 世界币（Worldcoin）走专用 verify 按钮分支。

### T4 Claim 前置校验与执行（P0）
1. 未登录 claim 显示 `Log in`。
2. locked quest 显示锁按钮并有提示文案。
3. 未绑定对应链地址时弹绑定提示（ParticipantDialog）。
4. requiredInfo 未满足时弹 `ClaimRequiredModal`。
5. requiredInfo / userAgreement 需显式同意后才能 claim。
6. claim 成功后刷新 claim 与 cred 数据，按钮状态变化。

### T5 多奖励与引导（P1）
1. 多奖励场景显示 multi reward 入口。
2. FCFS 多组奖励展示 claim-all 节省 gas 提示，可关闭。
3. 移动端点击多奖励走 drawer，桌面端走 popover。

## 7. Verify/Claim 核心测试用例（至少 10 条）

说明：以下以 E2E 表达，编号可直接映射 `*.spec.ts`。

1. `VC-001`（P0）未登录用户点击 claim
- 前置：未登录。
- 步骤：打开 quest 详情页，点击 claim 区域主按钮。
- 断言：按钮文本为 `Log in`，点击后弹登录弹窗。

2. `VC-002`（P0）未登录用户点击 credential 项
- 前置：未登录。
- 步骤：点击任一 `data-testid^="cred-item-"`。
- 断言：触发登录弹窗，不执行 verify。

3. `VC-003`（P0）已登录用户 verify 成功后状态更新
- 前置：登录态、准备一条可快速通过的 credential。
- 步骤：展开 credential，点击 `data-testid="verify-button"` 的 refresh 图标。
- 断言：任务项进入 eligible 成功态，Claim 区域文案/禁用态发生预期变化。

4. `VC-004`（P0）verify 失败进入倒计时并允许重试
- 前置：登录态、构造一个可失败的 credential 条件。
- 步骤：执行 verify -> 失败。
- 断言：出现失败提示与 `Xs` 倒计时；倒计时结束后刷新图标恢复可点击。

5. `VC-005`（P0）multi-dimension credential 验证分支
- 前置：登录态、quest 包含 multi-dimension 任务。
- 步骤：点击该 credential 的 verify。
- 断言：验证后 UI 可见 eligible 变化；失败时同样进入倒计时机制。

6. `VC-006`（P0）claim 前 requiredInfo 未满足拦截
- 前置：登录态，quest 配置了 collect info，账号缺少至少一个 required 字段。
- 步骤：点击 claim。
- 断言：弹 `ClaimRequiredModal`，claim 未发起。

7. `VC-007`（P0）claim 前 user agreement 拦截与放行
- 前置：登录态，quest 配置 user agreement。
- 步骤：点击 claim，在协议弹窗先点取消，再次点击并同意。
- 断言：取消时 claim 不执行；同意后 claim 流程继续。

8. `VC-008`（P0）顺序任务锁定状态
- 前置：登录态，处于 collection sequential 子任务且前序未完成。
- 步骤：进入 claim 区域。
- 断言：显示锁定按钮（不可点击 claim），tooltip 文案提示需先完成前序任务。

9. `VC-009`（P0）claim 成功后结果反馈
- 前置：登录态、所有任务 verified、奖励库存足够。
- 步骤：点击 claim 完成领取。
- 断言：显示 claim 成功反馈（含成功文案/结果弹层之一），self claimed 数值增加。

10. `VC-010`（P1）多奖励 quest 的 claim-all 入口
- 前置：登录态、quest 同时有主奖励和 extra point。
- 步骤：点击 claim 按钮。
- 断言：显示多奖励入口（popover 或 drawer）；可看到奖励分组并可发起分组领取。

11. `VC-011`（P1）FCFS 多组奖励提示可关闭
- 前置：登录态、FCFS + 多奖励组。
- 步骤：进入 claim 区域观察 Tips，点击关闭按钮。
- 断言：提示关闭后当前会话不再显示。

12. `VC-012`（P1）地址绑定前置校验
- 前置：登录态、onchain reward quest、账号未绑定对应链地址。
- 步骤：点击 claim。
- 断言：弹出绑定地址引导（ParticipantDialog），claim 被中断。

## 8. Playwright 落地建议

### 8.1 文件拆分
- `apps/web/tests/e2e/quest-detail.bootstrap.spec.ts`：路由初始化、基础渲染
- `apps/web/tests/e2e/quest-detail.verify.spec.ts`：VC-002~VC-005
- `apps/web/tests/e2e/quest-detail.claim.spec.ts`：VC-001、VC-006~VC-012

### 8.2 选择器优先级
1. `data-testid`：
- `cred-item-<credSource>`
- `verify-button`
2. 按钮文本：`Log in`、`Claim`、`Release`（按页面实际）
3. 兜底：可见文案和 tooltip 关键字

### 8.3 环境与数据建议
- 账号集至少三套：
  - A：基础完整绑定，适合成功路径
  - B：缺失 requiredInfo 字段
  - C：未绑定目标链地址
- quest 数据至少三类：
  - Q1：快速可 verify + claim 的 FCFS quest
  - Q2：multi-dimension credential quest
  - Q3：sequential collection 子任务 quest

## 9. 验收标准
- P0 用例通过率 100%，且可重复执行。
- Verify 成功 -> Claim 可用 的联动稳定，无随机失败。
- 关键拦截（登录、锁定、required info、协议）均有明确可见反馈。

## 10. 当前 Playwright 用例落地清单（代码事实）

### 10.1 详情页主流程（`apps/tests/test/playwright/apps/*`）
- `quest-detail.bootstrap.spec.ts`
  - `T1-001` 有效 quest 渲染 credential 列表和 claim 主按钮。
  - `T1-002` 无效 questId 返回 404。
  - `T1-003` inactive space 展示 in-active 提示（依赖 `PW_QUEST_INACTIVE_ID`，缺失则 `skip`）。
  - `T1-004` parent collection 不渲染 verify/credential 列表（依赖 `PW_QUEST_PARENT_COLLECTION_ID`，缺失则 `skip`）。
- `quest-detail.verify.spec.ts`
  - `VC-002` 未登录点 credential 拉起登录弹窗。
  - `VC-003` 已登录 verify 成功后 credential 成功态 + claim 区域可见。
  - `VC-004` verify 失败出现 `Verification failed.` + 倒计时结束后可重试。
  - `VC-005` multi-dimension credential 验证分支（轮询 success/failed 任一结果）。
- `quest-detail.claim.spec.ts`
  - `VC-001` 未登录 claim 显示 `Log in` 并拉起登录弹窗。
  - `VC-006` requiredInfo 未满足时拦截，展示 `Connect Account` 提示。
  - `VC-007` agreement 先取消再同意，验证拦截与放行。
  - `VC-008` sequential quest 锁定图标 + tooltip 文案。
  - `VC-009` claim 成功反馈文案（含 `Claimed successfully!` 等）。
  - `VC-010` 多奖励 quest 显示 claim-all 省 gas 提示。
  - `VC-011` FCFS 多奖励提示可关闭。
  - `VC-012` 地址未绑定弹 ParticipantDialog（`Go Now`）。

### 10.2 登录与基础夹具用例（`apps/tests/test/playwright/login/*`）
- `app-login.spec.ts`
  - `test.skip('app login')`：真实登录后点击头像并截图，当前默认跳过，用于人工排障。
- `app-mock-login.spec.ts`
  - `check browser version`：mock 登录并截图，作为基础通路/环境可用性检查。

### 10.3 与文档计划的差异说明
- `VC-003` 断言以 UI 结果为主（`.bg-success` + claim 主按钮可见），未直接断言接口级数据刷新。
- `VC-004` 已覆盖“失败+倒计时+重试点击”，未断言第二次重试的最终业务结果。
- 文档中提及的 `Worldcoin` 专用 verify 分支（原 T3-5）当前未在 `apps/*` 自动化用例中落地，建议新增独立 `VC-013`。

### 10.4 运行依赖（环境变量）
- Quest 基础：`PW_QUEST_APP_DOMAIN`、`PW_QUEST_SPACE_ALIAS`、`PW_QUEST_VALID_ID`。
- Bootstrap/Verify/Claim 分支：
  - `PW_QUEST_INACTIVE_ID`
  - `PW_QUEST_PARENT_COLLECTION_ID`
  - `PW_QUEST_VERIFY_SUCCESS_ID`
  - `PW_QUEST_VERIFY_FAILED_ID`
  - `PW_QUEST_VERIFY_MULTI_DIMENSION_ID`
  - `PW_VERIFY_FAILED_CRED_TEST_ID`
  - `PW_VERIFY_MULTI_DIMENSION_CRED_TEST_ID`
  - `PW_QUEST_CLAIM_REQUIRED_INFO_ID`
  - `PW_QUEST_CLAIM_AGREEMENT_ID`
  - `PW_QUEST_CLAIM_LOCKED_ID`
  - `PW_QUEST_CLAIM_SUCCESS_ID`
  - `PW_QUEST_CLAIM_MULTI_REWARD_ID`
  - `PW_QUEST_CLAIM_BIND_ADDRESS_ID`

## 11. 覆盖率表（计划 vs 当前自动化）

| 模块 | 计划用例数 | 已实现 | Skip/占位 | 未实现 | 覆盖率 |
| --- | ---: | ---: | ---: | ---: | ---: |
| T1 路由与初始化 | 4 | 4 | 2 | 0 | 100% |
| T2 Credential 展示与交互 | 4 | 1 | 0 | 3 | 25% |
| T3 Verify 流程 | 5 | 3 | 3 | 2 | 60% |
| T4 Claim 前置校验与执行 | 6 | 6 | 6 | 0 | 100% |
| T5 多奖励与引导 | 3 | 2 | 0 | 1 | 66.7% |
| 汇总 | 22 | 16 | 11 | 6 | 72.7% |

说明：
- 覆盖率按“有自动化用例实现（含运行时依赖数据导致可能 skip）/计划用例总数”计算。
- `Skip/占位` 为已写入 spec 但因环境变量缺失、账号数据状态或主动 `test.skip` 导致默认不执行的数量。
- T3 的“Worldcoin 专用 verify 分支”当前计入未实现；T2 仍以最小冒烟覆盖为主。
