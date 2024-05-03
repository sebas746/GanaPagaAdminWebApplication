import {TicketStatusEnum} from '../../../../../types/TicketReport.types'
import {
  mapTicketStatusToBarColor,
  mapTicketStatusToColor,
  mapTicketStatusToText,
} from '../../../../constants/ticket-state.constants'

export const useTicketReportTable = () => {
  const stateToText = (ticketStatus: string | TicketStatusEnum) => {
    return mapTicketStatusToText[(ticketStatus as TicketStatusEnum) || TicketStatusEnum.pending]
  }

  const stateToColor = (ticketStatus: string | TicketStatusEnum) => {
    return mapTicketStatusToColor[(ticketStatus as TicketStatusEnum) || TicketStatusEnum.pending]
  }

  const stateToBarColor = (ticketStatus: string | TicketStatusEnum) => {
    return mapTicketStatusToBarColor[(ticketStatus as TicketStatusEnum) || TicketStatusEnum.pending]
  }

  return {
    stateToColor,
    stateToText,
    stateToBarColor,
  }
}
