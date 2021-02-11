import { RootState } from "../reducer";
import { rate } from "../../model/MonetaryAmountRate.model";
import { calculateTimeFrameSeconds, currentTimeFrameElapsedSeconds } from "../../model/TimeFrame.model";
import { MonetaryAmount } from "../../model/MonetaryAmount.model";

export const selectCurrentTimeFrameRate = (state: RootState) => {
  return state.finance.cashFlow
      .filter(c => new Date(state.environment.currentTime).getTime() > new Date(c.start).getTime())
      .filter(c => {
        return c.end === undefined || new Date(state.environment.currentTime).getTime() < new Date(c.end).getTime()
      })
      .map(c => {
        return {
          entry: c,
          rate: rate(state.environment.currentTime, state.settings.preferredTimeFrame, c)
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
      }, { amount: 0.0, currency: state.settings.preferredCurrency, timeFrame: state.settings.preferredTimeFrame })
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

