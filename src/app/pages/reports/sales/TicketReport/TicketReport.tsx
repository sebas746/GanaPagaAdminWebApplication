import {useScrutinyDetail} from '../../../../components/Cards/ScrutinyDetail/components/ScrutinyDetailTable.hook'
import TicketDetail from '../../../../components/Modals/TicketDetail/TicketDetail'
import TicketReportTable from '../../../../components/Tables/Reports/Ticket/TicketReportTable'
import {useTicketReport} from './TicketReport.hook'

const TicketReport = () => {
  const {
    ticketReportState,
    resetFilters,
    setTempFilters,
    isLoading,
    setSalesSellerReportParams,
    handleFilterChange,
    tempFilters,
    setTicketId,
  } = useTicketReport()

  return (
    <>
      <TicketReportTable
        isLoading={isLoading}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        ticketReportPaginatedUsd={ticketReportState.ticketReportUsdPaginated}
        ticketReportPaginatedVes={ticketReportState.ticketReportVesPaginated}
        params={ticketReportState.params}
        setTicketReportParams={setSalesSellerReportParams}
        setTempFilters={setTempFilters}
        tempFilters={tempFilters}
        sellers={ticketReportState.sellers}
        setTicketId={setTicketId}
        ticketId={ticketReportState?.ticketId ?? ''}
      />
    </>
  )
}

export default TicketReport
