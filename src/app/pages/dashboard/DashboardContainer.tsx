import {ChartsWidget1, ChartsWidget2} from '../../../_metronic/partials/widgets'
import HasPermission from '../../components/HasPermissions/HasPermissions'
import RenderLoader from '../../components/RenderLoader/RenderLoader'
import {BarSalesSalePointReport} from '../../modules/dashboard/sales/bar/BarSalesSalePointReport'
import {useBarSalesSalePointReport} from '../../modules/dashboard/sales/bar/BarSalesSalePointReport.hook'
import {BarSalesSellersReport} from '../../modules/dashboard/sales/bar/BarSalesSellersReport'
import {useBarSalesSellersReport} from '../../modules/dashboard/sales/bar/BarSalesSellersReport.hook'
import {DonutSalesPaymentReport} from '../../modules/dashboard/sales/donut/DonutSalesPaymentReport'
import {useFormattedSalesPaymentData} from './DashboardContainer.hook'

const DashboardContainer = () => {
  const {isLoading, usdDailyData, vesDailyData, usdMonthlyData, vesMonthlyData} =
    useFormattedSalesPaymentData()

  const {
    isLoadingSalesSalePointReport,
    salesSalePointData,
    setSalesSalePointTempFilters,
    saleSalesPointTempFilters,
  } = useBarSalesSalePointReport()
  const canLoadDonutReports = !isLoading && usdDailyData.totalSales && usdMonthlyData.totalSales
  const canLoadBarReports =
    !isLoadingSalesSalePointReport && salesSalePointData && salesSalePointData.length > 0

  return (
    <>
      <HasPermission resource='dashboard' actions={['dashboard']}>
        <RenderLoader show={isLoading} huge={true} />
        {canLoadDonutReports && (
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
          </div>
        )}
        {canLoadBarReports && (
          <div className='row'>
            {salesSalePointData.map((data, index) => (
              <div className='col-xl-6' key={index}>
                <BarSalesSalePointReport
                  setTempFilters={setSalesSalePointTempFilters}
                  tempFilters={saleSalesPointTempFilters}
                  className='card-xxl-stretch mb-5 mb-xl-10'
                  currencyCode={data.currencyCode}
                  data={data.totalSalesSeller}
                />
              </div>
            ))}
          </div>
        )}
      </HasPermission>
    </>
  )
}

export default DashboardContainer
