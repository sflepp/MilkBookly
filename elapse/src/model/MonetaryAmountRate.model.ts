import { Currency, devide, multiply } from "./MonetaryAmount.model";
import { calculateTimeFrameSeconds, TimeFrame } from "./TimeFrame.model";
import { CashFlowEntry } from "../store/finance/finance.state";
import { CustomDate } from "./CustomDate";

export interface MonetaryAmountRate {
  amount: number,
  currency: Currency,
  timeFrame: TimeFrame
}

export const rate = (time: CustomDate, timeFrame: TimeFrame, entry: CashFlowEntry): MonetaryAmountRate => {
  let entryTimeFrameSeconds: number;

  if (entry.recurrence.type === 'continuous') {
    entryTimeFrameSeconds = calculateTimeFrameSeconds(entry.recurrence.repetition, time)
  } else if (entry.recurrence.type === 'one-time') {
    entryTimeFrameSeconds = calculateTimeFrameSeconds(entry.recurrence.amortization.timeFrame, time) * entry.recurrence.amortization.amount
  } else {
    throw new Error(`Unknown recurrence type for entry ${ JSON.stringify(entry) }`)
  }

  const monetaryAmountPerSecond = devide(entry.amount, entryTimeFrameSeconds)
  const timeFrameSeconds = calculateTimeFrameSeconds(timeFrame, time);
  const monetaryAmountPerTimeframe = multiply(monetaryAmountPerSecond, timeFrameSeconds)

  return {
    amount: monetaryAmountPerTimeframe.amount,
    currency: monetaryAmountPerTimeframe.currency,
    timeFrame: timeFrame
  }
}

export const convertRate = (time: CustomDate, rate: MonetaryAmountRate, to: TimeFrame) => {
  const rateTimeFrameSeconds = calculateTimeFrameSeconds(rate.timeFrame, time);
  const toTimeFrameSeconds = calculateTimeFrameSeconds(to, time);

  const monetaryAmountPerSecond = devide(rate, rateTimeFrameSeconds);
  const monetaryAmountPerTimeframe = multiply(monetaryAmountPerSecond, toTimeFrameSeconds);

  return {
    amount: monetaryAmountPerTimeframe.amount,
    currency: rate.currency,
    timeFrame: to
  }
}