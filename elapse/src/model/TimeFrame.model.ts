export type TimeFrame = 'YEAR' | 'MONTH' | 'WEEK' | 'DAY' | 'HOUR'

export const AllTimeFrames: TimeFrame[] = ['YEAR', 'MONTH', 'WEEK', 'DAY', 'HOUR']

export const TimeFrameTranslations: {[key: string]: string} = {
  'YEAR': 'Jährlich',
  'MONTH': 'Monatlich',
  'WEEK': 'Wöchentlich',
  'DAY': 'Täglich',
  'HOUR': 'Stündlich',
  'SECOND': 'Sekündlich'
}

export const TimeFrameAbbrevations: {[key: string]: string} = {
  'YEAR': 'Y',
  'MONTH': 'M',
  'WEEK': 'W',
  'DAY': 'd',
  'HOUR': 'h',
  'SECOND': 's'
}