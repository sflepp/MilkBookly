import { MonetaryAmount } from "../../model/MonetaryAmount.model";
import { TimeFrame } from "../../model/TimeFrame.model";
import { CashFlowEntryType } from "../../model/CashFlowEntryType.model";
import { CashFlowEntryCategory } from "../../model/CashFlowEntryCategory.model";
import { CustomDate } from "../../model/CustomDate";

export interface FinanceState {
  cashFlow: CashFlowEntry[]
}

export interface CashFlowEntry {
  id?: UUID
  description: string
  start: CustomDate
  end?: CustomDate
  category: CashFlowEntryCategory
  type: CashFlowEntryType
  amount: MonetaryAmount
  recurrence: Recurrence
}

export type UUID = string

export type Recurrence = OneTimeRecurrence | ContinuousRecurrence;

export interface OneTimeRecurrence {
  type: 'one-time'
  amortization: {
    timeFrame: TimeFrame,
    amount: number
  }
}

export interface ContinuousRecurrence {
  type: 'continuous'
  repetition: TimeFrame
}



