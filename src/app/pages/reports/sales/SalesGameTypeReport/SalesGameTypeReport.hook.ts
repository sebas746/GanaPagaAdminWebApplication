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
  ISalesGameTypeDetailReport,
  ISalesGameTypeReportQueryParams,
} from '../../../../../types/SalesGameTypeReport.types'
import {gameType} from '../../../../constants/game-type.constants'
import {ISalesLotteryGameTypeBarReport} from '../../../../../types/SalesLotteryGameTypeReport.types'

enum SalesGameTypeReportKind {
  SET_DATA = 'SET_DATA',
  SET_PARAMS = 'SET_PARAMS',
  SET_LOTTERY_DATA = 'SET_LOTTERY_DATA',
}

interface SalesGameTypeReportAction {
  type: SalesGameTypeReportKind
  payload:
    | ISalesGameTypeBarReport[]
    | ISalesGameTypeReportQueryParams
    | ISalesLotteryGameTypeBarReport[]
}

interface BarSalesSellersReportState {
  data: ISalesGameTypeBarReport[]
  params: ISalesGameTypeReportQueryParams
  lotteryData: ISalesLotteryGameTypeBarReport[]
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
    case SalesGameTypeReportKind.SET_LOTTERY_DATA:
      return {
        ...state,
        lotteryData: action.payload as ISalesLotteryGameTypeBarReport[],
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
        promoterId: promoterId,
        reportType: ReportTypes.Monthly,
        gameType: '',
      } as ISalesGameTypeReportQueryParams,
      lotteryData: [] as ISalesLotteryGameTypeBarReport[],
    }
  )

  const [tempFilters, setTempFilters] = useState<ISalesGameTypeReportQueryParams>({
    promoterId: salesGameTypeReportState.params.promoterId,
    reportType: salesGameTypeReportState.params.reportType,
    gameType: salesGameTypeReportState.params.gameType || '',
  })

  useEffect(() => {
    if (tempFilters.reportType !== salesGameTypeReportState.params.reportType) {
      handleFilterChange('reportType', tempFilters.reportType)
    }

    if (tempFilters.gameType !== salesGameTypeReportState.params.gameType) {
      handleFilterChange('gameType', tempFilters.gameType)
    }
  }, [tempFilters])

  const handleFilterChange = (filterName: keyof ISalesGameTypeReportQueryParams, value: any) => {
    dispatchSalesGameTypeReport({
      type: SalesGameTypeReportKind.SET_PARAMS,
      payload: {
        ...salesGameTypeReportState.params,
        [filterName]: value,
      } as ISalesGameTypeReportQueryParams,
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

  const {
    data: salesLotteryGameTypeReportData,
    isFetching: isLoadingLottery,
    refetch: getLotterySalesGameTypeReport,
  } = useQuery<ReactQueryResponse<ISalesLotteryGameTypeBarReport[]>>(
    'get-lottery-total-sales-by-game-type-report',
    async () => {
      const url = buildUrl(`/SalesReport/get-lottery-total-sales-by-game-type-report`, {
        promoterId: salesGameTypeReportState.params.promoterId,
        reportType: salesGameTypeReportState.params.reportType,
        gameType: salesGameTypeReportState.params.gameType,
      })
      return await axios.get(url)
    },
    {enabled: false}
  )

  useEffect(() => {
    if (!isLoading && (tempFilters.gameType === undefined || tempFilters.gameType === '')) {
      getSalesGameTypeReport()
    }

    if (!isLoadingLottery && tempFilters.gameType && tempFilters.gameType !== '') {
      getLotterySalesGameTypeReport()
    }
  }, [salesGameTypeReportState.params])

  const setDailyData = (payload: ISalesGameTypeBarReport[]) => {
    dispatchSalesGameTypeReport({type: SalesGameTypeReportKind.SET_DATA, payload})
  }

  const setLotteryData = (payload: ISalesLotteryGameTypeBarReport[]) => {
    dispatchSalesGameTypeReport({type: SalesGameTypeReportKind.SET_LOTTERY_DATA, payload})
  }

  useEffect(() => {
    if (!isLoading && (tempFilters.gameType === undefined || tempFilters.gameType === '')) {
      getSalesGameTypeReport()
    }

    if (!isLoadingLottery && tempFilters.gameType && tempFilters.gameType !== '') {
      getLotterySalesGameTypeReport()
    }
  }, [])

  useEffect(() => {
    if (!isLoadingLottery && salesLotteryGameTypeReportData) {
      setLotteryData(salesLotteryGameTypeReportData.data.response)
    }
  }, [isLoadingLottery, salesLotteryGameTypeReportData])

  useEffect(() => {
    if (!isLoading && salesGameTypeReportData) {
      setDailyData(salesGameTypeReportData.data.response)
    }
  }, [isLoading, salesGameTypeReportData])

  return {
    isLoadingSalesGameTypeReport: isLoading || isLoadingLottery,
    salesGameTypeData: salesGameTypeReportState.data,
    salesLotteryGameTypeData: salesGameTypeReportState.lotteryData,
    setSalesGameTypeTempFilters: setTempFilters,
    saleGameTypeTempFilters: tempFilters,
  }
}
