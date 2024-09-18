export interface ISalesGameTypeReportQueryParams {
  reportType: string
  gameType?: string
  promoterId?: string
}

export interface ISalesGameTypeDetailReport {
  totalSales: number
  gameType: string
  gameTypeName: string
}

export interface ISalesGameTypeBarReport {
  currencyCode: string
  salesGameTypeList: ISalesGameTypeDetailReport[]
}
