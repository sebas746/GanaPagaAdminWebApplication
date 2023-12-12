export interface ISalesSellerResponse {
  totalSales: number
  totalPaid: number
  currencyName: string
  currencyCode: string
  currentDate: string
  sellerName: string
  sellerEmail: string
  seller: ISellerResponse
  currency: ICurrencyResponse
}

export interface ISellerResponse {
  sellerId: number
  sellerFirstName: string
  sellerLastName: string
  sellerEmail: string
}

export interface ISalePointResponse {
  salePointId: number
  salePointName: string
  salePointAddress: string
}

export interface ISalesSellerReportQueryParams {
  baseUrl: string
  pageIndex: number
  pageSize: number
  initialDate: string
  endDate: string
  sellerId?: string
}

export interface ICurrencyResponse {
  currencyId: number
  currencyCode: string
  currencyName: string
}
