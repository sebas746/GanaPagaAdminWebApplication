import SalesSellerReportTable from '../../../../components/Tables/Reports/Sales/SalesSellerReportTable'
import {useSalesSellerReport} from './SalesSellerReport.hook'

const SalesSellerReport = () => {
  const {
    salesSellerReportState,
    resetFilters,
    setTempFilters,
    isLoading,
    setSalesSellerReportParams,
    handleFilterChange,
    tempFilters,
    usdSalePointData,
    vesSalePointData,
    promoterName,
  } = useSalesSellerReport()
  return (
    <>
      <SalesSellerReportTable
        isLoading={isLoading}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        salesSellerReportPaginated={salesSellerReportState.salesReportPaginated}
        params={salesSellerReportState.params}
        setSalesSellerReportParams={setSalesSellerReportParams}
        setTempFilters={setTempFilters}
        tempFilters={tempFilters}
        sellers={salesSellerReportState.sellers}
        currenciesData={[
          {currencyCode: 'USD', data: usdSalePointData},
          {currencyCode: 'VES', data: vesSalePointData},
        ]}
        promoterName={promoterName}
      />
    </>
  )
}

export default SalesSellerReport
