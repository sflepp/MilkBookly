import { EnvironmentState } from "./environment.state";
import { createReducer } from "@reduxjs/toolkit";
import { setCurrentTime, setUseFakeTime, setWizardComplete, tickTime } from "./enviornment.actions";

const initialEnvironmentState: EnvironmentState = {
  currentTime: new Date().toISOString(),
  useFakeTime: false,
  dataModelVersion: 4,
  wizardComplete: false
}

export const EnvironmentReducer = createReducer(initialEnvironmentState, (builder) => {
  builder.addCase(setCurrentTime, (state, action) => {
    return {
      ...state,
      currentTime: action.payload
    }
  })

  builder.addCase(setUseFakeTime, (state, action) => {
    console.log('use real time')
    return {
      ...state,
      useFakeTime: action.payload
    }
  })

  builder.addCase(tickTime, (state, action) => {
    if (state.useFakeTime) {
      console.log('Using fake time: ' + state.currentTime)
      return {
        ...state,
        currentTime: new Date(new Date(state.currentTime).getTime() + 1000).toISOString()
      }
    } else {
      return {
        ...state,
        currentTime: new Date().toISOString()
      }
    }
  })

  builder.addCase(setWizardComplete, (state, action) => {
    return {
      ...state,
      wizardComplete: action.payload
    }
  })
})