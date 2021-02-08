import { createAction } from "@reduxjs/toolkit";
import { CashFlowEntry, UUID } from "./finance.state";

export const addCashFlowEntry = createAction<CashFlowEntry>('finance/addCashFlowEntry')
export const removeCashFlowEntry = createAction<UUID>('finance/removeCashFlowEntry')