import RenderLoader from '../../../../components/RenderLoader/RenderLoader'
import SalesSalePointReportTable from '../../../../components/Tables/Reports/Sales/SalesSalePointReportTable'
import {useSalesSalePointReport} from './SalesSalePointReport.hook'

const SalesSalePointReport = () => {
  const {
    salesSalePointReportState,
    resetFilters,
    setTempFilters,
    isLoading,
    setSalesSalePointReportParams,
    handleFilterChange,
    tempFilters,
    usdSalePointData,
    vesSalePointData,
    isLoadingSalesSalePointChartReport,
    promoterName,
  } = useSalesSalePointReport()

  return (
    <>
      <RenderLoader show={isLoadingSalesSalePointChartReport || isLoading} huge={true} />
      {!isLoadingSalesSalePointChartReport && !isLoading && (
        <>
          <SalesSalePointReportTable
            isLoading={isLoading}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
            salesSalePointReportPaginated={salesSalePointReportState.salesReportPaginated}
            params={salesSalePointReportState.params}
            setSalesSalePointReportParams={setSalesSalePointReportParams}
            setTempFilters={setTempFilters}
            tempFilters={tempFilters}
            salePoints={salesSalePointReportState.salePoints}
            currenciesData={[
              {currencyCode: 'USD', data: usdSalePointData},
              {currencyCode: 'VES', data: vesSalePointData},
            ]}
            promoterName={promoterName}
          />
        </>
      )}
    </>
  )
}

export default SalesSalePointReport
