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

export const calculateTimeFrameSeconds = (timeFrame: TimeFrame, reference: CustomDate): number => {
  const referenceDate = new Date(reference);
  switch (timeFrame) {
    case "YEAR":
      const year = referenceDate.getFullYear();
      const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
      return daysInYear * 3600 * 24;
    case "MONTH":
      return new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0).getDate() * 3600 * 24;
    case "WEEK":
      return 3600 * 24 * 7;
    case "DAY":
      return 3600 * 24;
  }
}

export const currentTimeFrameElapsedSeconds = (now: CustomDate, timeFrame: TimeFrame) => {
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

  return (nowDate.getTime() - startOfTimeFrame.getTime()) / 1000;
}