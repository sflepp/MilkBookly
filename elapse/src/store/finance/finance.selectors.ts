import { RootState } from "../reducer";
import { rate } from "../../model/MonetaryAmountRate.model";
import { calculateTimeFrameSeconds, currentTimeFrameElapsedSeconds, TimeFrame } from "../../model/TimeFrame.model";
import { Currency, MonetaryAmount } from "../../model/MonetaryAmount.model";
import { CashFlowEntry, filterActive } from "./finance.state";
import { CustomDate } from "../../model/CustomDate";

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
  const rate = selectCurrentTimeFrameRate(state);
  const elapsedSeconds = currentTimeFrameElapsedSeconds(state.environment.currentTime, state.settings.preferredTimeFrame);
  const totalSeconds = calculateTimeFrameSeconds(state.settings.preferredTimeFrame, state.environment.currentTime);

  return {
    amount: rate.amount * (elapsedSeconds / totalSeconds),
    currency: rate.currency
  }
}

