import { createAction } from "@reduxjs/toolkit";
import { Currency } from "../../model/MonetaryAmount.model";
import { TimeFrame } from "../../model/TimeFrame.model";

export const setPreferredCurrency = createAction<Currency>('settings/setPreferredCurrency')
export const setPreferredTimeFrame = createAction<TimeFrame>('settings/setPreferredTimeFrame')
export const setShowWizard = createAction<boolean>('settings/setShowWizard')
export const setShowTip = createAction<boolean>('settings/setShowTip')