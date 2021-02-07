export type TimeFrame = 'YEAR' | 'MONTH' | 'WEEK' | 'DAY'

export const AllTimeFrames: TimeFrame[] = ['YEAR', 'MONTH', 'WEEK', 'DAY']

export const TimeFrameTranslations: {[key: string]: string} = {
  'YEAR': 'Jährlich',
  'MONTH': 'Monatlich',
  'WEEK': 'Wöchentlich',
  'DAY': 'Täglich'
}