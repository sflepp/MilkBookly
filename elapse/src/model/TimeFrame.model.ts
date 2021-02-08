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