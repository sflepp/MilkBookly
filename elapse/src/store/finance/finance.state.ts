import { MonetaryAmount } from "../../model/MonetaryAmount.model";
import { TimeFrame } from "../../model/TimeFrame.model";

export interface FinanceState {
  cashFlow: CashFlowEntry[]
}

export interface CashFlowEntry {
  description: string
  type: 'wage'
  startDate: Date,
  amount: MonetaryAmount,
  recurrence: Recurrence
  retention: Retention
}

export interface Retention {
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



