export const formatCurrency = (value: number, currencyCode: string) => {
  switch (currencyCode) {
    case 'VES':
      return new Intl.NumberFormat('es-VE', {style: 'currency', currency: 'VES'}).format(value)
    default:
      return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value)
  }
}
