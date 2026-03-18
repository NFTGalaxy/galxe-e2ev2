import type { CaseItem } from './types'

export const cases: CaseItem[] = [
  {
    id: 'REQ-01-TC-01',
    description: '打开 Upgrade/Extend 后展示支付弹窗关键字段',
    priority: 'high',
    preconditions: ['已登录 Dashboard 且可访问 Business 页面'],
    steps: ['进入 /business?space=<spaceId>', '点击 Upgrade 或 Extend 按钮'],
    assertions: [
      '出现 Upgrade to Galxe Business+ 弹窗',
      '可见 Subscription Type / Payment Amount / Payment Method / You pay / Confirm',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx#Upgrade to Galxe Business+',
    ],
  },
  {
    id: 'REQ-01-TC-02',
    description: '非 grace period 时 Activation Date 必填，未选不可确认',
    priority: 'high',
    preconditions: ['space 不在 grace period'],
    steps: ['打开支付弹窗', '不选择 Activation Date'],
    assertions: ['Confirm 按钮 disabled'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx#confirmDisabled',
    ],
  },
  {
    id: 'REQ-03-TC-01',
    description: 'Gas Station 余额为 0 时选项禁用',
    priority: 'high',
    preconditions: ['SpaceBalance.balance = 0'],
    steps: ['打开支付弹窗'],
    assertions: ['From Gas Station 按钮 disabled'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx#gasStationDisabled',
    ],
  },
  {
    id: 'REQ-05-TC-01',
    description: '未勾选 Service Agreement 时不可提交',
    priority: 'high',
    preconditions: ['已选择有效支付方式且余额充足'],
    steps: ['保持 Service Agreement 未勾选'],
    assertions: ['Confirm 按钮 disabled'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx#By checking the box',
    ],
  },
  {
    id: 'REQ-06-TC-01',
    description: 'mutation 返回 success=false 时展示 failureReason 并中断',
    priority: 'high',
    preconditions: ['mock registerSpacePaymentTask 返回 success=false'],
    steps: ['点击 Confirm'],
    assertions: ['弹出 Payment Error/failureReason', '不进入链上交互或轮询'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx#result?.success',
      'packages/graphql/modules/dashboard/mutations/Space/RegisterSpacePaymentTask.ts',
    ],
  },
  {
    id: 'REQ-08-TC-01',
    description: 'Wallet/组合支付出现确认与处理双阶段文案',
    priority: 'medium',
    preconditions: [
      'registerSpacePaymentTask 返回 newPaymentMethodPaymentData',
    ],
    steps: ['触发钱包支付流程'],
    assertions: [
      '出现 Waiting for Confirmation',
      '随后出现 Processing Payment',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/PayProcessModal.tsx#stepConfig',
      'apps/dashboard/src/app/(app)/(space)/business/page.tsx#openPaySuccess',
    ],
  },
  {
    id: 'REQ-09-TC-01',
    description: '轮询状态 Success 时结束并展示成功',
    priority: 'high',
    preconditions: ['存在有效 taskId'],
    steps: ['支付后轮询 spacePaymentTaskInfo'],
    assertions: ['Success 时停止轮询', '弹出成功结果并刷新空间信息'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/page.tsx#getPaymentTaskInfo',
    ],
  },
  {
    id: 'REQ-09-TC-02',
    description: '轮询状态 Failed 时结束并展示失败弹窗',
    priority: 'high',
    preconditions: ['存在有效 taskId'],
    steps: ['支付后轮询 spacePaymentTaskInfo'],
    assertions: ['Failed 时停止轮询', '展示 PayFailModal'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/page.tsx#getPaymentTaskInfo',
    ],
  },
  {
    id: 'REQ-10-TC-01',
    description: 'Billing 展示 Payment Method 与 TXID 列',
    priority: 'medium',
    preconditions: ['Business Subscription History 有数据'],
    steps: ['进入 Settings -> Billing'],
    assertions: ['可见 Payment Method 列', '可见 TXID 列并支持外链跳转'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/settings/components/billing/index.tsx#Payment Method',
      'packages/graphql/modules/dashboard/queries/space/BusinessSubscriptionHistory.ts',
    ],
  },
  {
    id: 'REQ-11-TC-01',
    description: 'Gas Station History 使用 Deposit History 与 Type=Deposit',
    priority: 'medium',
    preconditions: ['可访问 Gas Station History 页面'],
    steps: ['进入 /gasStation/history?space=<spaceId>'],
    assertions: ['展示 Deposit History', '展示 Type 列', '行值为 Deposit'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/gasStation/history/components/payment.tsx',
    ],
  },
  {
    id: 'REQ-12-TC-01',
    description: 'Expense Statement 存在 Type 列并区分两种类型',
    priority: 'medium',
    preconditions: ['Expense Statement 有数据'],
    steps: ['进入 Gas Station -> Expense Statement'],
    assertions: [
      'Type 列存在',
      '值包含 Quest Subsidy 或 Business+ Subscription',
    ],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/gasStation/history/components/expense.tsx',
    ],
  },
  {
    id: 'REQ-13-TC-01',
    description: '关键路径不再触发 Daimo Pay 跳转',
    priority: 'low',
    preconditions: ['可完整走到支付提交流程前后'],
    steps: ['打开并操作 UpgradeModal'],
    assertions: ['不出现 paymentUrl 跳转行为'],
    codeRefs: [
      'apps/dashboard/src/app/(app)/(space)/business/components/UpgradeModal.tsx',
      'packages/graphql/modules/dashboard/mutations/Space/RegisterSpacePaymentTask.ts#paymentUrl(兼容字段)',
    ],
  },
]
