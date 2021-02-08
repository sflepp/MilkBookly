import { combineReducers } from '@reduxjs/toolkit';
import { FinanceReducer } from "./finance/finance.reducer";
import { SettingsReducer } from "./settings/settings.reducer";

const rootReducer = combineReducers({
  finance: FinanceReducer,
  settings: SettingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
