import { TimeFrame, calculateTimeFrameSeconds } from "./TimeFrame.model";

export type CustomDate = string;

export const addTimeFrame = (reference: CustomDate, timeFrame: TimeFrame): CustomDate => {
  const referenceDate = new Date(reference);
  const referenceTime = referenceDate.getTime();
  return new Date(referenceTime + (calculateTimeFrameSeconds(timeFrame, reference) * 1000)).toISOString()
}

export const addNTimeFrames = (reference: CustomDate, timeFrame: TimeFrame, n: number) => {
  let current = reference;
  for (let i = 0; i < n; i++) {
    current = addTimeFrame(current, timeFrame)
  }
  return current;
}