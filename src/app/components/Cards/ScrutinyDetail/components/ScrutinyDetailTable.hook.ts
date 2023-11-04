import {useEffect, useReducer, useState} from 'react'
import {useQuery} from 'react-query'
import axios from '../../../../config/http-common'
import {ITicketResponse} from '../../../../../types/Ticket.types'
import {ReactQueryResponse} from '../../../../../types/Generics'

enum TicketDetailAction {
  SET_TICKET_MODAL_SHOW = 'SET_TICKET_MODAL_SHOW',
  SET_TICKET_DETAIL = 'SET_TICKET_DETAIL',
  SET_RESET = 'SET_RESET',
}

interface TicketDetailState {
  type: TicketDetailAction
  payload: string | boolean | ITicketResponse | void
}

interface TicketInfoDetailState {
  ticketModalShow: boolean
  ticketDetail: ITicketResponse
}

export const ticketDetailReducer = (state: TicketInfoDetailState, action: TicketDetailState) => {
  switch (action.type) {
    case TicketDetailAction.SET_TICKET_MODAL_SHOW:
      return {
        ...state,
        ticketModalShow: action.payload as boolean,
      }
    case TicketDetailAction.SET_TICKET_DETAIL:
      return {
        ...state,
        ticketDetail: action.payload as ITicketResponse,
      }
    case TicketDetailAction.SET_RESET:
      return {
        ticketModalShow: false,
        ticketDetail: {} as ITicketResponse,
      }
    default:
      return state
  }
}
export const useScrutinyDetail = (ticketId: string) => {
  const [ticketDetailState, dispatchTicketDetail] = useReducer(ticketDetailReducer, {
    ticketModalShow: false,
    ticketDetail: {} as ITicketResponse,
  })
  const [isInitialRun, setIsInitialRun] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  const setTicketModalShow = (payload: boolean) => {
    dispatchTicketDetail({
      type: TicketDetailAction.SET_TICKET_MODAL_SHOW,
      payload,
    })
  }

  const setReset = (payload: void) => {
    dispatchTicketDetail({
      type: TicketDetailAction.SET_RESET,
      payload,
    })
  }

  const handleCloseTicketModal = () => {
    setTicketModalShow(false)
    setRefreshCount(0)
    setReset()
    setIsInitialRun(false)
  }

  const setTicketDetail = (payload: ITicketResponse) => {
    dispatchTicketDetail({
      type: TicketDetailAction.SET_TICKET_DETAIL,
      payload,
    })
  }

  const {
    data: ticketDetailData,
    isFetching,
    refetch: getTicketDetail,
  } = useQuery<ReactQueryResponse<ITicketResponse>>(
    'get-ticket-detail',
    async () => {
      return await axios.get(`/Ticket/get-ticket-by-id/${ticketId}`)
    },
    {
      enabled: !isInitialRun,
    }
  )

  useEffect(() => {
    if (!isFetching && ticketId !== '') {
      console.log(ticketId)
      getTicketDetail()
    }
  }, [ticketId, refreshCount])

  useEffect(() => {
    if (!isFetching && ticketDetailData) {
      setTicketDetail(ticketDetailData?.data.response)
      setTicketModalShow(true)
    }
  }, [isFetching, ticketDetailData])

  return {
    isTicketDetailLoading: isFetching,
    ticketDetailState,
    setTicketModalShow,
    handleCloseTicketModal,
    refreshCount,
  }
}
