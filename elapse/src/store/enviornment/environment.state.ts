import { CustomDate } from "../../model/CustomDate";

export interface EnvironmentState {
  currentTime: CustomDate
  useFakeTime: boolean
  dataModelVersion: number
  wizardComplete: boolean
}