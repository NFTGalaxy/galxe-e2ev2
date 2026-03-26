import type { CaseItem } from './types'

export const cases: CaseItem[] = [
  // ── Module 1: Data Structure Validation ──────────────────────────
  {
    id: 'REQ-01-TC-01',
    description: 'availableRewards 数组长度为 4',
    priority: 'high',
    preconditions: ['可访问 rewardData.tsx 导出'],
    steps: ['导入 availableRewards', '检查数组长度'],
    assertions: ['availableRewards.length === 4'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards',
    ],
  },
  {
    id: 'REQ-01-TC-02',
    description: '每个元素包含 rewards 字段且为数组',
    priority: 'high',
    preconditions: ['可访问 rewardData.tsx 导出'],
    steps: ['遍历 availableRewards 每个元素'],
    assertions: ['每个元素都有 rewards 属性', 'rewards 值为 Array'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards',
    ],
  },
  {
    id: 'REQ-01-TC-03',
    description: '每个奖励项包含 title、icon、desc 字段',
    priority: 'medium',
    preconditions: ['可访问 rewardData.tsx 导出'],
    steps: ['遍历所有非空 rewards 中的奖励项'],
    assertions: ['每个奖励项都有 title/icon/desc 字段'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards',
    ],
  },
  {
    id: 'REQ-01-TC-04',
    description: 'Level 1 的 rewards 为空数组',
    priority: 'high',
    preconditions: ['可访问 rewardData.tsx 导出'],
    steps: ['读取 availableRewards[0]'],
    assertions: ['rewards 为空数组（length === 0）'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards[0]',
    ],
  },
  {
    id: 'REQ-01-TC-05',
    description: 'Level 2-4 的 rewards 非空',
    priority: 'high',
    preconditions: ['可访问 rewardData.tsx 导出'],
    steps: ['读取 availableRewards[1]、[2]、[3]'],
    assertions: ['rewards.length > 0 对于索引 1、2、3'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards',
    ],
  },

  // ── Module 2: Level Switch — Available to Apply ──────────────────
  {
    id: 'REQ-05-TC-01',
    description: '选择 Level 1 → 显示空状态 UI（无 Available to Apply 区块）',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.1 选项'],
    assertions: [
      '不显示 Available to Apply 标题',
      '显示空状态占位图',
      '显示提示文案',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#renderRewards',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevel === 1',
    ],
  },
  {
    id: 'REQ-02-TC-01',
    description: '选择 Level 2 → 显示 1 个奖励项（Post Retweeted）',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.2 选项'],
    assertions: [
      '显示 Available to Apply 标题',
      '可见 "Post Retweeted by @GalxeQuest" 文本',
      'Available to Apply 区块只有 1 个奖励卡片',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevelRewards',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards[1]',
    ],
  },
  {
    id: 'REQ-02-TC-02',
    description: '选择 Level 3 → 显示 3 个奖励项',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.3 选项'],
    assertions: [
      '显示 Available to Apply 标题',
      '可见 Quest of the Week / Galxe Explore All Quest Carousel / Galxe Quest - Explore More',
      'Available to Apply 区块有 3 个奖励卡片',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevelRewards',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards[2]',
    ],
  },
  {
    id: 'REQ-02-TC-03',
    description: '选择 Level 4 → 显示 3 个奖励项',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.4 选项'],
    assertions: [
      '显示 Available to Apply 标题',
      '可见 QT from @GalxeQuest / Quest Performance Review / Galxe Homepage Carousel',
      'Available to Apply 区块有 3 个奖励卡片',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevelRewards',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#availableRewards[3]',
    ],
  },
  {
    id: 'REQ-03-TC-01',
    description: '从 Level 2 切换到 Level 3 → 列表立即更新，无 loading',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.2', '点击 Lv.3'],
    assertions: [
      'Available to Apply 列表从 1 个变为 3 个',
      '切换过程无 loading spinner',
      '"Post Retweeted" 文本消失，Level 3 奖励出现',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#setCurrentLevel',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevelRewards useMemo [currentLevel]',
    ],
  },

  // ── Module 3: Level Switch — Your Benefits (Regression) ──────────
  {
    id: 'REQ-06-TC-01',
    description: 'Level 1 → benefits 为空（显示空状态）',
    priority: 'medium',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.1'],
    assertions: ['不显示 Your Benefits 区块', '显示空状态占位 UI'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#renderRewards',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#getYourBenefits[0]',
    ],
  },
  {
    id: 'REQ-06-TC-02',
    description: 'Level 2 → 显示 3 个 benefits',
    priority: 'medium',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.2'],
    assertions: [
      '显示 Your Benefits / Lv 2 Benefits 标题',
      'benefits 区块有 3 个卡片',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevelInfo',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#getYourBenefits[1]',
    ],
  },
  {
    id: 'REQ-06-TC-03',
    description: 'Level 3 → 显示 5 个 benefits',
    priority: 'medium',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.3'],
    assertions: ['benefits 区块有 5 个卡片'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#getYourBenefits[2]',
    ],
  },
  {
    id: 'REQ-06-TC-04',
    description: 'Level 4 → 显示 6 个 benefits',
    priority: 'medium',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.4'],
    assertions: ['benefits 区块有 6 个卡片'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/rewardData.tsx#getYourBenefits[3]',
    ],
  },
  {
    id: 'REQ-06-TC-05',
    description: '切换等级时 Your Benefits 与 Available to Apply 同步更新',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['进入 Rewards Hub', '点击 Lv.2 → 记录两区块内容', '点击 Lv.3 → 再次记录'],
    assertions: [
      'benefits 和 rewards 同时变化',
      '不存在旧等级内容残留',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#L44-50 dual useMemo',
    ],
  },

  // ── Module 4: UI / Interaction ───────────────────────────────────
  {
    id: 'REQ-05-TC-02',
    description: 'Level 1 空状态显示 "Complete tasks to level up" 文案（当 currentSpaceTier === 1）',
    priority: 'medium',
    preconditions: ['已登录 Dashboard', 'Space tier level = 1'],
    steps: ['进入 Rewards Hub（Space 等级为 1）', '当前默认在 Lv.1'],
    assertions: [
      '显示 "Complete tasks to level up and earn benefits" 文案',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#Complete tasks to level up',
    ],
  },
  {
    id: 'REQ-05-TC-03',
    description: 'Level 1 空状态显示 "View Benefits" 按钮，点击后跳转 Level 2',
    priority: 'medium',
    preconditions: ['已登录 Dashboard', 'Space tier level = 1'],
    steps: ['进入 Rewards Hub（Space 等级为 1）', '点击 "View Benefits" 按钮'],
    assertions: [
      '"View Benefits" 按钮可见',
      '点击后 currentLevel 变为 2',
      '展示 Level 2 的 Benefits 和 Available to Apply',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#View Benefits',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#setCurrentLevel(2)',
    ],
  },
  {
    id: 'REQ-02-TC-04',
    description: '"Apply" 按钮仅在 currentLevel === currentSpaceTier 时显示',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: [
      '进入 Rewards Hub',
      '切换到与当前 Space 等级相同的 Level → 检查 Apply 按钮',
      '切换到其他 Level → 检查 Apply 按钮',
    ],
    assertions: [
      '当 currentLevel === currentSpaceTier 时 Apply 按钮可见',
      '当 currentLevel !== currentSpaceTier 时 Apply 按钮不可见',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#currentLevel === currentSpaceTier',
    ],
  },
  {
    id: 'REQ-01-TC-06',
    description: 'Grid 布局在 1/3 个奖励项时正确展示',
    priority: 'low',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['切换到 Level 2（1 个奖励项）', '切换到 Level 3（3 个奖励项）'],
    assertions: [
      'Level 2 下奖励卡片独占一列',
      'Level 3 下 3 个奖励卡片铺满 3 列 grid',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#grid grid-cols-3',
    ],
  },

  // ── Module 5: Boundary & Exception ───────────────────────────────
  {
    id: 'REQ-02-TC-05',
    description: 'availableRewards[currentLevel - 1] 为 undefined 时不崩溃',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['模拟 currentLevel = 5（超出数组范围）'],
    assertions: [
      '页面不抛出异常或白屏',
      'Available to Apply 区块为空或不渲染',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#availableRewards[currentLevel - 1]',
    ],
  },
  {
    id: 'REQ-01-TC-07',
    description: '奖励项的 icon 为空字符串时正常渲染',
    priority: 'low',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['当奖励项 icon 为空字符串时渲染 RewardItem'],
    assertions: ['卡片正常渲染，不崩溃', 'img src 使用空字符串回退'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#RewardItem',
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#src={icon || ""}',
    ],
  },
  {
    id: 'REQ-03-TC-02',
    description: '页面初始加载时 currentLevel 默认取 spaceTier level',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Rewards Hub 页面'],
    steps: ['直接进入 Rewards Hub'],
    assertions: [
      '初始选中的 Level 与 Space 实际等级一致',
      '对应 Level 按钮有高亮边框',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/rewardsHub/LevelSection.tsx#useEffect setCurrentLevel(currentSpaceTier)',
    ],
  },
]
