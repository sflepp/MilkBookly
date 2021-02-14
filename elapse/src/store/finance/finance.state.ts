import { MonetaryAmount } from "../../model/MonetaryAmount.model";
import { TimeFrame } from "../../model/TimeFrame.model";
import { CashFlowEntryType } from "../../model/CashFlowEntryType.model";
import { CashFlowEntryCategory } from "../../model/CashFlowEntryCategory.model";
import { CustomDate, isAfter, isBefore } from "../../model/CustomDate";
import { cash } from "ionicons/icons";

export interface FinanceState {
  cashFlow: CashFlowEntry[]
  capital: CapitalEntry[]
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

export interface CapitalEntry {
  id?: UUID,
  date: CustomDate
  amount: MonetaryAmount
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

export const filterActive = (currentTime: CustomDate, cashFlow: CashFlowEntry) => {
  return isAfter(cashFlow.start, currentTime) && (cashFlow.end === undefined || isBefore(cashFlow.end, currentTime))
}


