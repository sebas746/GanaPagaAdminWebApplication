import {useEffect, useReducer, useState} from 'react'
import {ReportTypes} from '../../../../../types/DonutSalesPaymentReport.types'
import {ISalesPaymentReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'
import {ISalesSalePointBarReport} from '../../../../../types/BarReport.types'
import {
  ISalesGameTypeBarReport,
  ISalesGameTypeReportQueryParams,
} from '../../../../../types/SalesGameTypeReport.types'

enum SalesGameTypeReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
}

interface SalesGameTypeReportAction {
  type: SalesGameTypeReportKind
  payload: ISalesGameTypeBarReport[] | ISalesGameTypeReportQueryParams
}

interface BarSalesSellersReportState {
  data: ISalesGameTypeBarReport[]
  params: ISalesGameTypeReportQueryParams
}

export const barSalesSellersReportReducer = (
  state: BarSalesSellersReportState,
  action: SalesGameTypeReportAction
) => {
  switch (action.type) {
    case SalesGameTypeReportKind.SET_DATA:
      return {
        ...state,
        data: action.payload as ISalesGameTypeBarReport[],
      }
    case SalesGameTypeReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesGameTypeReportQueryParams,
      }
  }
}

export const useSalesGameTypeReport = () => {
  const {promoterId} = usePromoterList()
  const [salesGameTypeReportState, dispatchSalesGameTypeReport] = useReducer(
    barSalesSellersReportReducer,
    {
      data: [] as ISalesGameTypeBarReport[],
      params: {
        baseUrl: `/SalesReport/get-total-sales-by-game-type-report`,
        promoterId: promoterId,
        reportType: ReportTypes.Monthly,
      } as ISalesGameTypeReportQueryParams,
    }
  )

  const [tempFilters, setTempFilters] = useState<ISalesGameTypeReportQueryParams>({
    baseUrl: `/SalesReport/get-total-sales-by-game-type-report`,
    reportType: salesGameTypeReportState.params.reportType,
  })

  useEffect(() => {
    handleFilterChange('reportType', tempFilters.reportType)
  }, [tempFilters])

  const handleFilterChange = (filterName: keyof ISalesGameTypeReportQueryParams, value: any) => {
    dispatchSalesGameTypeReport({
      type: SalesGameTypeReportKind.SET_PARAMS,
      payload: {[filterName]: value} as ISalesGameTypeReportQueryParams,
    })
  }

  const {
    data: salesGameTypeReportData,
    isFetching: isLoading,
    refetch: getSalesGameTypeReport,
  } = useQuery<ReactQueryResponse<ISalesGameTypeBarReport[]>>(
    'get-total-sales-by-game-type-report',
    async () => {
      const url = buildUrl(`/SalesReport/get-total-sales-by-game-type-report`, {
        promoterId: salesGameTypeReportState.params.promoterId,
        reportType: salesGameTypeReportState.params.reportType,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  useEffect(() => {
    if (!isLoading) {
      getSalesGameTypeReport()
    }
  }, [salesGameTypeReportState.params])

  const setDailyData = (payload: ISalesGameTypeBarReport[]) => {
    dispatchSalesGameTypeReport({type: SalesGameTypeReportKind.SET_DATA, payload})
  }

  useEffect(() => {
    if (!isLoading) {
      getSalesGameTypeReport()
    }
  }, [])

  useEffect(() => {
    if (!isLoading && salesGameTypeReportData) {
      setDailyData(salesGameTypeReportData.data.response)
    }
  }, [isLoading, salesGameTypeReportData])

  return {
    isLoadingSalesGameTypeReport: isLoading,
    salesGameTypeData: salesGameTypeReportState.data,
    setSalesGameTypeTempFilters: setTempFilters,
    saleGameTypeTempFilters: tempFilters,
  }
}
