export interface MonetaryAmount {
  amount: number,
  currency: Currency
}

export type Currency = 'CHF' | 'EUR' | 'USD'

export const AllCurrencies: Currency[] = ['CHF', 'EUR', 'USD']


export const devide = (value: MonetaryAmount, by: number) => {
  return {
    amount: value.amount / by,
    currency: value.currency
  }
}

export const multiply = (value: MonetaryAmount, by: number) => {
  return {
    amount: value.amount * by,
    currency: value.currency
  }
}

export const sum = (a: MonetaryAmount, b: MonetaryAmount) => {
  if (a.currency !== b.currency) {
    throw new Error(`Cannot sum monetary amounts with different currencies (${JSON.stringify(a)} + ${JSON.stringify(b)})`)
  }

  return {
    amount: a.amount + b.amount,
    currency: a.currency
  }
}