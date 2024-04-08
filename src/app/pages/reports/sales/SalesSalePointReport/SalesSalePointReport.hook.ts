import { useEffect, useReducer, useState } from 'react'
import { ReactQueryResponse } from '../../../../../types/Generics'
import { useQuery } from 'react-query'
import { buildUrl } from '../../../../helpers/urlBuilder.helpers'
import { DateTime } from 'luxon'
import axios from '../../../../config/http-common'
import {
  ISalePointResponse,
  ISalesSalePointReport,
  ISalesSalePointReportQueryParams,
} from '../../../../../types/SalesSalePointReport.types'
import {
  IpaginationSalesReportResponse,
} from '../../../../../types/Pagination.types'
import { usePromoterList } from '../../../../hooks/promoterList.hook' 

enum SalesSalePointReportKind {
  SET_SALE_POINT_SALES = 'SET_SALE_POINT_SALES',
  SET_PARAMS = 'SET_PARAMS',
  SET_SALE_POINTS = 'SET_SALE_POINTS',
  SET_SALE_POINT_ID = 'SET_SALE_POINT_ID',
}

interface SalesSalePointReportAction {
  type: SalesSalePointReportKind
  payload:
  | IpaginationSalesReportResponse<ISalesSalePointReport>
  | ISalePointResponse[]
  | ISalesSalePointReportQueryParams
  | string
}

interface SalesSellerReportState {
  salesReportPaginated: IpaginationSalesReportResponse<ISalesSalePointReport>
  params: ISalesSalePointReportQueryParams
  salePoints:  ISalePointResponse[]
  salePointId: string | undefined
}

export const salesSalePointReportReducer = (
  state: SalesSellerReportState,
  action: SalesSalePointReportAction
) => {
  switch (action.type) {
    case SalesSalePointReportKind.SET_SALE_POINT_SALES:
      return {
        ...state,
        salesReportPaginated:
          action.payload as IpaginationSalesReportResponse<ISalesSalePointReport>,
      }
    case SalesSalePointReportKind.SET_PARAMS:
      return {
        ...state,
        params: {
          ...state.params,
          ...(action.payload as ISalesSalePointReportQueryParams),
        },
      }
    case SalesSalePointReportKind.SET_SALE_POINTS:
      return {
        ...state,
        salePoints: action.payload as ISalePointResponse[],
      }
    case SalesSalePointReportKind.SET_SALE_POINT_ID:
      return {
        ...state,
        salePointId: action.payload as string,
      }
  }
}

export const useSalesSalePointReport = () => {
  const { promoterId } = usePromoterList()
  const formattedDate = DateTime.now().toFormat('yyyy-MM-dd').toString()
  const [salesSalePointReportState, dispatchSalesSalePointReport] = useReducer(
    salesSalePointReportReducer,
    {
      salesReportPaginated: {} as IpaginationSalesReportResponse<ISalesSalePointReport>,
      params: {
        baseUrl: `/SalesReport/get-salepoint-total-sales-report`,
        pageIndex: 0,
        pageSize: 10,
        initialDate: formattedDate,
        endDate: formattedDate,
        promoterId: promoterId
      } as ISalesSalePointReportQueryParams,
      salePoints: [] as ISalePointResponse[],
      salePointId: undefined,
    }
  )
  const [tempFilters, setTempFilters] = useState<ISalesSalePointReportQueryParams>({
    baseUrl: salesSalePointReportState.params.baseUrl,
    pageIndex: 0,
    pageSize: 10,
    initialDate: formattedDate,
    endDate: formattedDate,
    salePointId: undefined,
  })

  const {
    data: salesSalePointReportPaginatedData,
    isFetching,
    refetch: getSalesSalePointReport,
  } = useQuery<ReactQueryResponse<IpaginationSalesReportResponse<ISalesSalePointReport>>>(
    'get-salepoint-total-sales-report',
    async () => {
      const url = buildUrl(salesSalePointReportState.params.baseUrl, {
        pageIndex: salesSalePointReportState.params.pageIndex,
        pageSize: salesSalePointReportState.params.pageSize,
        initialDate: salesSalePointReportState.params.initialDate,
        endDate: salesSalePointReportState.params.endDate,
        salePointId: salesSalePointReportState.params.salePointId,
        promoterId: salesSalePointReportState.params.promoterId
      })
      return await axios.get(url)
    }
  )

  const setSalesSalePointReportPaginated = (
    payload: IpaginationSalesReportResponse<ISalesSalePointReport>
  ) => {
    dispatchSalesSalePointReport({ type: SalesSalePointReportKind.SET_SALE_POINT_SALES, payload })
  }

  const handleFilterChange = (filterName: keyof ISalesSalePointReportQueryParams, value: any) => {
    dispatchSalesSalePointReport({
      type: SalesSalePointReportKind.SET_PARAMS,
      payload: { [filterName]: value } as ISalesSalePointReportQueryParams,
    })
  }

  const resetFilters = () => {
    const resetValues = {
      baseUrl: salesSalePointReportState.params.baseUrl,
      pageIndex: 0,
      pageSize: 10,
      initialDate: formattedDate,
      endDate: formattedDate,
      sellerId: '',
      promoterId: undefined
    }

    setTempFilters(resetValues)
    dispatchSalesSalePointReport({ type: SalesSalePointReportKind.SET_PARAMS, payload: resetValues })
  }

  const setSalesSalePointReportParams = () => {
    dispatchSalesSalePointReport({ type: SalesSalePointReportKind.SET_PARAMS, payload: tempFilters })
  }

  const setSalePoints = (payload: ISalePointResponse[]) => {
    dispatchSalesSalePointReport({ type: SalesSalePointReportKind.SET_SALE_POINTS, payload })
  }

  useEffect(() => {
    if (!isFetching) {
      getSalesSalePointReport()
    }
  }, [salesSalePointReportState.params])

  useEffect(() => {
    if (!isFetching && salesSalePointReportPaginatedData) {
      setSalesSalePointReportPaginated(salesSalePointReportPaginatedData.data.response)
      if (
        salesSalePointReportState.salePoints === undefined ||
        salesSalePointReportState.salePoints.length === 0
      ) {
        const uniqueSalePointIds = new Set<number>()

        const salePoints: ISalePointResponse[] =
          salesSalePointReportPaginatedData.data.response.items
            .filter((salesSalePoint) => {
              if (uniqueSalePointIds.has(salesSalePoint.salePoint.salePointId)) {
                return false
              }
              uniqueSalePointIds.add(salesSalePoint.salePoint.salePointId)
              return true
            })
            .map((salesSeller) => ({
              salePointId: salesSeller.salePoint.salePointId,
              salePointName: salesSeller.salePoint.salePointName,
              salePointAddress: salesSeller.salePoint.salePointAddress,
            }))
        setSalePoints(salePoints)
      }
    }
  }, [salesSalePointReportPaginatedData])

  return {
    isLoading: isFetching,
    salesSalePointReportState,
    setTempFilters,
    resetFilters,
    setSalesSalePointReportParams,
    handleFilterChange,
    tempFilters,
  }
}
