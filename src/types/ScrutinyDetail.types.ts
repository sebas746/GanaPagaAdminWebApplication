export interface IScrutinyDetailResponse {
  raffleId: number
  raffleName: string
  raffleDrawTime: string
  raffleResult: string
  raffleResultName: string
  scrutinies: Scrutiny[]
}

export interface Scrutiny {
  currencyId: number
  currencyName: string
  currencyCode: string
  totalSales: number
  totalWinners: number
  totalToPay: number
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
}
