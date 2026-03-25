import type { CaseItem } from './types'

export const cases: CaseItem[] = [
  // ── M1: Navigation Bar ──────────────────────────────────────────────
  {
    id: 'REQ-01-TC-01',
    description: 'Navigation Bar Explore > Quests 显示 Smart Ranking 入口（已登录）',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问首页',
      'hover Explore 菜单',
      '查看 Quests 子菜单',
    ],
    assertions: [
      '子菜单中可见 Smart Ranking 链接',
      '链接指向 /quest/explore/rank 或 /explore/rank',
    ],
    codeRefs: [
      'apps/web/src/components/layout/navigation/useNavigationMenus.tsx#Smart Ranking',
      'packages/tools/constants/routes.ts#SMART_RANKING',
    ],
  },
  {
    id: 'REQ-01-TC-02',
    description: '点击 Smart Ranking 入口跳转 Explore All Smart Ranking Tab',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      'hover Explore 菜单',
      '点击 Smart Ranking',
    ],
    assertions: [
      '页面跳转到 /quest/explore 并激活 Smart Ranking Tab',
    ],
    codeRefs: [
      'apps/web/src/components/layout/navigation/useNavigationMenus.tsx#ROUTES.SMART_RANKING',
    ],
  },

  // ── M2: Explore All - Smart Ranking Tab ─────────────────────────────
  {
    id: 'REQ-02-TC-01',
    description: 'Explore All 页面显示 Smart Ranking Tab',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore',
    ],
    assertions: [
      '页面顶部 Tab 栏包含 Smart Ranking 选项',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/const.ts#Smart Ranking',
    ],
  },
  {
    id: 'REQ-02-TC-02',
    description: '已登录用户点击 Smart Ranking Tab 展示四个子榜单',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore',
      '点击 Smart Ranking Tab',
    ],
    assertions: [
      '可见 Ecosystem Missions / Alpha Signals / Token Bounties / Popular Picks 四个子榜单按钮',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#RANK_CATEGORIES',
      'apps/web/src/app/(app)/quest/explore/Rank/RankCategoryTabs.tsx',
    ],
  },
  {
    id: 'REQ-02-TC-03',
    description: '未登录用户访问 Smart Ranking 显示登录引导',
    priority: 'high',
    preconditions: ['未登录'],
    steps: [
      '访问 /quest/explore/rank',
    ],
    assertions: [
      '显示 "Log in to Discover and Stay Updated" 文案',
      '显示 Log in 按钮',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#Log in to Discover and Stay Updated',
    ],
  },
  {
    id: 'REQ-02-TC-04',
    description: '子榜单选中时显示白色边框',
    priority: 'medium',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank',
      '点击 Alpha Signals 按钮',
    ],
    assertions: [
      'Alpha Signals 按钮具有 border-white 样式',
      '其他按钮具有 border-divider-lighten2 样式',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankCategoryTabs.tsx#border-white',
    ],
  },
  {
    id: 'REQ-02-TC-05',
    description: '各子榜单显示正确的 Rule Description',
    priority: 'medium',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank',
      '依次切换四个子榜单',
    ],
    assertions: [
      'Ecosystem: "Overall Featured Ranking Index is determined by space influence, release time, and other factors."',
      'Alpha: "Overall High Potential Ranking Index is determined by additional benefits, campaign rewards and other factors."',
      'Token: "Overall Token Ranking Index is determined by task simplicity, 1-day campaign participation and other factors."',
      'Popular: "Overall Trending Ranking Index is determined by 3-day campaign participation, task simplicity, and other factors."',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#CATEGORY_DESCRIPTIONS',
    ],
  },
  {
    id: 'REQ-02-TC-06',
    description: 'URL category 参数控制默认选中的子榜单',
    priority: 'medium',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank?category=token',
    ],
    assertions: [
      'Token Bounties 为选中状态',
      '表头末列显示 Difficulty',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#categoryParam',
    ],
  },

  // ── M3: Campaign 卡片 ───────────────────────────────────────────────
  {
    id: 'REQ-04-TC-01',
    description: '榜单 campaign 卡片显示通用字段',
    priority: 'high',
    preconditions: ['已登录', '榜单有数据'],
    steps: [
      '访问 /quest/explore/rank',
    ],
    assertions: [
      '每张卡片显示 Ranking 数字',
      '显示 Index 分数（小数点后两位）',
      '显示 Quest 名称',
      '显示 Space 名称和头像',
      '显示参与人数 (Participants)',
      '显示 Rewards 标签',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#RankRow',
      'apps/web/src/app/(app)/quest/explore/Rank/RankTableHeader.tsx',
    ],
  },
  {
    id: 'REQ-04-TC-02',
    description: 'Top 1/2/3 显示对应排名 icon',
    priority: 'high',
    preconditions: ['已登录', '榜单有 ≥3 条数据'],
    steps: [
      '访问 /quest/explore/rank',
    ],
    assertions: [
      '第 1 名显示 ranking-01.png icon',
      '第 2 名显示 ranking-02.png icon',
      '第 3 名显示 ranking-03.png icon',
      '第 4 名及以后显示纯数字',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#TOP3_RANKING_IMAGES',
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#RankingNumber',
    ],
  },
  {
    id: 'REQ-04-TC-03',
    description: '排名变动箭头显示正确（上升/下降/不变）',
    priority: 'high',
    preconditions: ['已登录', '榜单有数据'],
    steps: [
      '访问 /quest/explore/rank',
      '观察 Index 列的变动箭头',
    ],
    assertions: [
      '上升的排名显示绿色 ↑',
      '下降的排名显示 ↓',
      '不变的排名无箭头',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#IndexChange',
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#getIndexChange',
    ],
  },
  {
    id: 'REQ-05-TC-01',
    description: 'Ecosystem Missions 末列显示 Release Time',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank?category=ecosystem',
    ],
    assertions: [
      '表头末列为 Release Time',
      '卡片末列显示如 "Live for 3 days" 或 "Today"',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankTableHeader.tsx#Release Time',
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#buildReleaseTime',
    ],
  },
  {
    id: 'REQ-06-TC-01',
    description: 'Alpha Signals 末列显示 Additional Benefits 标签',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank?category=alpha',
    ],
    assertions: [
      '表头末列为 Additional Benefits',
      '卡片末列显示 Airdrop Guaranteed / Gasless / pre-TGE / GG Boost 等标签',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankTableHeader.tsx#Additional Benefits',
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#BenefitTag',
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#buildBenefitTags',
    ],
  },
  {
    id: 'REQ-07-TC-01',
    description: 'Token Bounties 末列显示 Difficulty',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank?category=token',
    ],
    assertions: [
      '表头末列为 Difficulty',
      '卡片末列显示 Hard / Medium / Simple',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankTableHeader.tsx#Difficulty',
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#getLastColumnValue',
    ],
  },
  {
    id: 'REQ-08-TC-01',
    description: 'Popular Picks 末列显示 3-day Participation',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank?category=popular',
    ],
    assertions: [
      '表头末列为 3-day Participation',
      '卡片末列显示参与数（≥1k 缩写如 16.72k）',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankTableHeader.tsx#3-day Participation',
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#numberToBMK',
    ],
  },
  {
    id: 'REQ-04-TC-04',
    description: '点击 campaign 卡片跳转到 quest 详情页',
    priority: 'high',
    preconditions: ['已登录', '榜单有数据'],
    steps: [
      '访问 /quest/explore/rank',
      '点击第一条 campaign 卡片',
    ],
    assertions: [
      '页面跳转到 /quest/{spaceAlias}/{questId} 详情页',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#href={`/quest/${item.spaceAlias}/${item.questId}`',
    ],
  },
  {
    id: 'REQ-04-TC-05',
    description: 'Top 1-3 卡片具有渐变背景',
    priority: 'low',
    preconditions: ['已登录', '榜单有 ≥3 条数据'],
    steps: [
      '访问 /quest/explore/rank',
    ],
    assertions: [
      '第 1-3 名卡片背景有紫色渐变',
      '第 4 名及以后为纯色背景 #131417',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankRow.tsx#TOP3_GRADIENT_MAP',
    ],
  },

  // ── M4: Explore More 插卡 ──────────────────────────────────────────
  {
    id: 'REQ-09-TC-01',
    description: '已登录用户 Explore More 页面显示 Smart Ranking 卡片',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问任意 quest 详情页，滚动到 Explore More 区域',
    ],
    assertions: [
      '可见 Smart Ranking 卡片',
      '卡片标题为 "Smart Ranking 🔥"',
      '副标题为 "Galxe Official Featured Lists: Authentic Data, Updated Daily"',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/[space]/[questId]/components/QuestExploreMore.tsx#SmartRankingCard',
      'apps/web/src/app/(app)/quest/[space]/[questId]/components/SmartRankingCard.tsx#DEFAULT_SECTION_TITLE',
    ],
  },
  {
    id: 'REQ-09-TC-02',
    description: 'Smart Ranking 卡片根据 userTag 展示对应榜单',
    priority: 'high',
    preconditions: ['已登录', 'userTag=community'],
    steps: [
      '访问 quest 详情页 Explore More 区域',
    ],
    assertions: [
      'community tag → 展示 Ecosystem Missions Top 20 卡片',
      '描述: "Build your legacy through meaningful challenges"',
      '链接指向 /quest/explore/rank?category=ecosystem',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/[space]/[questId]/components/QuestExploreMore.tsx#USER_TAG_CARD_MAP',
    ],
  },
  {
    id: 'REQ-09-TC-03',
    description: 'userTag 为 null 时默认展示 Ecosystem Missions 卡片',
    priority: 'medium',
    preconditions: ['已登录', 'userTag=null'],
    steps: [
      '访问 quest 详情页 Explore More 区域',
    ],
    assertions: [
      '默认展示 Ecosystem Missions Top 20 卡片',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/[space]/[questId]/components/QuestExploreMore.tsx#DEFAULT_SMART_RANKING_CARD',
    ],
  },
  {
    id: 'REQ-09-TC-04',
    description: '点击 Smart Ranking 卡片跳转到对应子榜单',
    priority: 'high',
    preconditions: ['已登录'],
    steps: [
      '访问 quest 详情页 Explore More',
      '点击 Smart Ranking 卡片链接',
    ],
    assertions: [
      '跳转到 /quest/explore/rank?category={对应类别}',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/[space]/[questId]/components/SmartRankingCard.tsx#href',
    ],
  },
  {
    id: 'REQ-09-TC-05',
    description: '未登录用户不显示 Smart Ranking 卡片',
    priority: 'high',
    preconditions: ['未登录'],
    steps: [
      '访问 quest 详情页 Explore More 区域',
    ],
    assertions: [
      '不可见 Smart Ranking 卡片',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/[space]/[questId]/components/QuestExploreMore.tsx#isLoggedIn && <SmartRankingCard',
    ],
  },

  // ── M5: 埋点 ───────────────────────────────────────────────────────
  {
    id: 'REQ-15-TC-01',
    description: '榜单 campaign 出现在视口时触发 view 事件',
    priority: 'high',
    preconditions: ['已登录', '榜单有数据'],
    steps: [
      '访问 /quest/explore/rank',
      '等待 campaign 卡片出现在视口',
    ],
    assertions: [
      '触发 smart_ranking_campaign_view 事件',
      '事件包含 ranking / campaign_id / galxe_id 参数',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#GAViewTracker',
      'apps/web/src/constants/GAEventNames.ts#smart_ranking_campaign_view',
    ],
  },
  {
    id: 'REQ-15-TC-02',
    description: '点击 campaign 卡片触发 click 事件',
    priority: 'high',
    preconditions: ['已登录', '榜单有数据'],
    steps: [
      '访问 /quest/explore/rank',
      '点击任意 campaign 卡片',
    ],
    assertions: [
      '触发 smart_ranking_campaign_click 事件',
      '事件包含 ranking / campaign_id / galxe_id 参数',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#GAViewTracker',
      'apps/web/src/constants/GAEventNames.ts#smart_ranking_campaign_click',
    ],
  },
  {
    id: 'REQ-15-TC-03',
    description: '埋点 ranking 参数与当前子榜单对应',
    priority: 'medium',
    preconditions: ['已登录'],
    steps: [
      '切换到 Alpha Signals 子榜单',
      '等待 campaign 卡片出现',
    ],
    assertions: [
      'view/click 事件的 ranking 参数为 alpha_signals',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/index.tsx#CATEGORY_TO_GA_RANKING',
    ],
  },

  // ── M6: 表头差异化 ─────────────────────────────────────────────────
  {
    id: 'REQ-04-TC-06',
    description: '表头列固定为 Ranking / Index / Quest/Space / Rewards / 差异化末列',
    priority: 'medium',
    preconditions: ['已登录'],
    steps: [
      '访问 /quest/explore/rank',
      '切换四个子榜单',
    ],
    assertions: [
      '前四列始终为 Ranking / Index / Quest/Space / Rewards',
      'Ecosystem → Release Time',
      'Alpha → Additional Benefits',
      'Token → Difficulty',
      'Popular → 3-day Participation',
    ],
    codeRefs: [
      'apps/web/src/app/(app)/quest/explore/Rank/RankTableHeader.tsx#LAST_COLUMN_HEADER',
    ],
  },

  // ── M7: Footer 入口 ────────────────────────────────────────────────
  {
    id: 'REQ-01-TC-03',
    description: 'Footer 包含 Smart Ranking 链接',
    priority: 'low',
    preconditions: [],
    steps: [
      '滚动到页面底部 Footer 区域',
    ],
    assertions: [
      'Footer 中可见 Smart Ranking 链接',
    ],
    codeRefs: [
      'apps/web/src/components/layout/footer/index.tsx#ROUTES.SMART_RANKING',
    ],
  },
]
