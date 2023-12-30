import {CurrencyCode, CurrencyId, currencies} from '../../../../../types/Currency.types'
import {useScrutinyDetail} from '../../../../components/Cards/ScrutinyDetail/components/ScrutinyDetailTable.hook'
import TicketDetail from '../../../../components/Modals/TicketDetail/TicketDetail'
import TicketReportTable from '../../../../components/Tables/Reports/Ticket/TicketReportTable'
import {useTicketReport} from './TicketReport.hook'

const TicketReport = () => {
  const {
    ticketReportUsdState,
    resetUsdFilters,
    setTempFiltersUsd,
    isLoading,
    setTicketReportParams,
    handleUsdFilterChange,
    tempFiltersUsd,
    setUsdTicketId,
    selectedTab,
    setSelectedTab,
    handleVesFilterChange,
    resetVesFilters,
    setTempFiltersVes,
    setVesTicketId,
    tempFiltersVes,
    ticketReportVesState,
    isLoadingVes,
  } = useTicketReport()
  const {
    ticketDetailState,
    isTicketDetailLoading,
    handleCloseTicketModal,
    refreshCount,
    setTicketModalShow,
  } = useScrutinyDetail(ticketReportUsdState.ticketId ?? '')
  const ticketDetailId = ticketReportUsdState.ticketId || ticketReportVesState.ticketId

  return (
    <>
      <ul className='nav nav-tabs' role='tablist'>
        {currencies.map((currency) => (
          <li className='nav-item' role='presentation' key={`currency-tab-${currency.currencyId}`}>
            <button
              className={`nav-link ${selectedTab === currency.currencyId ? 'active' : ''}`}
              id={`tab-${currency.currencyCode.toLowerCase()}-tab`}
              data-bs-toggle='tab'
              data-bs-target={`#tab-${currency.currencyCode.toLowerCase()}`}
              type='button'
              onClick={() => setSelectedTab(currency.currencyId)}
              role='tab'
              aria-controls={`tab-${currency.currencyName.toLowerCase()}`}
              aria-selected={selectedTab === currency.currencyId ? 'true' : 'false'}
            >
              Reporte tiquetes {currency.currencyCode.toLocaleUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <div className='tab-content'>
        {currencies.map((currency) => (
          <div
            className={`tab-pane fade ${selectedTab === currency.currencyId ? 'show active' : ''}`}
            id={`tab-${currency.currencyCode.toLowerCase()}`}
            role='tabpanel'
            aria-labelledby={`tab-${currency.currencyCode.toLowerCase()}-tab`}
            key={`currency-content-${currency.currencyId}`}
          >
            {currency.currencyId === CurrencyId.USD &&
              ticketReportUsdState.ticketReportPaginated && (
                <TicketReportTable
                  key={currency.currencyId}
                  isLoading={isLoading}
                  handleFilterChange={handleUsdFilterChange}
                  resetFilters={resetUsdFilters}
                  ticketReportPaginated={ticketReportUsdState.ticketReportPaginated}
                  params={ticketReportUsdState.params}
                  setTicketReportParams={setTicketReportParams}
                  setTempFilters={setTempFiltersUsd}
                  tempFilters={tempFiltersUsd}
                  sellers={ticketReportUsdState.sellers}
                  setTicketId={setUsdTicketId}
                  ticketId={ticketReportUsdState?.ticketId ?? ''}
                  isTicketDetailLoading={isTicketDetailLoading}
                  currencyCode={CurrencyCode.USD}
                />
              )}
            {currency.currencyId === CurrencyId.VES &&
              ticketReportVesState.ticketReportPaginated && (
                <TicketReportTable
                  key={currency.currencyId}
                  isLoading={isLoadingVes}
                  handleFilterChange={handleVesFilterChange}
                  resetFilters={resetVesFilters}
                  ticketReportPaginated={ticketReportVesState.ticketReportPaginated}
                  params={ticketReportVesState.params}
                  setTicketReportParams={setTicketReportParams}
                  setTempFilters={setTempFiltersVes}
                  tempFilters={tempFiltersVes}
                  sellers={ticketReportVesState.sellers}
                  setTicketId={setVesTicketId}
                  ticketId={ticketReportVesState?.ticketId ?? ''}
                  isTicketDetailLoading={isTicketDetailLoading}
                  currencyCode={CurrencyCode.VES}
                />
              )}
          </div>
        ))}
      </div>
      <div className='mb-10'>
        {ticketDetailId && (
          <TicketDetail
            ticketId={ticketDetailId}
            currentTicket={ticketDetailState.ticketDetail}
            handleCloseTicketModal={handleCloseTicketModal}
            refreshCount={refreshCount}
            setTicketModalShow={setTicketModalShow}
            ticketModalShow={ticketDetailState.ticketModalShow}
          />
        )}
      </div>
    </>
  )
}

export default TicketReport
