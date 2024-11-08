export interface ISalesSalePointReport {
  totalSales: number
  totalPaid: number
  currencyName: string
  currencyCode: string
  currentDate: string
  salePointName: string
  salePointAddress: string
  salePoint: ISalePointResponse
}

export interface ISalesSalePointReportQueryParams {
  baseUrl: string
  pageIndex: number
  pageSize: number
  initialDate: string
  endDate: string
  salePointId?: string
  promoterId?: string
}

export interface ISalesSalePointFilteredReportQueryParams {
  baseUrl: string
  initialDate: string
  endDate: string
  salePointId?: string
  promoterId?: string
}

export interface ISalesSalePointReportQueryParams {
  baseUrl: string
  pageIndex: number
  pageSize: number
  initialDate: string
  endDate: string
  salePointId?: string
  promoterId?: string
}

export interface ISalePointResponse {
  salePointId: number
  salePointName: string
  salePointAddress: string
}

export interface ISalesPaymentReportQueryParams {
  baseUrl: string
  reportType: string
  promoterId?: string
}
