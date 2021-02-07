export interface FinanceState {
  cashFlow: CashFlowEntry[]
}

export interface CashFlowEntry {
  description: string
  startDate: Date,
  amount: MonetaryAmount,
  recurrence: Recurrence
  amortization: Amortization
}

export interface Amortization {
  timeFrame: TimeFrame
  fn: 'linear'
}

export type Recurrence = OneTimeRecurrence | ContinuousRecurrence;

export interface OneTimeRecurrence {
  type: 'one-time'
}

export interface ContinuousRecurrence {
  type: 'continuous'
  repetition: TimeFrame
}

export interface MonetaryAmount {
  amount: number,
  currency: string
}

export type TimeFrame = 'YEAR' | 'MONTH' | 'WEEK' | 'DAY'



