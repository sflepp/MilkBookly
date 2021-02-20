import { CustomDate } from "../../model/CustomDate";
import { Currency, MonetaryAmount, sum } from "../../model/MonetaryAmount.model";
import { MonetaryAmountRate, rate } from "../../model/MonetaryAmountRate.model";
import {
  calculateTimeFrameSeconds,
  currentTimeFrameElapsedSeconds,
  startOfTimeFrame,
  TimeFrame
} from "../../model/TimeFrame.model";
import { RootState } from "../reducer";
import { CashFlowEntry, filterActive } from "./finance.state";

export const selectCurrentTimeFrameRate = (state: RootState) => {
  return rateAt(
    state.finance.cashFlow,
    state.settings.preferredTimeFrame,
    state.settings.preferredCurrency,
    state.environment.currentTime
  )
}

export const rateAt = (cashFlows: CashFlowEntry[], timeFrame: TimeFrame, currency: Currency, at: CustomDate) => {
  return cashFlows
    .filter(c => filterActive(at, c))
    .map(c => {
      return {
        entry: c,
        rate: rate(at, timeFrame, c)
      }
    })
    .reduce((acc, cur) => {
      if (acc.currency !== cur.rate.currency) {
        throw new Error("Only preferred currency supported at the moment.")
      }
      return {
        ...acc,
        amount: cur.entry.type === 'income' ? acc.amount + cur.rate.amount : acc.amount - cur.rate.amount,
      }
    }, { amount: 0.0, currency: currency, timeFrame: timeFrame })
}

export const selectIncomeSinceStartOfPreferredTimeFrame = (state: RootState): MonetaryAmount => {
  // history
  const start = startOfTimeFrame(
    state.environment.currentTime,
    state.settings.preferredTimeFrame
  )

  const history = selectDailyRates(
    start,
    startOfTimeFrame(state.environment.currentTime, 'DAY'),
    state.finance.cashFlow,
    state.settings.preferredCurrency,
    true
  )
    .reduce((acc, cur) => {
      return sum(acc, cur)
    }, { amount: 0, currency: state.settings.preferredCurrency })

  // today
  const rate = rateAt(state.finance.cashFlow, 'DAY', state.settings.preferredCurrency, state.environment.currentTime);
  const elapsedSeconds = currentTimeFrameElapsedSeconds(
    state.environment.currentTime,
    'DAY'
  );
  const totalSeconds = calculateTimeFrameSeconds(
    'DAY',
    state.environment.currentTime
  );

  return {
    amount: history.amount + (rate.amount * (elapsedSeconds / totalSeconds)),
    currency: rate.currency
  }
}

export const selectDailyRates = (start: CustomDate, end: CustomDate, cashFlow: CashFlowEntry[], currency: Currency, exclusive: boolean): MonetaryAmountRate[] => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const rates = []
  for (let i = startDate.getTime() / 1000; i <= endDate.getTime() / 1000 - (exclusive ? 1 : 0); i += calculateTimeFrameSeconds('DAY', start)) {
    rates.push(rateAt(cashFlow, 'DAY', currency, new Date(i * 1000).toISOString()))
  }

  return rates
}