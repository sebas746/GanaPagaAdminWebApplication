export interface ISalesPaymentReport {
  usdTotalSales: number
  usdTotalPaid: number
  usdTotalProfit: number
  vesTotalSales: number
  vesTotalPaid: number
  vesTotalProfit: number
}

export interface IDonutSalesPaymentReport {
  totalSales: number
  totalPaid: number
  totalProfit: number
}

export enum ReportTypes {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}
