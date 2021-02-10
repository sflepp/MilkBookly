import { Currency, devide, multiply } from "./MonetaryAmount.model";
import { currentTimeFrameSeconds, TimeFrame } from "./TimeFrame.model";
import { CashFlowEntry } from "../store/finance/finance.state";

export interface MonetaryAmountRate {
  amount: number,
  currency: Currency,
  timeFrame: TimeFrame
}

export const rate = (timeFrame: TimeFrame, cashFlowEntry: CashFlowEntry): MonetaryAmountRate => {
  const cashFlowTimeFrameSeconds = currentTimeFrameSeconds(cashFlowEntry.retention.timeFrame);
  const monetaryAmountPerSecond = devide(cashFlowEntry.amount, cashFlowTimeFrameSeconds)
  const timeFrameSeconds = currentTimeFrameSeconds(timeFrame);
  const monetaryAmountPerTimeframe = multiply(monetaryAmountPerSecond, timeFrameSeconds)

  return {
    amount: monetaryAmountPerTimeframe.amount,
    currency: monetaryAmountPerTimeframe.currency,
    timeFrame: timeFrame
  }
}

export const convertRate = (rate: MonetaryAmountRate, to: TimeFrame) => {
  const rateTimeFrameSeconds = currentTimeFrameSeconds(rate.timeFrame);
  const toTimeFrameSeconds = currentTimeFrameSeconds(to);

  const monetaryAmountPerSecond = devide(rate, rateTimeFrameSeconds);
  const monetaryAmountPerTimeframe = multiply(monetaryAmountPerSecond, toTimeFrameSeconds);

  return {
    amount: monetaryAmountPerTimeframe.amount,
    currency: rate.currency,
    timeFrame: to
  }
}