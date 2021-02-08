import { MonetaryAmount } from "../../model/MonetaryAmount.model";
import { TimeFrame } from "../../model/TimeFrame.model";
import { CashFlowEntryType } from "../../model/CashFlowEntryType.model";
import { CashFlowEntryCategory } from "../../model/CashFlowEntryCategory.model";

export interface FinanceState {
  cashFlow: CashFlowEntry[]
}

export interface CashFlowEntry {
  id?: UUID
  description: string
  category: CashFlowEntryCategory
  type: CashFlowEntryType
  amount: MonetaryAmount,
  recurrence: Recurrence
  retention: Retention
}

export type UUID = string

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



