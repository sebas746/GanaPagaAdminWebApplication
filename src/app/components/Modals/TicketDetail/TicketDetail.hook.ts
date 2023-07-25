import {useEffect, useReducer, useState} from 'react'
import {ITicketResponse} from '../../../../types/Ticket.types'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useQuery} from 'react-query'

enum TicketDetailAction {
  SET_TICKET_ID = 'SET_TICKET_ID',
  SET_TICKET_MODAL_SHOW = 'SET_TICKET_MODAL_SHOW',
  SET_TICKET_DETAIL = 'SET_TICKET_DETAIL',
}

interface TicketDetailState {
  type: TicketDetailAction
  payload: string | boolean | ITicketResponse
}

interface TicketInfoDetailState {
  ticketId: string
  ticketModalShow: boolean
  ticketDetail: ITicketResponse
}

export const ticketDetailReducer = (state: TicketInfoDetailState, action: TicketDetailState) => {
  switch (action.type) {
    case TicketDetailAction.SET_TICKET_ID:
      return {
        ...state,
        ticketId: action.payload as string,
      }
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
    default:
      return state
  }
}
export const useTicketDetail = () => {
  const [ticketDetailState, dispatchTicketDetail] = useReducer(ticketDetailReducer, {
    ticketId: '',
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

  const handleCloseTicketModal = () => {
    setTicketId('')
    setTicketModalShow(false)
    setRefreshCount(0)
  }

  const setTicketId = (payload: string) => {
    dispatchTicketDetail({
      type: TicketDetailAction.SET_TICKET_ID,
      payload,
    })
    setTicketModalShow(true)
    setIsInitialRun(false)
    setRefreshCount((prevCount) => prevCount + 1)
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
      return await axios.get(`/Ticket/get-ticket-by-id/${ticketDetailState.ticketId}`)
    },
    {
      enabled: !isInitialRun,
    }
  )

  useEffect(() => {
    if (!isFetching && ticketDetailState.ticketId !== '') {
      getTicketDetail()
    }
  }, [ticketDetailState.ticketId, refreshCount])

  useEffect(() => {
    if (!isFetching && ticketDetailData) {
      setTicketDetail(ticketDetailData?.data.response)
      setTicketModalShow(true)
    }
  }, [isFetching, ticketDetailData])

  return {
    isTicketDetailLoading: isFetching,
    ticketDetailState,
    setTicketId,
    setTicketModalShow,
    handleCloseTicketModal,
    refreshCount,
  }
}
