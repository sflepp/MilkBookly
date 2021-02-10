import { start } from "repl";

export type TimeFrame = 'YEAR' | 'MONTH' | 'WEEK' | 'DAY' | 'HOUR' | 'MINUTE' | 'SECOND'

export const AllTimeFrames: TimeFrame[] = ['YEAR', 'MONTH', 'WEEK', 'DAY', 'HOUR', 'MINUTE', 'SECOND']

export const TimeFrameTranslations: {[key: string]: string} = {
  'YEAR': 'Jährlich',
  'MONTH': 'Monatlich',
  'WEEK': 'Wöchentlich',
  'DAY': 'Täglich',
  'HOUR': 'Stündlich',
  'MINUTE': 'Minütlich',
  'SECOND': 'Sekündlich'
}

export const TimeFrameAbbrevations: {[key: string]: string} = {
  'YEAR': 'Y',
  'MONTH': 'M',
  'WEEK': 'W',
  'DAY': 'd',
  'HOUR': 'h',
  'MINUTE': 'min',
  'SECOND': 's'
}

export const TimeFrameTranslations2: {[key: string]: string} = {
  'YEAR': 'Jahr',
  'MONTH': 'Monat',
  'WEEK': 'Woche',
  'DAY': 'Tag',
  'HOUR': 'Stunde',
  'MINUTE': 'Minute',
  'SECOND': 'Sekunde'
}

export const StartOfTimeFrameTranslations: {[key: string]: string} = {
  'YEAR': 'Dieses Jahr',
  'MONTH': 'Diesen Monat',
  'WEEK': 'Diese Woche',
  'DAY': 'Heute',
  'HOUR': 'Diese Stunde',
  'MINUTE': 'Diese Minute',
  'SECOND': 'Jetzt'
}

export const currentTimeFrameSeconds = (timeFrame: TimeFrame) => {
  switch (timeFrame) {
    case "YEAR":
      const year = new Date().getFullYear();
      const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
      return daysInYear * 3600 * 24;
    case "MONTH":
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() * 3600 * 24;
    case "WEEK":
      return 3600 * 24 * 7;
    case "DAY":
      return 3600 * 24;
    case "HOUR":
      return 3600;
    case "MINUTE":
      return 60
    case "SECOND":
      return 1;
  }
}

export const currentTimeFrameElapsedSeconds = (timeFrame: TimeFrame) => {
  const now = new Date();
  let startOfTimeFrame: Date;
  switch (timeFrame) {
    case "YEAR":
      startOfTimeFrame = new Date(now.getFullYear(), 0, 1);
      break;
    case "MONTH":
      startOfTimeFrame = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "WEEK":
      startOfTimeFrame = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      startOfTimeFrame.setDate(startOfTimeFrame.getDate() - startOfTimeFrame.getDay() + 1);
      break;
    case "DAY":
      startOfTimeFrame = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "HOUR":
      startOfTimeFrame = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
      break;
    case "MINUTE":
      startOfTimeFrame = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
      break;
    case "SECOND":
      startOfTimeFrame = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
      break;
  }

  return (now.getTime() - startOfTimeFrame.getTime()) / 1000;
}