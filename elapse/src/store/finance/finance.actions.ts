import { createAction } from "@reduxjs/toolkit";
import { CashFlowEntry } from "./finance.state";

export const addCashFlowEntry = createAction<CashFlowEntry>('finance/addCashFlowEntry')
export const removeCashFlowEntry = createAction<CashFlowEntry>('finance/removeCashFlowEntry')