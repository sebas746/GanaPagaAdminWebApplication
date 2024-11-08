import {useEffect, useReducer} from 'react'
import {ISalesSalePointFilteredReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {ISalesSalePointBarReport} from '../../../../../types/BarReport.types'

enum SalesSalePointReportChartReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
}

interface SalesSalePointReportChartReportAction {
  type: SalesSalePointReportChartReportKind
  payload: ISalesSalePointBarReport[] | ISalesSalePointFilteredReportQueryParams
}

interface SalesSalePointReportChartReportState {
  data: ISalesSalePointBarReport[]
  params: ISalesSalePointFilteredReportQueryParams
}

export const SalesSalePointReportChartReportReducer = (
  state: SalesSalePointReportChartReportState,
  action: SalesSalePointReportChartReportAction
) => {
  switch (action.type) {
    case SalesSalePointReportChartReportKind.SET_DATA:
      return {
        ...state,
        data: action.payload as ISalesSalePointBarReport[],
      }
    case SalesSalePointReportChartReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesSalePointFilteredReportQueryParams,
      }
  }
}

export const useSalesSalePointReportChartReport = (
  params: ISalesSalePointFilteredReportQueryParams
) => {
  const {promoterId} = usePromoterList()
  const [salesSalePointReportChartState, dispatchSalesSalePointReport] = useReducer(
    SalesSalePointReportChartReportReducer,
    {
      data: [] as ISalesSalePointBarReport[],
      params: {
        baseUrl: `/SalesReport/get-total-sales-filtered-by-sale-point-report`,
        promoterId: promoterId,
        initialDate: params.initialDate,
        endDate: params.endDate,
      } as ISalesSalePointFilteredReportQueryParams,
    }
  )

  const {
    data: salesSalePointReportData,
    isFetching: isLoading,
    refetch: getSalesSaleFilteredPointReport,
  } = useQuery<ReactQueryResponse<ISalesSalePointBarReport[]>>(
    'get-total-sales-filtered-by-sale-point-report',
    async () => {
      const url = buildUrl(`/SalesReport/get-total-sales-filtered-by-sale-point-report`, {
        promoterId: promoterId,
        initialDate: params.initialDate,
        endDate: params.endDate,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  const setDailyData = (payload: ISalesSalePointBarReport[]) => {
    dispatchSalesSalePointReport({type: SalesSalePointReportChartReportKind.SET_DATA, payload})
  }

  useEffect(() => {
    if (!isLoading && salesSalePointReportData) {
      setDailyData(salesSalePointReportData.data.response)
    }
  }, [isLoading, salesSalePointReportData])

  return {
    isLoadingSalesSalePointChartReport: isLoading,
    salesSalePointChartData: salesSalePointReportChartState.data,
    getSalesSaleFilteredPointReport,
  }
}
