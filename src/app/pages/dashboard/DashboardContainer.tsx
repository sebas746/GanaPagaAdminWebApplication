import HasPermission from '../../components/HasPermissions/HasPermissions'
import RenderLoader from '../../components/RenderLoader/RenderLoader'
import {getCurrentMonthInSpanish} from '../../helpers/utilities.helpers'
import {useBarSalesSalePointReport} from '../../modules/dashboard/sales/bar/BarSalesSalePointReport.hook'
import {BarSalesSalePointReportWrapper} from '../../modules/dashboard/sales/bar/BarSalesSalePointReportWrapper'
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
  const canLoadUsdDailyReport =
    !isLoading && (usdDailyData.totalSales > 0 || usdDailyData.totalPaid > 0)

  const canLoadVesDailyReport =
    !isLoading && (vesDailyData.totalSales > 0 || vesDailyData.totalPaid > 0)

  const canLoadUsdMonthlyReport =
    !isLoading && (usdMonthlyData.totalSales > 0 || usdMonthlyData.totalPaid > 0)

  const canLoadVesMonthlyReport =
    !isLoading && (vesMonthlyData.totalSales > 0 || vesMonthlyData.totalPaid > 0)

  const canLoadBarReports =
    !isLoadingSalesSalePointReport && salesSalePointData && salesSalePointData.length > 0

  const usdSalePointData =
    salesSalePointData.find((data) => data.currencyCode === 'USD')?.salesSalePointList || []

  const vesSalePointData =
    salesSalePointData.find((data) => data.currencyCode === 'VES')?.salesSalePointList || []
  const areReportsLoading = isLoading || isLoadingSalesSalePointReport
  return (
    <>
      <HasPermission resource='dashboard' actions={['dashboard']}>
        <RenderLoader show={areReportsLoading} huge={true} />
        <div className='row'>
          {/* Daily Report Card */}
          {!areReportsLoading ? (
            canLoadUsdDailyReport || canLoadVesDailyReport ? (
              <div className='col-xl-6'>
                <div className='card card-xl-stretch mb-5 mb-xl-8'>
                  <div className='card-header'>
                    <h3 className='card-title'>Balance - Hoy</h3>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      {canLoadUsdDailyReport ? (
                        <DonutSalesPaymentReport
                          chartColor='primary'
                          chartHeight='200px'
                          title='USD'
                          currencyCode='USD'
                          reportData={usdDailyData}
                          className={'mb-5'}
                        />
                      ) : (
                        <div
                          className='d-flex align-items-center justify-content-center'
                          style={{height: '200px'}}
                        >
                          <span className='text-center text-gray-500'>
                            No hay información disponible (USD).
                          </span>
                        </div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      {canLoadVesDailyReport ? (
                        <DonutSalesPaymentReport
                          chartColor='danger'
                          chartHeight='200px'
                          title='VES'
                          currencyCode='VES'
                          reportData={vesDailyData}
                          className={'mb-5'}
                        />
                      ) : (
                        <div
                          className='d-flex align-items-center justify-content-center'
                          style={{height: '200px'}}
                        >
                          <span className='text-center text-gray-500'>
                            No hay información disponible (VES).
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className='col-xl-6 d-flex align-items-center justify-content-center'
                style={{height: '300px'}}
              >
                <h3 className='text-center text-gray-500'>
                  No hay información para el día de hoy.
                </h3>
              </div>
            )
          ) : null}

          {/* Monthly Report Card */}
          {!areReportsLoading ? (
            canLoadUsdMonthlyReport || canLoadVesMonthlyReport ? (
              <div className='col-xl-6'>
                <div className='card card-xl-stretch mb-5 mb-xl-8'>
                  <div className='card-header'>
                    <h3 className='card-title'>Balance - {getCurrentMonthInSpanish()}</h3>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      {canLoadUsdMonthlyReport ? (
                        <DonutSalesPaymentReport
                          chartColor='primary'
                          chartHeight='200px'
                          title='USD'
                          currencyCode='USD'
                          reportData={usdMonthlyData}
                          className={'mb-5'}
                        />
                      ) : (
                        <div
                          className='d-flex align-items-center justify-content-center'
                          style={{height: '200px'}}
                        >
                          <span className='text-center text-gray-500'>
                            No hay información disponible (USD).
                          </span>
                        </div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      {canLoadVesMonthlyReport ? (
                        <DonutSalesPaymentReport
                          chartColor='danger'
                          chartHeight='200px'
                          title='VES'
                          currencyCode='VES'
                          reportData={vesMonthlyData}
                          className={'mb-5'}
                        />
                      ) : (
                        <div
                          className='d-flex align-items-center justify-content-center'
                          style={{height: '200px'}}
                        >
                          <span className='text-center text-gray-500'>
                            No hay información disponible (VES).
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className='col-xl-6 d-flex align-items-center justify-content-center'
                style={{height: '300px'}}
              >
                <h3 className='text-center text-gray-500'>
                  No hay información para el mes actual.
                </h3>
              </div>
            )
          ) : null}
        </div>
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
