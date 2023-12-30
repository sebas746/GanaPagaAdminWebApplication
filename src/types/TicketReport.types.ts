export interface ITicketReportResponse {
  totalSales: number
  currencyName: string
  currencyCode: string
  ticketsCount: number
  tickets: ITicketResponse[]
}

export interface ITicketResponse {
  ticketNumber: string
  ticketId: string
  ticketTotal: number
  ticketCreatedAt: string
  ticketSoldByUserId: string
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
}
