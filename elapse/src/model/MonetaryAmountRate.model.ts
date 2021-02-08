import { Currency, MonetaryAmount } from "./MonetaryAmount.model";
import { TimeFrame } from "./TimeFrame.model";
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


const devide = (value: MonetaryAmount, by: number) => {
  return {
    amount: value.amount / by,
    currency: value.currency
  }
}

const multiply = (value: MonetaryAmount, by: number) => {
  return {
    amount: value.amount * by,
    currency: value.currency
  }
}

const currentTimeFrameSeconds = (timeFrame: TimeFrame) => {
  switch (timeFrame) {
    case "YEAR":
      const year = new Date().getFullYear();
      const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
      return daysInYear * 3600 * 24;
    case "MONTH":
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() * 3600 * 24;
    case "WEEK":
      return 3600 * 24 * 7;
    case "DAY":
      return 3600 * 24;
    case "HOUR":
      return 3600;
    case "MINUTE":
      return 60
    case "SECOND":
      return 1;
  }
}