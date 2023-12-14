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
  } = useSalesSalePointReport()
  return (
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
      />
    </>
  )
}

export default SalesSalePointReport
