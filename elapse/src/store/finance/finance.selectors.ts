import { RootState } from "../reducer";
import { rate } from "../../model/MonetaryAmountRate.model";
import { currentTimeFrameElapsedSeconds, currentTimeFrameSeconds } from "../../model/TimeFrame.model";
import { MonetaryAmount } from "../../model/MonetaryAmount.model";

export const selectCurrentTimeFrameRate = (state: RootState) => {
  return state.finance.cashFlow
      .map(c => {
        return {
          entry: c,
          rate: rate(state.settings.preferredTimeFrame, c)
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
  const elapsedSeconds = currentTimeFrameElapsedSeconds(state.settings.preferredTimeFrame);
  const totalSeconds = currentTimeFrameSeconds(state.settings.preferredTimeFrame);

  return {
    amount: rate.amount * (elapsedSeconds / totalSeconds),
    currency: rate.currency
  }
}

