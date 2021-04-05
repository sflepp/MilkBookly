import { createAction } from "@reduxjs/toolkit";
import { CustomDate } from "../../model/CustomDate";

export const setUseFakeTime = createAction<boolean>('environment/setUseRealTime')
export const setCurrentTime = createAction<CustomDate>('environment/setCurrentTime')
export const tickTime = createAction('environment/tickTime')
export const setWizardComplete = createAction<boolean>('environment/setWizardComplete')