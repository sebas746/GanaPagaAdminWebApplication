export interface ITicketReportResponse {
  totalSales: number
  currencyName: string
  currencyCode: string
  ticketsCount: number
  ticketsCancelledCount: number
  ticketsPendingCount: number
  ticketsPendingPaymentCount: number
  ticketsWinnerCount: number
  ticketLoserCount: number
  tickets: ITicketResponse[]
}

export interface ITicketResponse {
  ticketNumber: string
  ticketId: string
  ticketTotal: number
  ticketCreatedAt: string
  ticketSoldByUserId: string
  ticketStatus: TicketStatusEnum
  ticketHasRecalculatedBet: boolean
}

export enum TicketStatusEnum {
  pending = 0,
  loser = 1,
  pendingPayment = 2,
  winner = 3,
  cancelled = 4,
}

export interface ITicketReportQueryParams {
  baseUrl: string
  pageIndex: number
  pageSize: number
  initialDate: string
  endDate: string
  currency: string
  ticketId?: string
  sellerEmail?: string
  promoterId?: string | null
  ticketStatus?: TicketStatusEnum
}
