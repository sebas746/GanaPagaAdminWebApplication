import RenderLoader from '../../../../components/RenderLoader/RenderLoader'
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
      />
    </>
  )
}

export default SalesSellerReport
