import { RootState } from "../reducer";
import { rate } from "../../model/MonetaryAmountRate.model";

export const selectTotalRate = (state: RootState) => {
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