export type Priority = 'high' | 'medium' | 'low'

export interface CaseItem {
  id: string
  description: string
  priority: Priority
  preconditions: string[]
  steps: string[]
  assertions: string[]
  codeRefs: string[]
}
