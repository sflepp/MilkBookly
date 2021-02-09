import { Currency } from "../../model/MonetaryAmount.model";
import { TimeFrame } from "../../model/TimeFrame.model";

export interface SettingsState {
  preferredCurrency: Currency
  preferredTimeFrame: TimeFrame,
  showTip: boolean
  showWizard: boolean
}