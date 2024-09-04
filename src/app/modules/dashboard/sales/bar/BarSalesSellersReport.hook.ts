import {useEffect, useReducer, useState} from 'react'
import {ReportTypes} from '../../../../../types/DonutSalesPaymentReport.types'
import {ISalesPaymentReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {ISalesSellersBarReport} from '../../../../../types/BarReport.types'

enum BarSalesSellersReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
}

interface BarSalesSellersReportAction {
  type: BarSalesSellersReportKind
  payload: ISalesSellersBarReport[] | ISalesPaymentReportQueryParams
}

interface BarSalesSellersReportState {
  data: ISalesSellersBarReport[]
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
        data: action.payload as ISalesSellersBarReport[],
      }
    case BarSalesSellersReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesPaymentReportQueryParams,
      }
  }
}

export const useBarSalesSellersReport = () => {
  const {promoterId} = usePromoterList()
  const [salesSellersReportState, dispatchSalesSellersReport] = useReducer(
    barSalesSellersReportReducer,
    {
      data: [] as ISalesSellersBarReport[],
      params: {
        baseUrl: `/SalesReport/get-total-sales-by-seller-report`,
        promoterId: promoterId,
        reportType: ReportTypes.Daily,
      } as ISalesPaymentReportQueryParams,
    }
  )

  const [tempFilters, setTempFilters] = useState<ISalesPaymentReportQueryParams>({
    baseUrl: salesSellersReportState.params.baseUrl,
    reportType: salesSellersReportState.params.baseUrl,
  })

  const {
    data: salesSellersReportData,
    isFetching: isLoading,
    refetch: getSalesPaymentDailyReport,
  } = useQuery<ReactQueryResponse<ISalesSellersBarReport[]>>(
    'get-total-sales-by-seller-report',
    async () => {
      const url = buildUrl(salesSellersReportState.params.baseUrl, {
        promoterId: salesSellersReportState.params.promoterId,
        reportType: ReportTypes.Daily,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  const setData = (payload: ISalesSellersBarReport[]) => {
    dispatchSalesSellersReport({type: BarSalesSellersReportKind.SET_DATA, payload})
  }

  useEffect(() => {
    if (!isLoading) {
      getSalesPaymentDailyReport()
    }
  }, [])

  useEffect(() => {
    if (!isLoading && salesSellersReportData) {
      console.log(salesSellersReportData.data.response)
      setData(salesSellersReportData.data.response)
    }
  }, [isLoading, salesSellersReportData])

  return {
    isLoadingSalesSellersReport: isLoading,
    salesSellerData: salesSellersReportState.data,
    setSaleSellersTempFilters: setTempFilters,
    saleSellersTempFilters: tempFilters,
  }
}
