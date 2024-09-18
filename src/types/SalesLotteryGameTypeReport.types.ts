export interface ISalesLotteryGameTypeReportQueryParams {
  baseUrl: string
  reportType: string
  gameType?: string
  promoterId?: string
}

export interface ISalesLotteryGameTypeDetailReport {
  totalSales: number
  lotteryName: string
}

export interface ISalesLotteryGameTypeBarReport {
  currencyCode: string
  salesLotteryGameTypeList: ISalesLotteryGameTypeDetailReport[]
}
