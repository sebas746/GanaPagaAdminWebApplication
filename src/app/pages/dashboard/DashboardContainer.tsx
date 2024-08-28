import {ChartsWidget1, ChartsWidget2} from '../../../_metronic/partials/widgets'
import {IDonutSalesPaymentReport} from '../../../types/DonutSalesPaymentReport.types'
import HasPermission from '../../components/HasPermissions/HasPermissions'
import RenderLoader from '../../components/RenderLoader/RenderLoader'
import {DonutSalesPaymentReport} from '../../modules/dashboard/sales/donut/DonutSalesPaymentReport'
import {useDountSalesPaymentReport} from '../../modules/dashboard/sales/donut/DonutSalesPaymentReport.hook'

const DashboardContainer = () => {
  const {isLoading, dailyData, monthlyData} = useDountSalesPaymentReport()
  const usdDailyData: IDonutSalesPaymentReport = {
    totalPaid: dailyData.usdTotalPaid ?? 0,
    totalSales: dailyData.usdTotalSales ?? 0,
    totalProfit: dailyData.usdTotalProfit ?? 0,
  }
  const vesDailyData: IDonutSalesPaymentReport = {
    totalPaid: dailyData.vesTotalPaid ?? 0,
    totalSales: dailyData.vesTotalSales ?? 0,
    totalProfit: dailyData.vesTotalProfit ?? 0,
  }

  const usdMonthlyData: IDonutSalesPaymentReport = {
    totalPaid: monthlyData.usdTotalPaid ?? 0,
    totalSales: monthlyData.usdTotalSales ?? 0,
    totalProfit: monthlyData.usdTotalProfit ?? 0,
  }
  const vesMonthlyData: IDonutSalesPaymentReport = {
    totalPaid: monthlyData.vesTotalPaid ?? 0,
    totalSales: monthlyData.vesTotalSales ?? 0,
    totalProfit: monthlyData.vesTotalProfit ?? 0,
  }

  return (
    <>
      <HasPermission resource='dashboard' actions={['dashboard']}>
        <RenderLoader show={isLoading} huge={true} />
        {!isLoading && dailyData.usdTotalSales && monthlyData.usdTotalSales && (
          <div className='row'>
            <div className='col-xl-3'>
              <DonutSalesPaymentReport
                className='card-xl-stretch mb-5 mb-xl-8'
                chartColor='primary'
                chartHeight='200px'
                title='Hoy'
                currencyCode='USD'
                reportData={usdDailyData}
              />
            </div>
            <div className='col-xl-3'>
              <DonutSalesPaymentReport
                className='card-xl-stretch mb-5 mb-xl-8'
                chartColor='danger'
                chartHeight='200px'
                title='Hoy'
                currencyCode='VES'
                reportData={vesDailyData}
              />
            </div>
            <div className='col-xl-3'>
              <DonutSalesPaymentReport
                className='card-xl-stretch mb-5 mb-xl-8'
                chartColor='primary'
                chartHeight='200px'
                title='Mes en curso'
                currencyCode='USD'
                reportData={usdMonthlyData}
              />
            </div>
            <div className='col-xl-3'>
              <DonutSalesPaymentReport
                className='card-xl-stretch mb-5 mb-xl-8'
                chartColor='danger'
                chartHeight='200px'
                title='Mes en curso'
                currencyCode='VES'
                reportData={vesMonthlyData}
              />
            </div>
            <div className='col-xl-6'>
              <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
            </div>
            <div className='col-xl-6'>
              <ChartsWidget2 className='card-xxl-stretch mb-5 mb-xl-10' />
            </div>
          </div>
        )}
      </HasPermission>
    </>
  )
}

export default DashboardContainer
