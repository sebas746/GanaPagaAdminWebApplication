import {useEffect, useReducer, useState} from 'react'
import {
  IpaginationResponse,
  IpaginationSalesReportResponse,
} from '../../../../../types/Pagination.types'
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
import {usePromoterList} from '../../../../hooks/promoterList.hook'

enum SalesSellerReportKind {
  SET_SELLER_SALES = 'SET_SELLER_SALES',
  SET_PARAMS = 'SET_PARAMS',
  SET_SELLERS = 'SET_SELLERS',
  SET_SELLER_ID = 'SET_SELLER_ID',
}

interface SalesSellerReportAction {
  type: SalesSellerReportKind
  payload:
    | IpaginationSalesReportResponse<ISalesSellerResponse>
    | ISellerResponse[]
    | ISalesSellerReportQueryParams
    | string
}

interface SalesSellerReportState {
  salesReportPaginated: IpaginationSalesReportResponse<ISalesSellerResponse>
  params: ISalesSellerReportQueryParams
  sellers: ISellerResponse[]
  sellerId: string | undefined
}

export const salesSellerReportReducer = (
  state: SalesSellerReportState,
  action: SalesSellerReportAction
) => {
  switch (action.type) {
    case SalesSellerReportKind.SET_SELLER_SALES:
      return {
        ...state,
        salesReportPaginated:
          action.payload as IpaginationSalesReportResponse<ISalesSellerResponse>,
      }
    case SalesSellerReportKind.SET_PARAMS:
      return {
        ...state,
        params: {
          ...state.params,
          ...(action.payload as ISalesSellerReportQueryParams),
        },
      }
    case SalesSellerReportKind.SET_SELLERS:
      return {
        ...state,
        sellers: action.payload as ISellerResponse[],
      }
    case SalesSellerReportKind.SET_SELLER_ID:
      return {
        ...state,
        sellerId: action.payload as string,
      }
  }
}

export const useSalesSellerReport = () => {
  const {promoterId} = usePromoterList()
  const formattedDate = DateTime.now().toFormat('yyyy-MM-dd').toString()
  const [salesSellerReportState, dispatchSalesSellerReport] = useReducer(salesSellerReportReducer, {
    salesReportPaginated: {} as IpaginationSalesReportResponse<ISalesSellerResponse>,
    params: {
      baseUrl: `/SalesReport/get-sellers-total-sales-report`,
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      promoterId: promoterId,
    } as ISalesSellerReportQueryParams,
    sellers: [] as ISellerResponse[],
    sellerId: undefined,
  })
  const [tempFilters, setTempFilters] = useState<ISalesSellerReportQueryParams>({
    baseUrl: salesSellerReportState.params.baseUrl,
    pageIndex: 0,
    pageSize: 10,
    initialDate: formattedDate,
    endDate: formattedDate,
    sellerId: undefined,
    promoterId: salesSellerReportState.params.promoterId,
  })

  const {
    data: salesSellerReportPaginatedData,
    isFetching,
    refetch: getSalesSellerReport,
  } = useQuery<ReactQueryResponse<IpaginationSalesReportResponse<ISalesSellerResponse>>>(
    `get-sellers-total-sales-report`,
    async () => {
      const url = buildUrl(salesSellerReportState.params.baseUrl, {
        pageIndex: salesSellerReportState.params.pageIndex,
        pageSize: salesSellerReportState.params.pageSize,
        initialDate: salesSellerReportState.params.initialDate,
        endDate: salesSellerReportState.params.endDate,
        sellerId: salesSellerReportState.params.sellerId,
        promoterId: salesSellerReportState.params.promoterId,
      })
      return await axios.get(url)
    }
  )

  const setSalesSellerReportPaginated = (
    payload: IpaginationSalesReportResponse<ISalesSellerResponse>
  ) => {
    dispatchSalesSellerReport({type: SalesSellerReportKind.SET_SELLER_SALES, payload})
  }

  const handleFilterChange = (filterName: keyof ISalesSellerReportQueryParams, value: any) => {
    dispatchSalesSellerReport({
      type: SalesSellerReportKind.SET_PARAMS,
      payload: {[filterName]: value} as ISalesSellerReportQueryParams,
    })
  }

  const resetFilters = () => {
    const resetValues = {
      baseUrl: salesSellerReportState.params.baseUrl,
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      sellerId: '',
      promoterId: salesSellerReportState.params.promoterId,
    }

    setTempFilters(resetValues)
    dispatchSalesSellerReport({type: SalesSellerReportKind.SET_PARAMS, payload: resetValues})
  }

  const setSalesSellerReportParams = () => {
    dispatchSalesSellerReport({type: SalesSellerReportKind.SET_PARAMS, payload: tempFilters})
  }

  const setSellers = (payload: ISellerResponse[]) => {
    dispatchSalesSellerReport({type: SalesSellerReportKind.SET_SELLERS, payload})
  }

  useEffect(() => {
    if (!isFetching) {
      getSalesSellerReport()
    }
  }, [salesSellerReportState.params])

  useEffect(() => {
    if (!isFetching && salesSellerReportPaginatedData) {
      setSalesSellerReportPaginated(salesSellerReportPaginatedData.data.response)
      if (
        salesSellerReportState.sellers === undefined ||
        salesSellerReportState.sellers.length === 0
      ) {
        const uniqueSellerIds = new Set<number>()

        const sellers: ISellerResponse[] = salesSellerReportPaginatedData.data.response.items
          .filter((salesSeller) => {
            if (uniqueSellerIds.has(salesSeller.seller.sellerId)) {
              return false
            }
            uniqueSellerIds.add(salesSeller.seller.sellerId)
            return true
          })
          .map((salesSeller) => ({
            sellerId: salesSeller.seller.sellerId,
            sellerFirstName: salesSeller.seller.sellerFirstName,
            sellerLastName: salesSeller.seller.sellerLastName,
            sellerEmail: salesSeller.seller.sellerEmail,
          }))
        setSellers(sellers)
      }
    }
  }, [salesSellerReportPaginatedData])

  return {
    isLoading: isFetching,
    salesSellerReportState,
    setTempFilters,
    resetFilters,
    setSalesSellerReportParams,
    handleFilterChange,
    tempFilters,
  }
}
