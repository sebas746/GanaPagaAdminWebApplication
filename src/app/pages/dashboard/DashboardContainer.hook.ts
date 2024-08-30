import {useMemo} from 'react'
import {IDonutSalesPaymentReport} from '../../../types/DonutSalesPaymentReport.types'
import {useDountSalesPaymentReport} from '../../modules/dashboard/sales/donut/DonutSalesPaymentReport.hook'

export const useFormattedSalesPaymentData = () => {
  const {isLoading, dailyData, monthlyData} = useDountSalesPaymentReport()

  const usdDailyData: IDonutSalesPaymentReport = useMemo(
    () => ({
      totalPaid: dailyData?.usdTotalPaid ?? 0,
      totalSales: dailyData?.usdTotalSales ?? 0,
      totalProfit: dailyData?.usdTotalProfit ?? 0,
    }),
    [dailyData]
  )

  const vesDailyData: IDonutSalesPaymentReport = useMemo(
    () => ({
      totalPaid: dailyData?.vesTotalPaid ?? 0,
      totalSales: dailyData?.vesTotalSales ?? 0,
      totalProfit: dailyData?.vesTotalProfit ?? 0,
    }),
    [dailyData]
  )

  const usdMonthlyData: IDonutSalesPaymentReport = useMemo(
    () => ({
      totalPaid: monthlyData?.usdTotalPaid ?? 0,
      totalSales: monthlyData?.usdTotalSales ?? 0,
      totalProfit: monthlyData?.usdTotalProfit ?? 0,
    }),
    [monthlyData]
  )

  const vesMonthlyData: IDonutSalesPaymentReport = useMemo(
    () => ({
      totalPaid: monthlyData?.vesTotalPaid ?? 0,
      totalSales: monthlyData?.vesTotalSales ?? 0,
      totalProfit: monthlyData?.vesTotalProfit ?? 0,
    }),
    [monthlyData]
  )

  return {
    isLoading,
    usdDailyData,
    vesDailyData,
    usdMonthlyData,
    vesMonthlyData,
  }
}
