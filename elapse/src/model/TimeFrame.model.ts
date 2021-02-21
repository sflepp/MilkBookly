import { CustomDate } from "./CustomDate";

export type TimeFrame = 'YEAR' | 'MONTH' | 'WEEK' | 'DAY'

export const AllTimeFrames: TimeFrame[] = ['YEAR', 'MONTH', 'WEEK', 'DAY']

export const TimeFrameTranslationsAdjective: { [key: string]: string } = {
  'YEAR': 'Jährlich',
  'MONTH': 'Monatlich',
  'WEEK': 'Wöchentlich',
  'DAY': 'Täglich'
}

export const TimeFrameAbbrevations: { [key: string]: string } = {
  'YEAR': 'Y',
  'MONTH': 'M',
  'WEEK': 'W',
  'DAY': 'd'
}

export const TimeFrameTranslationsNoun: { [key: string]: string } = {
  'YEAR': 'Jahr',
  'MONTH': 'Monat',
  'WEEK': 'Woche',
  'DAY': 'Tag'
}

export const TimeFrameTranslationsNounPlural: { [key: string]: string } = {
  'YEAR': 'Jahre',
  'MONTH': 'Monate',
  'WEEK': 'Wochen',
  'DAY': 'Tage'
}

export const StartOfTimeFrameTranslations: { [key: string]: string } = {
  'YEAR': 'Dieses Jahr',
  'MONTH': 'Diesen Monat',
  'WEEK': 'Diese Woche',
  'DAY': 'Heute'
}

export interface TimeFrameAmount {
  timeFrame: TimeFrame,
  amount: number
}

export const calculateTimeFrameSeconds = (timeFrame: TimeFrame, reference: CustomDate): number => {
  const referenceDate = new Date(reference);
  switch (timeFrame) {
    case "YEAR":
      const year = referenceDate.getFullYear();
      const firstOfYear = new Date(year, 0, 1).getTime();
      const lastOfYear = new Date(year, 11, 31, 23, 59, 59, 999).getTime()
      return (lastOfYear - firstOfYear) / 1000
    case "MONTH":
      return new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0).getDate() * 3600 * 24;
    case "WEEK":
      return 3600 * 24 * 7;
    case "DAY":
      return 3600 * 24;
  }
}

export const calculateTimeFrameYears = (timeFrame: TimeFrame, reference: CustomDate): number => {
  const referenceDate = new Date(reference);
  const isLeapYear = (year: number) => {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
  const daysOfYear = (year: number) => {
    return isLeapYear(year) ? 366 : 365
  }

  switch (timeFrame) {
    case 'YEAR':
      return 1;
    case 'MONTH':
      return 1 / 12
    case 'WEEK':
      return 1 / daysOfYear(referenceDate.getFullYear()) * 7;
    case 'DAY':
      return 1 / daysOfYear(referenceDate.getFullYear());
  }
}

export const startOfTimeFrame = (now: CustomDate, timeFrame: TimeFrame): CustomDate => {
  const nowDate = new Date(now);
  let startOfTimeFrame: Date;
  switch (timeFrame) {
    case "YEAR":
      startOfTimeFrame = new Date(nowDate.getFullYear(), 0, 1);
      break;
    case "MONTH":
      startOfTimeFrame = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
      break;
    case "WEEK":
      startOfTimeFrame = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
      startOfTimeFrame.setDate(startOfTimeFrame.getDate() - startOfTimeFrame.getDay() + 1);
      break;
    case "DAY":
      startOfTimeFrame = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
      break;
  }

  return startOfTimeFrame.toISOString()
}

export const currentTimeFrameElapsedSeconds = (now: CustomDate, timeFrame: TimeFrame) => {
  const nowDate = new Date(now);
  const start = new Date(startOfTimeFrame(now, timeFrame))

  return (nowDate.getTime() - start.getTime()) / 1000;
}

export const timeFrameAmountCeil = (amountOfSeconds: number): TimeFrameAmount => {

  const oneYear = 365 * 24 * 60 * 60
  const oneMonth = (365 / 12) * 24 * 60 * 60
  const oneWeek = 7 * 24 * 60 * 60
  const oneDay = 24 * 60 * 60

  if (amountOfSeconds > oneYear * 2) {
    const years = Math.ceil(amountOfSeconds / oneYear)

    return {
      timeFrame: 'YEAR',
      amount: years
    }
  }

  if (amountOfSeconds > oneMonth * 2) {
    const months = Math.ceil(amountOfSeconds / oneMonth);

    return {
      timeFrame: 'MONTH',
      amount: months
    }
  }

  if (amountOfSeconds > oneWeek * 2) {
    const weeks = Math.ceil(amountOfSeconds / oneWeek);

    return {
      timeFrame: 'WEEK',
      amount: weeks
    }
  }

  const days = Math.ceil(amountOfSeconds / oneDay)

  return {
    timeFrame: 'DAY',
    amount: days
  }
};
