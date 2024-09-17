import HasPermission from '../../../../components/HasPermissions/HasPermissions'
import {useSalesGameTypeReport} from './SalesGameTypeReport.hook'
import SalesGameTypeReportWrapper from './SalesGameTypeReportWrapper'

const SalesGameTypeReportContainer = () => {
  const {
    isLoadingSalesGameTypeReport,
    saleGameTypeTempFilters,
    salesGameTypeData,
    setSalesGameTypeTempFilters,
  } = useSalesGameTypeReport()

  const usdSalePointData =
    salesGameTypeData.find((data) => data.currencyCode === 'USD')?.salesGameTypeList || []

  const vesSalePointData =
    salesGameTypeData.find((data) => data.currencyCode === 'VES')?.salesGameTypeList || []

  const canLoadReport =
    !isLoadingSalesGameTypeReport && salesGameTypeData && salesGameTypeData.length > 0
  return (
    <>
      <HasPermission resource='reports' actions={['game-type-report']}>
        {canLoadReport && (
          <div className='row'>
            <div className='col-xl-12'>
              <SalesGameTypeReportWrapper
                className='card-xl-stretch mb-5 mb-xl-8'
                setTempFilters={setSalesGameTypeTempFilters}
                tempFilters={saleGameTypeTempFilters}
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

export default SalesGameTypeReportContainer
