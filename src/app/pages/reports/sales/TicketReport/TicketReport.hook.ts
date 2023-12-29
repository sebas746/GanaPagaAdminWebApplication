import {useEffect, useReducer, useState} from 'react'
import {IpaginationResponse} from '../../../../../types/Pagination.types'
import {
  ISalesSellerReportQueryParams,
  ISalesSellerResponse,
  ISellerResponse,
} from '../../../../../types/SalesSellerReport.types'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import {DateTime} from 'luxon'
import axios from '../../../../config/http-common'
import {
  ITicketReportQueryParams,
  ITicketReportResponse,
} from '../../../../../types/TicketReport.types'
import {CURRENCY_USD, CURRENCY_VES} from '../../../../constants/reports.constants'

enum TicketReportKind {
  SET_USD_TICKETS = 'SET_USD_TICKETS',
  SET_VES_TICKETS = 'SET_VES_TICKETS',
  SET_PARAMS = 'SET_PARAMS',
  SET_SELLERS = 'SET_SELLERS',
  SET_SELLER_ID = 'SET_SELLER_ID',
  SET_TICKET_ID = 'SET_TICKET_ID',
}

interface TicketReportAction {
  type: TicketReportKind
  payload: ITicketReportResponse | string[] | ITicketReportQueryParams | string
}

interface TicketReportState {
  ticketReportUsdPaginated: ITicketReportResponse
  ticketReportVesPaginated: ITicketReportResponse
  params: ITicketReportQueryParams
  sellers: string[]
  ticketId: string | undefined
  sellerEmail: string | undefined
}

export const ticketReportReducer = (state: TicketReportState, action: TicketReportAction) => {
  switch (action.type) {
    case TicketReportKind.SET_USD_TICKETS:
      return {
        ...state,
        ticketReportUsdPaginated: action.payload as ITicketReportResponse,
      }
    case TicketReportKind.SET_VES_TICKETS:
      return {
        ...state,
        ticketReportVesPaginated: action.payload as ITicketReportResponse,
      }
    case TicketReportKind.SET_PARAMS:
      return {
        ...state,
        params: {
          ...state.params,
          ...(action.payload as ITicketReportQueryParams),
        },
      }
    case TicketReportKind.SET_SELLERS:
      return {
        ...state,
        sellers: action.payload as string[],
      }
    case TicketReportKind.SET_TICKET_ID:
      return {
        ...state,
        ticketId: action.payload as string,
      }
    case TicketReportKind.SET_SELLER_ID:
      return {
        ...state,
        sellerId: action.payload as string,
      }
  }
}

export const useTicketReport = () => {
  const formattedDate = DateTime.now().toFormat('yyyy-MM-dd').toString()
  const [ticketReportState, dispatchTicketReport] = useReducer(ticketReportReducer, {
    ticketReportUsdPaginated: {} as ITicketReportResponse,
    ticketReportVesPaginated: {} as ITicketReportResponse,
    params: {
      baseUrl: '/TicketReport/get-tickets-report',
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
    } as ITicketReportQueryParams,
    sellers: [] as string[],
    ticketId: undefined,
    sellerEmail: undefined,
  })
  const [tempFilters, setTempFilters] = useState<ITicketReportQueryParams>({
    baseUrl: ticketReportState.params.baseUrl,
    pageIndex: 0,
    pageSize: 10,
    initialDate: formattedDate,
    endDate: formattedDate,
    ticketId: undefined,
    sellerEmail: undefined,
  })

  const {
    data: ticketReportPaginatedData,
    isFetching,
    refetch: getTicketsReport,
  } = useQuery<ReactQueryResponse<IpaginationResponse<ITicketReportResponse>>>(
    'get-tickets-report',
    async () => {
      const url = buildUrl(ticketReportState.params.baseUrl, {
        pageIndex: ticketReportState.params.pageIndex,
        pageSize: ticketReportState.params.pageSize,
        initialDate: ticketReportState.params.initialDate,
        endDate: ticketReportState.params.endDate,
        ticketId: ticketReportState.params.ticketId,
        sellerEmail: ticketReportState.params.sellerEmail,
      })
      return await axios.get(url)
    }
  )

  const setUsdTicketReportPaginated = (payload: ITicketReportResponse) => {
    dispatchTicketReport({type: TicketReportKind.SET_USD_TICKETS, payload})
  }

  const setVesTicketReportPaginated = (payload: ITicketReportResponse) => {
    dispatchTicketReport({type: TicketReportKind.SET_VES_TICKETS, payload})
  }

  const handleFilterChange = (filterName: keyof ITicketReportQueryParams, value: any) => {
    dispatchTicketReport({
      type: TicketReportKind.SET_PARAMS,
      payload: {[filterName]: value} as ITicketReportQueryParams,
    })
  }

  const resetFilters = () => {
    const resetValues = {
      baseUrl: ticketReportState.params.baseUrl,
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      sellerId: '',
    }

    setTempFilters(resetValues)
    dispatchTicketReport({type: TicketReportKind.SET_PARAMS, payload: resetValues})
  }

  const setSalesSellerReportParams = () => {
    dispatchTicketReport({type: TicketReportKind.SET_PARAMS, payload: tempFilters})
  }

  const setSellers = (payload: string[]) => {
    dispatchTicketReport({type: TicketReportKind.SET_SELLERS, payload})
  }

  const setTicketId = (payload: string) => {
    dispatchTicketReport({type: TicketReportKind.SET_TICKET_ID, payload})
  }

  useEffect(() => {
    if (!isFetching) {
      getTicketsReport()
    }
  }, [ticketReportState.params])

  useEffect(() => {
    if (!isFetching && ticketReportPaginatedData) {
      const ticketUsdData = ticketReportPaginatedData.data.response.items.find(
        (t) => t.currencyCode === CURRENCY_USD
      )
      if (ticketUsdData) {
        setUsdTicketReportPaginated(ticketUsdData)
      }
      const ticketVesData = ticketReportPaginatedData.data.response.items.find(
        (t) => t.currencyCode === CURRENCY_VES
      )
      if (ticketVesData) {
        setVesTicketReportPaginated(ticketVesData)
      }

      if (ticketReportState.sellers === undefined || ticketReportState.sellers.length === 0) {
        const uniqueSellerIds = new Set<string>()

        const sellers: string[] = ticketReportPaginatedData.data.response.items
          .flatMap((item) => item.tickets)
          .filter((ticket) => {
            if (uniqueSellerIds.has(ticket.ticketSoldByUserId)) {
              return false
            }
            uniqueSellerIds.add(ticket.ticketSoldByUserId)
            return true
          })
          .map((ticket) => ticket.ticketSoldByUserId)
        setSellers(sellers)
      }
    }
  }, [ticketReportPaginatedData])

  return {
    isLoading: isFetching,
    ticketReportState,
    setTempFilters,
    resetFilters,
    setSalesSellerReportParams,
    handleFilterChange,
    tempFilters,
    setTicketId,
  }
}
