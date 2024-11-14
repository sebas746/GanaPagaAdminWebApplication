import {useEffect, useReducer} from 'react'
import {ISalesSellerFilteredReportQueryParams} from '../../../../../types/SalesSellerReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {ISalesSellersBarReport} from '../../../../../types/BarReport.types'

enum SalesSellerReportChartReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
}

interface SalesSellerReportChartReportAction {
  type: SalesSellerReportChartReportKind
  payload: ISalesSellersBarReport[] | ISalesSellerFilteredReportQueryParams
}

interface SalesSellerReportChartReportState {
  data: ISalesSellersBarReport[]
  params: ISalesSellerFilteredReportQueryParams
}

export const SalesSellerReportChartReportReducer = (
  state: SalesSellerReportChartReportState,
  action: SalesSellerReportChartReportAction
) => {
  switch (action.type) {
    case SalesSellerReportChartReportKind.SET_DATA:
      return {
        ...state,
        data: action.payload as ISalesSellersBarReport[],
      }
    case SalesSellerReportChartReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesSellerFilteredReportQueryParams,
      }
  }
}

export const useSalesSellerReportChartReport = (params: ISalesSellerFilteredReportQueryParams) => {
  const {promoterId} = usePromoterList()
  const [SalesSellerReportChartState, dispatchSalesSellerReport] = useReducer(
    SalesSellerReportChartReportReducer,
    {
      data: [] as ISalesSellersBarReport[],
      params: {
        baseUrl: `/SalesReport/get-total-sales-filtered-by-seller-report`,
        promoterId: promoterId,
        initialDate: params.initialDate,
        endDate: params.endDate,
      } as ISalesSellerFilteredReportQueryParams,
    }
  )

  const {
    data: salesSellerReportData,
    isFetching: isLoading,
    refetch: getSalesSellerFilteredPointReport,
  } = useQuery<ReactQueryResponse<ISalesSellersBarReport[]>>(
    'get-total-sales-filtered-by-seller-report',
    async () => {
      const url = buildUrl(`/SalesReport/get-total-sales-filtered-by-seller-report`, {
        promoterId: promoterId,
        initialDate: params.initialDate,
        endDate: params.endDate,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  const setDailyData = (payload: ISalesSellersBarReport[]) => {
    dispatchSalesSellerReport({type: SalesSellerReportChartReportKind.SET_DATA, payload})
  }

  useEffect(() => {
    if (!isLoading && salesSellerReportData) {
      setDailyData(salesSellerReportData.data.response)
    }
  }, [isLoading, salesSellerReportData])

  return {
    isLoadingSalesSellerChartReport: isLoading,
    salesSellerChartData: SalesSellerReportChartState.data,
    getSalesSellerFilteredPointReport,
  }
}
