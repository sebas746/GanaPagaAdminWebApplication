import {useEffect, useReducer} from 'react'
import {ISalesPaymentReport, ReportTypes} from '../../../../../types/DonutSalesPaymentReport.types'
import {ISalesPaymentReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {usePromoterList} from '../../../../hooks/promoterList.hook'
import {buildUrl} from '../../../../helpers/urlBuilder.helpers'
import axios from '../../../../config/http-common'
import {ReactQueryResponse} from '../../../../../types/Generics'
import {useQuery} from 'react-query'

enum DonutSalesPaymentReportKind {
  SET_DAILY_DATA = 'SET_DAILY_DATA',
  SET_PARAMS = 'SET_PARAMS',
  //SET_WEEKLY_DATA = 'SET_WEEKLY_DATA',
  SET_MONTHLY_DATA = 'SET_MONTHLY_DATA',
}

interface DonutSalesPaymentReportAction {
  type: DonutSalesPaymentReportKind
  payload: ISalesPaymentReport | ISalesPaymentReportQueryParams
}

interface DonutSalesPaymentReportState {
  dailyData: ISalesPaymentReport
  monthlyData: ISalesPaymentReport
  params: ISalesPaymentReportQueryParams
}

export const donutSalesPaymentReportReducer = (
  state: DonutSalesPaymentReportState,
  action: DonutSalesPaymentReportAction
) => {
  switch (action.type) {
    case DonutSalesPaymentReportKind.SET_DAILY_DATA:
      return {
        ...state,
        dailyData: action.payload as ISalesPaymentReport,
      }
    case DonutSalesPaymentReportKind.SET_MONTHLY_DATA:
      return {
        ...state,
        monthlyData: action.payload as ISalesPaymentReport,
      }
    case DonutSalesPaymentReportKind.SET_PARAMS:
      return {
        ...state,
        params: action.payload as ISalesPaymentReportQueryParams,
      }
  }
}

export const useDountSalesPaymentReport = () => {
  const {promoterId} = usePromoterList()
  const [salesPaymentPointReportState, dispatchSalesPaymentReport] = useReducer(
    donutSalesPaymentReportReducer,
    {
      dailyData: {} as ISalesPaymentReport,
      monthlyData: {} as ISalesPaymentReport,
      params: {
        baseUrl: `/SalesReport/get-total-sales-and-payment-report`,
        promoterId: promoterId,
        reportType: ReportTypes.Daily,
      } as ISalesPaymentReportQueryParams,
    }
  )

  const {
    data: salesPaymentDailyReportData,
    isFetching: isFetchingDailyReport,
    refetch: getSalesPaymentDailyReport,
  } = useQuery<ReactQueryResponse<ISalesPaymentReport>>(
    'get-salepoint-total-sales-report-daily',
    async () => {
      const url = buildUrl(salesPaymentPointReportState.params.baseUrl, {
        promoterId: salesPaymentPointReportState.params.promoterId,
        reportType: ReportTypes.Daily,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  const {
    data: salesPaymentMonthlyReportData,
    isFetching: isFetchingMonthlyReport,
    refetch: getSalesPaymentMonthlyReport,
  } = useQuery<ReactQueryResponse<ISalesPaymentReport>>(
    'get-salepoint-total-sales-report-monthly',
    async () => {
      const url = buildUrl(salesPaymentPointReportState.params.baseUrl, {
        promoterId: salesPaymentPointReportState.params.promoterId,
        reportType: ReportTypes.Monthly,
      })
      return await axios.get(url)
    },
    {enabled: !!promoterId}
  )

  const setDailyData = (payload: ISalesPaymentReport) => {
    dispatchSalesPaymentReport({type: DonutSalesPaymentReportKind.SET_DAILY_DATA, payload})
  }

  const setMonthlyData = (payload: ISalesPaymentReport) => {
    dispatchSalesPaymentReport({type: DonutSalesPaymentReportKind.SET_MONTHLY_DATA, payload})
  }

  useEffect(() => {
    if (!isFetchingDailyReport) {
      getSalesPaymentDailyReport()
    }
    if (!isFetchingMonthlyReport) {
      getSalesPaymentMonthlyReport()
    }
  }, [])

  useEffect(() => {
    if (!isFetchingDailyReport && salesPaymentDailyReportData) {
      setDailyData(salesPaymentDailyReportData.data.response)
    }
  }, [isFetchingDailyReport, salesPaymentDailyReportData])

  useEffect(() => {
    if (!isFetchingMonthlyReport && salesPaymentMonthlyReportData) {
      setMonthlyData(salesPaymentMonthlyReportData.data.response)
    }
  }, [isFetchingMonthlyReport, salesPaymentMonthlyReportData])

  return {
    isLoading: isFetchingDailyReport || isFetchingMonthlyReport,
    dailyData: salesPaymentPointReportState.dailyData,
    monthlyData: salesPaymentPointReportState.monthlyData,
  }
}
