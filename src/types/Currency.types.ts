export enum CurrencyCode {
  USD = 'USD',
  VES = 'VES',
}

export enum CurrencyId {
  USD = 1,
  VES = 2,
}

export const currencies = [
  {currencyId: 1, currencyName: 'Dólar', currencyCode: 'USD'},
  {currencyId: 2, currencyName: 'Bolivar', currencyCode: 'VES'},
  // Add more currencies as needed
]
