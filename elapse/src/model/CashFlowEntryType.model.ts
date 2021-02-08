export type CashFlowEntryType = 'income' | 'expense'

export const AllCashFlowEntryTypes: CashFlowEntryType[] = ['income', 'expense']

export const AllCashFlowEntryTypeTranslations: { [key: string]: string } = {
  'income': 'Einnahme',
  'expense': 'Ausgabe',
}