import {useEffect, useReducer, useState} from 'react'
import {ReportTypes} from '../../../../../types/DonutSalesPaymentReport.types'
import {ISalesPaymentReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {ISalesSalePointBarReport} from '../../../../../types/BarReport.types'

enum BarSalesSalePointReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
}

interface BarSalesSalePointReportAction {
  type: BarSalesSalePointReportKind
  payload: ISalesSalePointBarReport[] | ISalesPaymentReportQueryParams
}

interface BarSalesSalePointReportState {
  data: ISalesSalePointBarReport[]
  params: ISalesPaymentReportQueryParams
}

export const barSalesSalePointReportReducer = (
  state: BarSalesSalePointReportState,
  action: BarSalesSalePointReportAction
) => {
  switch (action.type) {
    case BarSalesSalePointReportKind.SET_DATA:
      return {
        ...state,
        data: action.payload as ISalesSalePointBarReport[],
      }
    case BarSalesSalePointReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesPaymentReportQueryParams,
      }
  }
}

export const useBarSalesSalePointReport = () => {
  const {promoterId} = usePromoterList()
  const [salesSalePointReportState, dispatchSalesSalePointReport] = useReducer(
    barSalesSalePointReportReducer,
    {
      data: [] as ISalesSalePointBarReport[],
      params: {
        baseUrl: `/SalesReport/get-total-sales-by-sale-point-report`,
        promoterId: promoterId,
        reportType: ReportTypes.Monthly,
      } as ISalesPaymentReportQueryParams,
    }
  )

  const [tempFilters, setTempFilters] = useState<ISalesPaymentReportQueryParams>({
    baseUrl: `/SalesReport/get-total-sales-by-sale-point-report`,
    reportType: salesSalePointReportState.params.reportType,
  })

  useEffect(() => {
    handleFilterChange('reportType', tempFilters.reportType)
  }, [tempFilters])

  const handleFilterChange = (filterName: keyof ISalesPaymentReportQueryParams, value: any) => {
    dispatchSalesSalePointReport({
      type: BarSalesSalePointReportKind.SET_PARAMS,
      payload: {[filterName]: value} as ISalesPaymentReportQueryParams,
    })
  }

  const {
    data: salesSalePointReportData,
    isFetching: isLoading,
    refetch: getSalesSalePointReport,
  } = useQuery<ReactQueryResponse<ISalesSalePointBarReport[]>>(
    'get-total-sales-by-sale-point-report',
    async () => {
      const url = buildUrl(`/SalesReport/get-total-sales-by-sale-point-report`, {
        promoterId: promoterId,
        reportType: salesSalePointReportState.params.reportType,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  useEffect(() => {
    if (!isLoading) {
      getSalesSalePointReport()
    }
  }, [salesSalePointReportState.params])

  const setDailyData = (payload: ISalesSalePointBarReport[]) => {
    dispatchSalesSalePointReport({type: BarSalesSalePointReportKind.SET_DATA, payload})
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
