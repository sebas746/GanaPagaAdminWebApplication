import {useEffect, useReducer, useState} from 'react'
import {IpaginationResponse} from '../../../../../types/Pagination.types'
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
import {CurrencyCode, CurrencyId, currencies} from '../../../../../types/Currency.types'

enum TicketReportKind {
  SET_TICKET_REPORT = 'SET_TICKET_REPORT',
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
  ticketReportPaginated: ITicketReportResponse
  params: ITicketReportQueryParams
  sellers: string[]
  ticketId: string | undefined
  sellerEmail: string | undefined
}

export const ticketReportReducer = (state: TicketReportState, action: TicketReportAction) => {
  switch (action.type) {
    case TicketReportKind.SET_TICKET_REPORT:
      return {
        ...state,
        ticketReportPaginated: action.payload as ITicketReportResponse,
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
  const [ticketReportUsdState, dispatchUsdTicketReport] = useReducer(ticketReportReducer, {
    ticketReportPaginated: {} as ITicketReportResponse,
    params: {
      baseUrl: '/TicketReport/get-tickets-report',
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      currency: CURRENCY_USD,
    } as ITicketReportQueryParams,
    sellers: [] as string[],
    ticketId: undefined,
    sellerEmail: undefined,
  })
  const [ticketReportVesState, dispatchVesTicketReport] = useReducer(ticketReportReducer, {
    ticketReportPaginated: {} as ITicketReportResponse,
    params: {
      baseUrl: '/TicketReport/get-tickets-report',
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      currency: CURRENCY_VES,
    } as ITicketReportQueryParams,
    sellers: [] as string[],
    ticketId: undefined,
    sellerEmail: undefined,
  })
  const [tempFiltersUsd, setTempFiltersUsd] = useState<ITicketReportQueryParams>({
    baseUrl: ticketReportUsdState.params.baseUrl,
    pageIndex: 0,
    pageSize: 10,
    initialDate: formattedDate,
    endDate: formattedDate,
    currency: CURRENCY_USD,
    ticketId: undefined,
    sellerEmail: undefined,
  })
  const [tempFiltersVes, setTempFiltersVes] = useState<ITicketReportQueryParams>({
    baseUrl: ticketReportVesState.params.baseUrl,
    pageIndex: 0,
    pageSize: 10,
    initialDate: formattedDate,
    endDate: formattedDate,
    currency: CURRENCY_VES,
    ticketId: undefined,
    sellerEmail: undefined,
  })

  const [selectedTab, setSelectedTab] = useState(currencies[0].currencyId)
  const [shouldFetchDataUsd, setShouldFetchDataUsd] = useState(false)
  const [shouldFetchDataVes, setShouldFetchDataVes] = useState(false)

  const fetchUsdData = async () => {
    const url = buildUrl(ticketReportUsdState.params.baseUrl, {
      pageIndex: ticketReportUsdState.params.pageIndex,
      pageSize: ticketReportUsdState.params.pageSize,
      initialDate: ticketReportUsdState.params.initialDate,
      endDate: ticketReportUsdState.params.endDate,
      currency: ticketReportUsdState.params.currency,
      ticketId: ticketReportUsdState.params.ticketId,
      sellerEmail: ticketReportUsdState.params.sellerEmail,
    })

    const response = await axios.get(url)
    return response
  }

  const {
    data: ticketReportUsdPaginatedData,
    isFetching: isFetchingUsd,
    refetch: getUsdTicketsReport,
  } = useQuery<ReactQueryResponse<ITicketReportResponse>>('get-usd-tickets-report', fetchUsdData, {
    enabled: shouldFetchDataUsd,
  })

  const fetchVesData = async () => {
    const url = buildUrl(ticketReportVesState.params.baseUrl, {
      pageIndex: ticketReportVesState.params.pageIndex,
      pageSize: ticketReportVesState.params.pageSize,
      initialDate: ticketReportVesState.params.initialDate,
      endDate: ticketReportVesState.params.endDate,
      currency: ticketReportVesState.params.currency,
      ticketId: ticketReportVesState.params.ticketId,
      sellerEmail: ticketReportVesState.params.sellerEmail,
    })

    const response = await axios.get(url)
    return response
  }

  const {
    data: ticketReportVesPaginatedData,
    isFetching: isFetchingVes,
    refetch: getVesTicketsReport,
  } = useQuery<ReactQueryResponse<ITicketReportResponse>>('get-ves-tickets-report', fetchVesData, {
    enabled: shouldFetchDataVes,
  })

  const setTicketReportPaginated = (payload: ITicketReportResponse) => {
    if (selectedTab === CurrencyId.USD) {
      dispatchUsdTicketReport({type: TicketReportKind.SET_TICKET_REPORT, payload})
    } else if (selectedTab === CurrencyId.VES) {
      dispatchVesTicketReport({type: TicketReportKind.SET_TICKET_REPORT, payload})
    }
  }

  const handleUsdFilterChange = (filterName: keyof ITicketReportQueryParams, value: any) => {
    dispatchUsdTicketReport({
      type: TicketReportKind.SET_PARAMS,
      payload: {[filterName]: value} as ITicketReportQueryParams,
    })
  }

  const handleVesFilterChange = (filterName: keyof ITicketReportQueryParams, value: any) => {
    dispatchVesTicketReport({
      type: TicketReportKind.SET_PARAMS,
      payload: {[filterName]: value} as ITicketReportQueryParams,
    })
  }

  const resetUsdFilters = () => {
    const resetValues = {
      baseUrl: ticketReportUsdState.params.baseUrl,
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      currency: CURRENCY_USD,
      sellerId: '',
      ticketId: '',
    }

    setTempFiltersUsd(resetValues)
    dispatchUsdTicketReport({type: TicketReportKind.SET_PARAMS, payload: resetValues})
  }

  const resetVesFilters = () => {
    const resetValues = {
      baseUrl: ticketReportUsdState.params.baseUrl,
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      currency: CURRENCY_USD,
      sellerId: '',
      ticketId: '',
    }

    setTempFiltersVes(resetValues)
    dispatchVesTicketReport({type: TicketReportKind.SET_PARAMS, payload: resetValues})
  }

  const setTicketReportParams = () => {
    console.log(selectedTab)
    console.log(tempFiltersUsd)
    if (selectedTab === CurrencyId.USD) {
      setShouldFetchDataUsd(true)
      dispatchUsdTicketReport({type: TicketReportKind.SET_PARAMS, payload: tempFiltersUsd})
    } else if (selectedTab === CurrencyId.VES) {
      setShouldFetchDataVes(true)
      dispatchVesTicketReport({type: TicketReportKind.SET_PARAMS, payload: tempFiltersVes})
    }
  }

  console.log(tempFiltersUsd)

  const setUsdSellers = (payload: string[]) => {
    dispatchUsdTicketReport({type: TicketReportKind.SET_SELLERS, payload})
  }

  const setVesSellers = (payload: string[]) => {
    dispatchVesTicketReport({type: TicketReportKind.SET_SELLERS, payload})
  }

  const setUsdTicketId = (payload: string) => {
    dispatchUsdTicketReport({type: TicketReportKind.SET_TICKET_ID, payload})
  }

  const setVesTicketId = (payload: string) => {
    dispatchVesTicketReport({type: TicketReportKind.SET_TICKET_ID, payload})
  }

  const setCurrencyChange = (newCurrency: string) => {
    setTempFiltersUsd((prevFilters) => ({
      ...prevFilters,
      currency: newCurrency,
    }))
  }

  useEffect(() => {
    if (!isFetchingUsd && shouldFetchDataUsd) {
      getUsdTicketsReport()
    }
  }, [ticketReportUsdState.params])

  useEffect(() => {
    if (!isFetchingVes && shouldFetchDataUsd) {
      getVesTicketsReport()
    }
  }, [ticketReportVesState.params])

  useEffect(() => {
    if (selectedTab === CurrencyId.USD) {
      setCurrencyChange(CurrencyCode.USD)
    } else {
      setCurrencyChange(CurrencyCode.VES)
    }
  }, [selectedTab])

  useEffect(() => {
    if (!isFetchingUsd && ticketReportUsdPaginatedData) {
      setTicketReportPaginated(ticketReportUsdPaginatedData.data.response)

      if (ticketReportUsdState.sellers === undefined || ticketReportUsdState.sellers.length === 0) {
        const uniqueSellerIds = new Set<string>()

        const sellers: string[] = ticketReportUsdPaginatedData.data.response.tickets
          .filter((ticket) => {
            if (uniqueSellerIds.has(ticket.ticketSoldByUserId)) {
              return false
            }
            uniqueSellerIds.add(ticket.ticketSoldByUserId)
            return true
          })
          .map((ticket) => ticket.ticketSoldByUserId)
        setUsdSellers(sellers)
      }
    }
  }, [ticketReportUsdPaginatedData])

  useEffect(() => {
    if (!isFetchingVes && ticketReportVesPaginatedData) {
      setTicketReportPaginated(ticketReportVesPaginatedData.data.response)

      if (ticketReportVesState.sellers === undefined || ticketReportVesState.sellers.length === 0) {
        const uniqueSellerIds = new Set<string>()

        const sellers: string[] = ticketReportVesPaginatedData.data.response.tickets
          .filter((ticket) => {
            if (uniqueSellerIds.has(ticket.ticketSoldByUserId)) {
              return false
            }
            uniqueSellerIds.add(ticket.ticketSoldByUserId)
            return true
          })
          .map((ticket) => ticket.ticketSoldByUserId)
        setVesSellers(sellers)
      }
    }
  }, [ticketReportVesPaginatedData])

  return {
    isLoading: isFetchingUsd,
    isLoadingVes: isFetchingVes,
    ticketReportUsdState,
    ticketReportVesState,
    setTempFiltersUsd,
    setTempFiltersVes,
    resetUsdFilters,
    resetVesFilters,
    setTicketReportParams,
    handleUsdFilterChange,
    handleVesFilterChange,
    tempFiltersUsd,
    tempFiltersVes,
    setUsdTicketId,
    setVesTicketId,
    selectedTab,
    setSelectedTab,
  }
}
