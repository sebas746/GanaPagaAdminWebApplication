export interface ITicketResponse {
  ticketId: number
  ticketNumber: string
  ticketCompanyName: string
  bets: IBet[]
  salePointName: any
  ticketCreatedAt: string
  ticketDueDate: string
  currencyCode: any
  ticketTotal: number
}

export interface IBet {
  lotteryName: string
  raffleName: string
  betDetail: IBetDetail[]
  betEndDate: string
}

export interface IBetDetail {
  betValue: string
  betTotal: number
}
