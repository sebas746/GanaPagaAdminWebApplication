export interface IScrutinyDetailResponse {
  raffleId: number
  raffleName: string
  raffleDrawTime: string
  raffleResult: string
  raffleResultName: string
  totalSalesDollar: number
  totalSalesBolivar: number
  totalToPayDollar: number
  totalToPayBolivar: number
  scrutinies: Scrutiny[]
}

export interface Scrutiny {
  currencyId: number
  currencyName: string
  currencyCode: string
  totalWinners: number
  betReturnedRate: number
  winners: Winner[]
}

export interface Winner {
  scrutinyId: number
  ticketNumber: string
  betId: number
  betValue: number
  totalToPay: number
  isPaid: boolean
  currencyCode: string
  gameTypeLabel?: string
}
