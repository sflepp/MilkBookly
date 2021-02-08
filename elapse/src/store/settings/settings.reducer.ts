import { SettingsState } from "./settings.state";
import { createReducer } from "@reduxjs/toolkit";
import { setPreferredCurrency, setPreferredTimeFrame } from "./settings.actions";

const initialSettingsState: SettingsState = {
  preferredCurrency: 'CHF',
  preferredTimeFrame: 'DAY'
}

export const SettingsReducer = createReducer(initialSettingsState, (builder) => {
  builder.addCase(setPreferredCurrency, (state, action) => {
    return {
      ...state,
      preferredCurrency: action.payload
    }
  })

  builder.addCase(setPreferredTimeFrame, (state, action) => {
    return {
      ...state,
      preferredTimeFrame: action.payload
    }
  })
})