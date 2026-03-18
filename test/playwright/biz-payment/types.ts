export type BizPaymentPriority = 'P0' | 'P1' | 'P2'

export interface BizPaymentCase {
  id: string
  priority: BizPaymentPriority
  title: string
  requirementId: string
  preconditions: string[]
  steps: string[]
  assertions: string[]
  envDependent?: boolean
}
