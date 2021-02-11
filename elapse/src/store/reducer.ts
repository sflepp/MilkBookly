import { combineReducers } from '@reduxjs/toolkit';
import { FinanceReducer } from "./finance/finance.reducer";
import { SettingsReducer } from "./settings/settings.reducer";
import { EnvironmentReducer } from "./enviornment/environment.reducer";

const rootReducer = combineReducers({
  environment: EnvironmentReducer,
  finance: FinanceReducer,
  settings: SettingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
