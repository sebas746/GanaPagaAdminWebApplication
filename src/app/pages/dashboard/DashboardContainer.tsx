import {ChartsWidget1, ChartsWidget2} from '../../../_metronic/partials/widgets'
import HasPermission from '../../components/HasPermissions/HasPermissions'
import RenderLoader from '../../components/RenderLoader/RenderLoader'
import {BarSalesSalePointReport} from '../../modules/dashboard/sales/bar/BarSalesSalePointReport'
import {useBarSalesSalePointReport} from '../../modules/dashboard/sales/bar/BarSalesSalePointReport.hook'
import {BarSalesSalePointReportWrapper} from '../../modules/dashboard/sales/bar/BarSalesSalePointReportWrapper'
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
    saleSalesPointTempFilters,
    setSalesSalePointTempFilters,
  } = useBarSalesSalePointReport()
  const canLoadDonutReports = !isLoading && usdDailyData.totalSales && usdMonthlyData.totalSales
  const canLoadBarReports =
    !isLoadingSalesSalePointReport && salesSalePointData && salesSalePointData.length > 0

  const usdSalePointData =
    salesSalePointData.find((data) => data.currencyCode === 'USD')?.salesSalePointList || []

  // Extract data for VES
  const vesSalePointData =
    salesSalePointData.find((data) => data.currencyCode === 'VES')?.salesSalePointList || []

  return (
    <>
      <HasPermission resource='dashboard' actions={['dashboard']}>
        <RenderLoader show={isLoading} huge={true} />
        {canLoadDonutReports && (
          <div className='row'>
            {/* Daily Report Card */}
            <div className='col-xl-6'>
              <div className='card card-xl-stretch mb-5 mb-xl-8'>
                <div className='card-header'>
                  <h3 className='card-title'>Balance - Hoy</h3>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <DonutSalesPaymentReport
                      chartColor='primary'
                      chartHeight='200px'
                      title='USD'
                      currencyCode='USD'
                      reportData={usdDailyData}
                      className={'mb-5'}
                    />
                  </div>
                  <div className='col-md-6'>
                    <DonutSalesPaymentReport
                      chartColor='danger'
                      chartHeight='200px'
                      title='VES'
                      currencyCode='VES'
                      reportData={vesDailyData}
                      className={'mb-5'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Report Card */}
            <div className='col-xl-6'>
              <div className='card card-xl-stretch mb-5 mb-xl-8'>
                <div className='card-header'>
                  <h3 className='card-title'>Balance - Mes en curso</h3>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <DonutSalesPaymentReport
                      chartColor='primary'
                      chartHeight='200px'
                      title='USD'
                      currencyCode='USD'
                      reportData={usdMonthlyData}
                      className={'mb-5'}
                    />
                  </div>
                  <div className='col-md-6'>
                    <DonutSalesPaymentReport
                      chartColor='danger'
                      chartHeight='200px'
                      title='VES'
                      currencyCode='VES'
                      reportData={vesMonthlyData}
                      className={'mb-5'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {canLoadBarReports && (
          <div className='row'>
            <div className='col-xl-12'>
              <BarSalesSalePointReportWrapper
                className='card-xl-stretch mb-5 mb-xl-8'
                setTempFilters={setSalesSalePointTempFilters}
                tempFilters={saleSalesPointTempFilters}
                currenciesData={[
                  {currencyCode: 'USD', data: usdSalePointData},
                  {currencyCode: 'VES', data: vesSalePointData},
                ]}
              />
            </div>
          </div>
        )}
      </HasPermission>
    </>
  )
}

export default DashboardContainer
