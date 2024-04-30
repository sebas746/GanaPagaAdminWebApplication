import {TicketStatusEnum} from '../../../../../types/TicketReport.types'
import {
  mapTicketStatusToColor,
  mapTicketStatusToText,
} from '../../../../constants/ticket-state.constants'

export const useTicketRerportTable = () => {
  const stateToText = (ticketStatus: string | TicketStatusEnum) => {
    return mapTicketStatusToText[(ticketStatus as TicketStatusEnum) || TicketStatusEnum.pending]
  }

  const stateToColor = (ticketStatus: string | TicketStatusEnum) => {
    return mapTicketStatusToColor[(ticketStatus as TicketStatusEnum) || TicketStatusEnum.pending]
  }

  return {
    stateToColor,
    stateToText,
  }
}
