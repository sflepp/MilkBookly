import { TimeFrame, calculateTimeFrameSeconds } from "./TimeFrame.model";

export type CustomDate = string;

export const addTimeFrame = (reference: CustomDate, timeFrame: TimeFrame): CustomDate => {
  const referenceDate = new Date(reference);
  const referenceTime = referenceDate.getTime();
  return new Date(referenceTime + (calculateTimeFrameSeconds(timeFrame, reference) * 1000)).toISOString()
}

export const substractTimeFrame = (reference: CustomDate, timeFrame: TimeFrame): CustomDate => {
  const referenceDate = new Date(reference);
  const referenceTime = referenceDate.getTime();
  return new Date(referenceTime - (calculateTimeFrameSeconds(timeFrame, reference) * 1000)).toISOString()
}

export const addNTimeFrames = (reference: CustomDate, timeFrame: TimeFrame, n: number): CustomDate => {
  let current = reference;

  if (n > 0) {
    for (let i = 0; i < n; i++) {
      current = addTimeFrame(current, timeFrame)
    }
  } else if(n < 0) {
    for (let i = n; i < 0; i++) {
      current = substractTimeFrame(current, timeFrame)
    }
  } else {
    current = reference
  }

  return current;
}

export const isBefore = (a: CustomDate, b: CustomDate) => {
  return new Date(a).getTime() > new Date(b).getTime()
}

export const isAfter = (a: CustomDate, b: CustomDate) => {
  return new Date(a).getTime() < new Date(b).getTime()
}

