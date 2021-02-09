import { SettingsState } from "./settings.state";
import { createReducer } from "@reduxjs/toolkit";
import { setPreferredCurrency, setPreferredTimeFrame, setShowTip, setShowWizard } from "./settings.actions";

const initialSettingsState: SettingsState = {
  preferredCurrency: 'CHF',
  preferredTimeFrame: 'DAY',
  showTip: true,
  showWizard: true
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

  builder.addCase(setShowTip, (state, action) => {
    return {
      ...state,
      showTip: action.payload
    }
  })

  builder.addCase(setShowWizard, (state, action) => {
    return {
      ...state,
      showWizard: action.payload
    }
  })
})