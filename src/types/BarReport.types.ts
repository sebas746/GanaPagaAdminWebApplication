export interface ISalesSellersBarReport {
  currencyCode: string
  salesSellerList: ISalesSellersDetailBarReport[]
}

export interface ISalesSellersDetailBarReport {
  totalSales: number
  seller: string
}

export interface ISalesSalePointBarReport {
  currencyCode: string
  salesSalePointList: ISalesSalePointDetailBarReport[]
}

export interface ISalesSalePointDetailBarReport {
  totalSales: number
  salePoint: string
}
