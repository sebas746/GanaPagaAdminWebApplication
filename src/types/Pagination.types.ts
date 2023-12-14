export interface IpaginationResponse<T> {
  items: T[]
  totalCount: number
}

export interface IpaginationSalesReportResponse<T> {
  items: T[]
  totalCount: number
  salesTotals: SalesTotal[]
}

export interface SalesTotal {
  totalSales: number
  totalPaid: number
  totalProfit: number
  currencyName: string
  currencyCode: string
}
