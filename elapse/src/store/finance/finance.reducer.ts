import { createReducer } from "@reduxjs/toolkit";
import { addCashFlowEntry, removeCashFlowEntry } from "./finance.actions";
import { FinanceState } from "./finance.state";

const initialFinanceState: FinanceState = {
  cashFlow: [
    {
      description: 'Lohn',
      startDate: new Date(),
      amount: { amount: 3000, currency: 'CHF' },
      recurrence: { type: 'continuous', repetition: 'MONTH' },
      amortization: { timeFrame: 'MONTH', fn: 'linear' },
    }
  ]
}

export const FinanceReducer = createReducer(initialFinanceState, (builder) => {
  builder.addCase(addCashFlowEntry, (state, action) => {
    return {
      ...state,
      cashFlow: [...state.cashFlow, action.payload]
    }
  })

  builder.addCase(removeCashFlowEntry, (state, action) => {
    return {
      ...state,
      cashFlow: state.cashFlow.filter(e => e !== action.payload)
    }
  })
})