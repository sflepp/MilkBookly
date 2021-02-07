import { combineReducers } from '@reduxjs/toolkit';
import { FinanceReducer } from "./finance/finance.reducer";

const rootReducer = combineReducers({
  finance: FinanceReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
