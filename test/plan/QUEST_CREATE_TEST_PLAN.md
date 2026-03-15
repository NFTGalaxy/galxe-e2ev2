# Quest Create 模块化测试计划

## 1. 目标与范围
入口：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/PageEnter.tsx`

本计划覆盖 Quest Create 完整链路：
- 页面初始化与编辑态回填
- 三步流程（Info / Rewards / Task Setting）
- Header 动作（Preview / Save Draft / Next Step / Release）
- 异常与权限关键分支

不在本轮范围：钱包签名交易、链上合约真实写入（建议集成环境单独覆盖）。

## 2. 关键代码模块映射
- 页面入口：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/PageEnter.tsx`
- 服务器跳转逻辑：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/page.tsx`
- Step 底部导航：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/BottomStep.tsx`
- Info：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/Info/*`
- Rewards：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/reward/*`
- Task Setting：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/taskSetting/*`
- Header 动作：
  - `/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/components/layout/header/Create.tsx`
  - `/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/components/layout/header/NextStep.tsx`
- 状态与副作用：
  - `/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/hooks.ts`
  - `/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/store.ts`
  - `/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/const.ts`
- 奖励发放方式：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/reward/RewardDistribution.tsx`
- Gas 配置：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/reward/GasTypeStation.tsx`
- 高级反女巫：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/taskSetting/AdvancedSybilPrevention.tsx`
- 提升可见度：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/taskSetting/BoostQuestVisibility.tsx`
- 多入口规则：`/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/dashboard/src/app/(app)/quest/create/components/taskSetting/MultiEntryRule.tsx`

## 3. 测试环境与数据前置
- 登录态：Admin 账号（默认 `space=1659`）。
- 非 Admin 账号：用于权限拒绝场景。
- 关键数据集：
  - `campaignId_draft`：草稿任务
  - `campaignId_active`：已发布任务
  - `campaignId_fastCreate`：`isFastCreate=true`
- 建议通过 GraphQL mock 固定以下查询/变更：
  - `CampaignIsQuickCreate`
  - `SPACE_DASHBOARD_BASIC`
  - `CAMPAIGN_INFO_FOR_EDIT`
  - `ContractsBySpace`
  - `TokenRewardContractList`
  - `CostMetadata`
  - `SpaceBalance`
  - `CreateCampaign`

## 4. 分层测试策略
- P0：发布阻断项（核心路径）。
- P1：高价值功能（规则组合、重要分支）。
- P2：边界与稳定性（容错、文案、提示、禁用状态）。

## 5. 模块化详细用例

### M0 初始化与路由守卫
1. `QC-M0-001`（P0）新建页加载成功
- 前置：已登录 Admin
- 步骤：访问 `/quest/create?space=1659`
- 断言：显示 `Quest Info`，默认 Step=1

2. `QC-M0-002`（P0）通过 `step` 参数进入指定步骤
- 步骤：访问 `?step=2/3`
- 断言：对应模块显示，其他模块隐藏

3. `QC-M0-003`（P0）`id` + `isFastCreate=true` 自动重定向
- 步骤：访问 `/quest/create?space=1659&id=<campaignId_fastCreate>`
- 断言：跳转 `/quick-create?space=1659&id=...`

4. `QC-M0-004`（P0）非 Admin 权限拦截
- 前置：非 Admin
- 步骤：访问创建页
- 断言：不可进入有效创建流程（根据上层 layout 展示无权限/重定向）

5. `QC-M0-005`（P1）初始化接口失败容错
- mock：`SpaceBalance` 失败
- 断言：出现错误 toast，不导致页面崩溃

### M1 Step 导航（Sidebar + BottomStep + Header Next Step）
1. `QC-M1-001`（P0）底部左右箭头切换步骤
- 断言：step 递增/递减正确，边界步骤不显示对应箭头

2. `QC-M1-002`（P0）Header `Next Step` 行为
- 步骤：Step1 点击 `Next Step`
- 断言：进入 Step2；Step3 显示 `Release`

3. `QC-M1-003`（P0）Step 未完成时 `Release` 按钮禁用
- 前置：必填项未填
- 断言：`Release` disabled

4. `QC-M1-004`（P1）Sidebar 锚点跳转可用
- 断言：Task Settings 内 anchors 能定位到对应区块

### M2 Info（Quest Info）
1. `QC-M2-001`（P0）Title 必填
- 步骤：不填标题尝试下一步/发布
- 断言：Step1 不 complete，不能发布

2. `QC-M2-002`（P0）Period 必填
- 步骤：未设置时间
- 断言：Step1 不 complete

3. `QC-M2-003`（P1）No End Time 开关
- 步骤：开启 No End Time
- 断言：endTime 允许为空且 Step1 可 complete

4. `QC-M2-004`（P1）Permission Public/Private 切换
- 断言：默认 `Private`；切换后 campaignInput 更新

5. `QC-M2-005`（P1）No Task 打开时 Public 被禁用
- 前置：Task 设置开启 No Task
- 断言：Permission 的 Public 不可选且有提示

6. `QC-M2-006`（P2）Description Markdown 编辑
- 断言：可输入文本、上传入口可见（space 初始化后）

### M3 Rewards（奖励类型与各子表单）

#### M3-A 奖励类型切换通用
1. `QC-M3A-001`（P0）默认奖励类型为 Points
2. `QC-M3A-002`（P0）切换奖励类型后渲染对应子组件
3. `QC-M3A-003`（P1）编辑态/已存款场景禁止切换 reward type
4. `QC-M3A-004`（P1）Discord Role 在未绑定 guild 时置灰

选择器建议：`RewardTypes` 中按钮使用 `data-testid={reward.name}`，例如 `Points`、`OAT`、`NFT`、`Token`。

#### M3-B 奖励子模块覆盖（至少各 1 条冒烟）
1. `QC-M3B-001`（P1）Points：固定积分配置可保存
2. `QC-M3B-002`（P1）Points Mystery Box：配置项渲染与提交数据结构正确
3. `QC-M3B-003`（P1）OAT：网络与模板基础字段可编辑
4. `QC-M3B-004`（P1）NFT：合约选择/名称/媒体字段可操作
5. `QC-M3B-005`（P1）Token：token 选择、数量、发放相关字段可操作
6. `QC-M3B-006`（P1）Custom Reward：奖励文案与字段可编辑
7. `QC-M3B-007`（P1）Discord Role：角色来源字段可编辑

### M4 Task Setting 总体（任务组结构）
1. `QC-M4-001`（P0）Task Group 默认存在并可编辑
2. `QC-M4-002`（P0）Task Group 校验：无条件或 reward formula 不完整时 Step3 不 complete
3. `QC-M4-003`（P1）任务组拖拽排序（orderNum 更新）
4. `QC-M4-004`（P1）切换 reward type 为 Bounty/Token/DiscordRole 时限制单组逻辑生效
5. `QC-M4-005`（P1）Recurring 类型切换（Once/Daily/Weekly/Monthly）后配置联动
6. `QC-M4-006`（P1）No Task 开关与 Participate Requirement 互斥

### M5 Credential 选择与编辑
1. `QC-M5-001`（P0）打开 credential 选择弹窗并添加 1 个 credential
2. `QC-M5-002`（P0）已添加 credential 在 `EditingCredentials` 列表可见
3. `QC-M5-003`（P0）credential 未保存时 Step3 不 complete
4. `QC-M5-004`（P1）删除 credential 后组内条件同步更新
5. `QC-M5-005`（P1）多维 credential（isMulti）可配置过滤器并保存
6. `QC-M5-006`（P1）搜索 credential 列表（debounce）可用

选择器建议：
- 在 `CampTypeList.tsx` 使用 `data-testid={item.name}`
- 在“设置 credential”入口优先找 `data-testid="setUpCred"`（按项目约定）

### M6 Participate Requirement
1. `QC-M6-001`（P0）开启/关闭 Participate Requirement
2. `QC-M6-002`（P1）推荐用户分群快捷组（new/active 等）选择联动
3. `QC-M6-003`（P1）Sybil 防护分档（weak/medium/strong）选择行为
4. `QC-M6-004`（P1）Group Relation（AND/OR）切换结果正确
5. `QC-M6-005`（P1）Boost Visibility 相关 credential 校验提示

### M7 Referral Program
1. `QC-M7-001`（P0）Referral 开关关闭时 `referralConfig = null`
2. `QC-M7-002`（P0）开启后必填校验（referralCount / rewardCount / pointCount）
3. `QC-M7-003`（P1）固定奖励 vs 每N人奖励（isFixedReward）公式变化正确
4. `QC-M7-004`（P1）不同 reward type 下奖励描述（description）生成正确
5. `QC-M7-005`（P1）编辑态禁止切换 Referral 开关

### M8 Collect Participants' Info
1. `QC-M8-001`（P0）开关关闭时 `requiredInfo = null`
2. `QC-M8-002`（P0）开关开启但未选任何项时 Step3 不 complete
3. `QC-M8-003`（P1）选择 Social Info / Address Info 后可 complete
4. `QC-M8-004`（P1）Bounty 类型自动开启 Collect Info
5. `QC-M8-005`（P1）编辑态下开关禁用

### M9 User Agreement
1. `QC-M9-001`（P0）关闭时 `userAgreement=''` 且不阻塞发布
2. `QC-M9-002`（P0）开启后为空时 Step3 不 complete
3. `QC-M9-003`（P1）输入 Markdown 文本后 Step3 complete
4. `QC-M9-004`（P1）编辑态下开关禁用

### M10 Header 动作（Create/NextStep）
1. `QC-M10-001`（P0）`Save Draft` 成功
- 断言：出现保存成功状态；URL 带 `id`

2. `QC-M10-002`（P0）`Preview` 在无 id 时禁用，有 id 时可跳转

3. `QC-M10-003`（P0）Step3 点击 `Release` 触发确认弹窗

4. `QC-M10-004`（P0）全部是 Twitter/Visit/Youtube/Discord/Telegram 且未开启高级防 Sybil 时，先弹提醒再确认

5. `QC-M10-005`（P1）`Release Now` 成功后跳转到 web quest 详情页

### M11 编辑态与不可变更规则
1. `QC-M11-001`（P0）加载 `campaignId_active`，字段回填正确
2. `QC-M11-002`（P1）已发布任务不可变更项被禁用（例如某些开关）
3. `QC-M11-003`（P1）token 已存款场景奖励类型受限
4. `QC-M11-004`（P1）草稿编辑态可再次保存且不丢失 taskConfig

### M12 Reward Distribution（奖励发放方式）

组件：`RewardDistribution.tsx`
可选方式：FCFS / Lottery / Recurrence / Raffle，不同 reward type 下可选项不同。

1. `QC-M12-001`（P0）默认发放方式为 FCFS
- 前置：选择 OAT 或 NFT 奖励类型
- 断言：默认选中 First Come First Served

2. `QC-M12-002`（P0）切换发放方式后 UI 联动正确
- 步骤：依次切换到 Lottery / Recurrence / Raffle
- 断言：对应配置面板渲染（如 Raffle 显示开奖时间设置，Recurrence 显示周期选项）

3. `QC-M12-003`（P1）Raffle 模式要求必须设置 End Time
- 前置：选择 Raffle
- 断言：Period 中 `No End Time` 不可用，endTime 为必填

4. `QC-M12-004`（P1）Lottery 仅在 Points 奖励类型下可用
- 前置：选择 Token 奖励类型
- 断言：Lottery 选项不展示或不可选

5. `QC-M12-005`（P1）Recurrence 选择后 recurring 类型联动（Daily/Weekly/Monthly）
- 断言：Recurrence 激活后显示周期配置，切换周期后 credential 可选列表过滤正确

6. `QC-M12-006`（P2）已发布任务不可切换发放方式
- 前置：编辑态，已发布任务
- 断言：发放方式选项 disabled

选择器建议：`RewardDistribution` 中按钮/选项卡使用分发类型名称定位。

### M13 Gas Configuration（Gas 费配置）

组件：`GasTypeStation.tsx`
适用于 OAT / NFT 等链上 mint 类奖励。

1. `QC-M13-001`（P1）OAT 奖励下 Gas 配置入口可见
- 前置：选择 OAT 奖励类型
- 断言：显示 Gas / Gasless 选择项

2. `QC-M13-002`（P1）NFT 奖励下 Gas 配置入口可见
- 前置：选择 NFT 奖励类型
- 断言：显示 Gas / Gasless 选择项

3. `QC-M13-003`（P1）切换 Gasless 后提示 tooltip 正确
- 步骤：切换到 Gasless
- 断言：显示平台赞助说明文案

4. `QC-M13-004`（P2）非链上奖励类型（Points / Custom Reward）不显示 Gas 配置
- 断言：Gas 配置区域不渲染

### M14 Mystery Box 独立奖励类型

M3-B 中已覆盖 Points Mystery Box（M3B-002），此模块覆盖 Mystery Box 作为独立顶级奖励类型。

1. `QC-M14-001`（P1）选择 Mystery Box 奖励类型
- 步骤：点击 `data-testid="Mystery Box"`
- 断言：Mystery Box 配置面板渲染

2. `QC-M14-002`（P1）Mystery Box 配置多档奖品
- 步骤：添加多个奖品档位（如 Token + OAT 组合）
- 断言：各档位配置独立可编辑，概率总和校验

3. `QC-M14-003`（P1）Mystery Box 空奖率配置
- 步骤：设置 empty prize 概率
- 断言：概率字段可编辑，总概率不超过 100%

4. `QC-M14-004`（P2）Mystery Box 至少配置 1 个奖品档位
- 步骤：不配置任何奖品尝试下一步
- 断言：Step2 不 complete

### M15 Token 子类型（Fixed Token vs Luck-Based Token）

M3B-005 笼统覆盖了 Token，此模块细化两个子类型的差异。

1. `QC-M15-001`（P1）默认 Token 子类型为 Fixed Token
- 前置：选择 Token 奖励类型
- 断言：默认选中 Fixed Token 配置

2. `QC-M15-002`（P1）切换到 Luck-Based Token
- 步骤：切换子类型
- 断言：渲染 Luck-Based 特有配置（随机分配规则、最小/最大金额）

3. `QC-M15-003`（P1）Luck-Based Token 仅支持特定链
- 断言：链选择器仅显示 BSC / Ethereum / Polygon / Arbitrum / Base / Optimism / Gravity Alpha / Avalanche

4. `QC-M15-004`（P0）Token 存款前必须选择 token 和填入数量
- 步骤：不选 token 或不填数量
- 断言：Deposit 按钮 disabled，Step2 不 complete

5. `QC-M15-005`（P2）Token 存款后不可切换子类型
- 前置：已完成存款
- 断言：子类型切换 disabled

### M16 Credential 分类 Tab 与 Recurring 过滤

M5 覆盖了 credential 添加，此模块补充弹窗内分类浏览与 recurring 模式下的过滤。

1. `QC-M16-001`（P1）Credential 弹窗 Tab 切换：Community / On-Chain / Starboard / My Credentials
- 步骤：依次点击各 Tab
- 断言：列表内容按分类过滤

2. `QC-M16-002`（P1）On-Chain Tab 显示链上 credential 类型
- 断言：展示 NFT Holder / Wallet Balance / Contract Query / Snapshot Vote 等

3. `QC-M16-003`（P1）Daily Recurring 下 credential 列表过滤
- 前置：Recurrence 模式选择 Daily
- 步骤：打开 credential 弹窗
- 断言：仅显示 Visit a Page / Import Your Own Data

4. `QC-M16-004`（P1）Weekly Recurring 下 credential 列表过滤
- 前置：Recurrence 模式选择 Weekly
- 断言：显示 Visit a Page / X Like / X Retweet / X Quote Tweet / X Bullish About / Import Your Own Data

5. `QC-M16-005`（P1）Monthly Recurring 下 credential 列表过滤
- 前置：Recurrence 模式选择 Monthly
- 断言：显示 Visit a Page / X Like / X Retweet / Import Your Own Data

6. `QC-M16-006`（P2）Recurring 模式下 credential 只能添加 1 个
- 步骤：在 Daily 模式下添加第 2 个 credential
- 断言：添加被阻止或提示限制

### M17 Multi-Entry Rules（多入口规则）

组件：`MultiEntryRule.tsx`
仅在添加了多维 credential（isMulti）后显示。

1. `QC-M17-001`（P1）添加多维 credential 后 Multi-Entry Rule 入口可见
- 前置：添加 Wallet Balance（isMulti）credential
- 断言：出现 `data-testid="open-multi-entry-rule-modal"` 按钮

2. `QC-M17-002`（P1）打开 Multi-Entry Rule 弹窗并配置
- 步骤：点击入口 → 选择 credential（`data-testid="select-multi-dimension-credential"`）→ 选择字段（`data-testid="select-multi-dimension-field"`）→ 填入数值（`data-testid="multi-entry-rule-number-field"`）
- 断言：配置保存成功

3. `QC-M17-003`（P2）Multi-Entry Rule 数值为空或 0 时校验失败
- 断言：保存按钮 disabled 或出现错误提示

4. `QC-M17-004`（P2）无多维 credential 时 Multi-Entry Rule 不展示
- 前置：仅添加普通 credential（如 Visit a Page）
- 断言：Multi-Entry Rule 区域不渲染

### M18 Boost Quest Visibility（提升可见度）

组件：`BoostQuestVisibility.tsx`
仅 Verified Space 可用，开启后自动添加 Plus / Score credentials。

1. `QC-M18-001`（P1）Verified Space 下 Boost Visibility 开关可见
- 前置：Verified Space 登录
- 断言：显示 Boost Quest Visibility 开关

2. `QC-M18-002`（P1）开启 Boost Visibility 自动添加 credential
- 步骤：打开开关
- 断言：自动添加 Galxe Plus / Web3 Score 相关 credential 到 Participation Requirement

3. `QC-M18-003`（P1）开启后显示 "Verify Before Tasks" 复选框
- 断言：复选框可见且默认推荐选中

4. `QC-M18-004`（P2）非 Verified Space 下 Boost Visibility 不可用
- 前置：非 Verified Space
- 断言：开关不渲染或展示升级提示

### M19 Advanced Sybil Prevention（高级反女巫）

组件：`AdvancedSybilPrevention.tsx`
需要 Growth Plan 或 Enterprise Plan。

1. `QC-M19-001`（P1）套餐满足时 Advanced Sybil Prevention 开关可用
- 前置：Growth / Enterprise 套餐
- 断言：开关可点击

2. `QC-M19-002`（P1）套餐不满足时显示锁定状态
- 前置：Free 套餐
- 断言：开关旁显示锁定图标及升级按钮

3. `QC-M19-003`（P2）开启后配置项渲染
- 步骤：打开开关
- 断言：高级防女巫配置面板显示

### M20 Info 补充校验

1. `QC-M20-001`（P1）Title 最大字符限制 80
- 步骤：输入超过 80 字符
- 断言：输入被截断或计数器显示 80/80，不可超出

2. `QC-M20-002`（P2）Title 字符计数器实时更新
- 步骤：逐步输入文本
- 断言：计数器同步显示 X/80

3. `QC-M20-003`（P1）Raffle / Token 类型下 No End Time 隐藏
- 前置：选择 Raffle 或 Token 奖励类型
- 断言：Period 区域不显示 No End Time 开关，endTime 为必填

4. `QC-M20-004`（P1）已发布任务时间选择器受限
- 前置：编辑态，已发布任务
- 断言：Start Time 不可修改（若已过期），End Time 可延长

### M21 OAT / NFT 高级配置

M3B-003/004 仅覆盖基础字段，此模块补充高级配置。

1. `QC-M21-001`（P1）OAT Minting Cap 配置
- 步骤：设置 Minting Cap 数值 / 切换 Unlimited
- 断言：数值生效或 Unlimited 时 cap 字段隐藏

2. `QC-M21-002`（P1）OAT Traits 配置
- 步骤：添加自定义 Trait（name + value）
- 断言：Trait 列表可添加/删除/编辑

3. `QC-M21-003`（P1）NFT 合约选择流程
- 步骤：选择已部署合约 / 新建合约
- 断言：合约地址回填、网络匹配

4. `QC-M21-004`（P1）OAT / NFT 媒体上传
- 步骤：上传图片/视频文件
- 断言：预览可见，文件类型校验（非支持格式提示错误）

5. `QC-M21-005`（P2）OAT 模板选择
- 步骤：从模板库选择模板
- 断言：模板预览渲染，字段自动填充

## 6. 建议的执行批次
- 批次 A（阻断发布，先自动化）：M0/M1/M2/M3A/M4/M10/M12/M15 的 P0
- 批次 B（核心业务深水区）：M5/M6/M7/M8/M9/M12/M14/M15/M16 的 P0+P1
- 批次 C（奖励深度配置）：M13/M14/M15/M21 的 P1
- 批次 D（高级功能）：M17/M18/M19/M20 的 P1
- 批次 E（稳定性与边界）：M11 及所有模块 P2

## 7. Playwright 落地建议
- 文件拆分：
  - `quest-create.bootstrap.spec.ts`（M0/M1）
  - `quest-create.info.spec.ts`（M2/M20）
  - `quest-create.reward.spec.ts`（M3/M12/M13/M14/M15/M21）
  - `quest-create.task-setting.spec.ts`（M4~M9）
  - `quest-create.task-setting.credentials.spec.ts`（M5/M16）
  - `quest-create.task-setting.advanced.spec.ts`（M6/M17/M18/M19）
  - `quest-create.release.spec.ts`（M10/M11）
- 统一 fixture：登录态、`spaceId`、常用 mock（GraphQL route fulfill）
- 选择器优先级：`data-testid > role/name > placeholder/label > text`

## 8. 验收标准
- P0 用例全部通过，且发布路径（创建 -> 校验 -> Release）可稳定重复执行。
- P1 用例通过率 >= 95%。
- P2 用例通过率 >= 90%。
- 所有失败用例可复现并定位到模块级（Info/Reward/TaskSetting/Header）。
