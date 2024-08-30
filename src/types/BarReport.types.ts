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
  totalSalesSeller: ISalesSalePointDetailBarReport[]
}

export interface ISalesSalePointDetailBarReport {
  totalSales: number
  salePoint: string
}
