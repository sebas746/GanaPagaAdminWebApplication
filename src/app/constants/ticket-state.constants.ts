import {TicketStatusEnum} from '../../types/TicketReport.types'

export const mapTicketStatusToText: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.pending]: 'Pendiente',
  [TicketStatusEnum.loser]: 'Perdedor',
  [TicketStatusEnum.pendingPayment]: 'Pendiente Pago',
  [TicketStatusEnum.winner]: 'Ganador',
  [TicketStatusEnum.cancelled]: 'Anulado',
}

export const mapTicketStatusToLinkColor: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.pending]: 'btn-active-color-warning',
  [TicketStatusEnum.loser]: 'btn-active-color-danger',
  [TicketStatusEnum.pendingPayment]: 'btn-active-color-info',
  [TicketStatusEnum.winner]: 'btn-active-color-success',
  [TicketStatusEnum.cancelled]: 'btn-active-color-dark',
}

export const mapTicketStatusToBarColor: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.pending]: 'bg-warning',
  [TicketStatusEnum.loser]: 'bg-danger',
  [TicketStatusEnum.pendingPayment]: 'bg-info',
  [TicketStatusEnum.winner]: 'bg-success',
  [TicketStatusEnum.cancelled]: 'bg-dark',
}

export const mapTicketStatusToColor: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.pending]: 'text-warning',
  [TicketStatusEnum.loser]: 'text-danger',
  [TicketStatusEnum.pendingPayment]: 'text-info',
  [TicketStatusEnum.winner]: 'text-success',
  [TicketStatusEnum.cancelled]: 'text-dark',
}
