export interface MonetaryAmount {
  amount: number,
  currency: Currency
}

export type Currency = 'CHF' | 'EUR' | 'USD'

export const AllCurrencies: Currency[] = ['CHF', 'EUR', 'USD']