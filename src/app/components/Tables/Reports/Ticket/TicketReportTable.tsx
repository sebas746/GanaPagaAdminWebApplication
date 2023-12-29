import {Form, Pagination} from 'react-bootstrap'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {DateTime} from 'luxon'
import {
  ITicketReportQueryParams,
  ITicketReportResponse,
} from '../../../../../types/TicketReport.types'
import TicketDetail from '../../../Modals/TicketDetail/TicketDetail'
import {useScrutinyDetail} from '../../../Cards/ScrutinyDetail/components/ScrutinyDetailTable.hook'
import TicketDetailReportTable from './TicketDetailReportTable/TicketDetailReportTable'

interface TicketReportTableProps {
  ticketReportPaginatedUsd: ITicketReportResponse
  ticketReportPaginatedVes: ITicketReportResponse
  params: ITicketReportQueryParams
  handleFilterChange: (filterName: keyof ITicketReportQueryParams, value: any) => void
  isLoading: boolean
  setTempFilters: React.Dispatch<React.SetStateAction<ITicketReportQueryParams>>
  setTicketReportParams: () => void
  tempFilters: ITicketReportQueryParams
  resetFilters: () => void
  sellers: string[]
  setTicketId: (ticketId: string) => void
  ticketId: string
}

const TicketReportTable = ({
  ticketReportPaginatedUsd,
  ticketReportPaginatedVes,
  params,
  handleFilterChange,
  isLoading,
  setTempFilters,
  setTicketReportParams,
  tempFilters,
  resetFilters,
  sellers,
  setTicketId,
  ticketId,
}: TicketReportTableProps) => {
  const {
    ticketDetailState,
    isTicketDetailLoading,
    handleCloseTicketModal,
    refreshCount,
    setTicketModalShow,
  } = useScrutinyDetail(ticketId)
  return (
    <>
      <div className='card-body py-3'>
        <div className='mb-4'>
          <div className='row mb-2'>
            {/* Initial Date Input */}
            <div className='col-md-3'>
              <label htmlFor='initialDate' className='form-label'>
                Fecha Inicial
              </label>
              <input
                id='initialDate'
                type='date'
                className='form-control'
                placeholder='Fecha inicial'
                onChange={(e) => setTempFilters((prev) => ({...prev, initialDate: e.target.value}))}
                value={tempFilters.initialDate}
              />
            </div>

            {/* End Date Input */}
            <div className='col-md-3'>
              <label htmlFor='endDate' className='form-label'>
                Fecha Final
              </label>
              <input
                id='endDate'
                type='date'
                className='form-control'
                placeholder='Fecha final'
                onChange={(e) => setTempFilters((prev) => ({...prev, endDate: e.target.value}))}
                value={tempFilters.endDate}
              />
            </div>

            {/* Role Selector */}
            <div className='col-md-3'>
              <label htmlFor='roleSelector' className='form-label'>
                Vendedor
              </label>
              <Form.Select
                id='sellerEmail'
                className='form-control'
                onChange={(e) => setTempFilters((prev) => ({...prev, sellerEmail: e.target.value}))}
                value={tempFilters.sellerEmail}
              >
                <option value=''>Todos</option>
                {sellers.map((seller: string) => (
                  <option key={seller} value={seller}>
                    {`${seller}`}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-12'>
              <div className='btn-group'>
                <button
                  className='btn btn-primary'
                  disabled={isLoading}
                  onClick={() => setTicketReportParams()}
                >
                  Buscar
                </button>
                <button className='btn btn-secondary' onClick={resetFilters}>
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <RenderLoader show={isLoading} huge={true} />}
        <TicketDetailReportTable
          ticketReportPaginated={ticketReportPaginatedUsd}
          currencyCode={ticketReportPaginatedUsd.currencyCode}
          handleFilterChange={handleFilterChange}
          isLoading={isLoading}
          isTicketDetailLoading={isTicketDetailLoading}
          params={params}
          setTicketId={setTicketId}
          ticketId={ticketId}
        />
        <TicketDetailReportTable
          ticketReportPaginated={ticketReportPaginatedVes}
          currencyCode={ticketReportPaginatedVes.currencyCode}
          handleFilterChange={handleFilterChange}
          isLoading={isLoading}
          isTicketDetailLoading={isTicketDetailLoading}
          params={params}
          setTicketId={setTicketId}
          ticketId={ticketId}
        />
      </div>
      <div className='mb-10'>
        {ticketId && (
          <TicketDetail
            ticketId={ticketId}
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

export default TicketReportTable
