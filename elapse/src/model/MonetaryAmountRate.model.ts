import { CashFlowEntry } from "../store/finance/finance.state";
import { CustomDate } from "./CustomDate";
import { Currency, devide, multiply } from "./MonetaryAmount.model";
import { calculateTimeFrameYears, TimeFrame } from "./TimeFrame.model";

export interface MonetaryAmountRate {
  amount: number,
  currency: Currency,
  timeFrame: TimeFrame
}

export const rate = (time: CustomDate, timeFrame: TimeFrame, entry: CashFlowEntry): MonetaryAmountRate => {
  let entryTimeFrameYears: number;

  if (entry.recurrence.type === 'continuous') {
    entryTimeFrameYears = calculateTimeFrameYears(entry.recurrence.repetition, time)
  } else if (entry.recurrence.type === 'one-time') {
    entryTimeFrameYears = calculateTimeFrameYears(entry.recurrence.amortization.timeFrame, time) * entry.recurrence.amortization.amount
  } else {
    throw new Error(`Unknown recurrence type for entry ${JSON.stringify(entry)}`)
  }

  const monetaryAmountPerYear = devide(entry.amount, entryTimeFrameYears)
  const timeFrameYears = calculateTimeFrameYears(timeFrame, time);
  const monetaryAmountPerTimeframe = multiply(monetaryAmountPerYear, timeFrameYears)

  let amount;
  if (entry.recurrence.type === 'continuous') {
    amount = monetaryAmountPerTimeframe.amount
  } else if (entry.recurrence.type === 'one-time') {
    amount = Math.min(monetaryAmountPerTimeframe.amount, entry.amount.amount)
  } else {
    throw new Error(`Unknown recurrence type for entry ${JSON.stringify(entry)}`)
  }

  return {
    amount: amount,
    currency: monetaryAmountPerTimeframe.currency,
    timeFrame: timeFrame
  }
}