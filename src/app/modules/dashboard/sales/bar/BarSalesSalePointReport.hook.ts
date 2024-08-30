import {useEffect, useReducer, useState} from 'react'
import {ReportTypes} from '../../../../../types/DonutSalesPaymentReport.types'
import {ISalesPaymentReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {ISalesSalePointBarReport} from '../../../../../types/BarReport.types'

enum BarSalesSellersReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
}

interface BarSalesSellersReportAction {
  type: BarSalesSellersReportKind
  payload: ISalesSalePointBarReport[] | ISalesPaymentReportQueryParams
}

interface BarSalesSellersReportState {
  data: ISalesSalePointBarReport[]
  params: ISalesPaymentReportQueryParams
}

export const barSalesSellersReportReducer = (
  state: BarSalesSellersReportState,
  action: BarSalesSellersReportAction
) => {
  switch (action.type) {
    case BarSalesSellersReportKind.SET_DATA:
      return {
        ...state,
        data: action.payload as ISalesSalePointBarReport[],
      }
    case BarSalesSellersReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesPaymentReportQueryParams,
      }
  }
}

export const useBarSalesSalePointReport = () => {
  const {promoterId} = usePromoterList()
  const [salesSalePointReportState, dispatchSalesSalePointReport] = useReducer(
    barSalesSellersReportReducer,
    {
      data: [] as ISalesSalePointBarReport[],
      params: {
        baseUrl: `/SalesReport/get-total-sales-by-sale-point-report`,
        promoterId: promoterId,
        reportType: ReportTypes.Daily,
      } as ISalesPaymentReportQueryParams,
    }
  )

  const [tempFilters, setTempFilters] = useState<ISalesPaymentReportQueryParams>({
    baseUrl: salesSalePointReportState.params.baseUrl,
    reportType: salesSalePointReportState.params.baseUrl,
  })

  const {
    data: salesSalePointReportData,
    isFetching: isLoading,
    refetch: getSalesSalePointReport,
  } = useQuery<ReactQueryResponse<ISalesSalePointBarReport[]>>(
    'get-total-sales-by-sale-point-report',
    async () => {
      const url = buildUrl(salesSalePointReportState.params.baseUrl, {
        promoterId: salesSalePointReportState.params.promoterId,
        reportType: ReportTypes.Daily,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  const setDailyData = (payload: ISalesSalePointBarReport[]) => {
    dispatchSalesSalePointReport({type: BarSalesSellersReportKind.SET_DATA, payload})
  }

  useEffect(() => {
    if (!isLoading) {
      getSalesSalePointReport()
    }
  }, [])

  useEffect(() => {
    if (!isLoading && salesSalePointReportData) {
      setDailyData(salesSalePointReportData.data.response)
    }
  }, [isLoading, salesSalePointReportData])

  return {
    isLoadingSalesSalePointReport: isLoading,
    salesSalePointData: salesSalePointReportState.data,
    setSalesSalePointTempFilters: setTempFilters,
    saleSalesPointTempFilters: tempFilters,
  }
}
