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
import {CURRENCY_USD} from '../../../../constants/reports.constants'

interface TicketReportTableProps {
  ticketReportPaginated: ITicketReportResponse
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
  isTicketDetailLoading: boolean
  currencyCode: string
}

interface TicketSummaryCardProps {
  totalTickets: number
  totalAmount: number
  currencyCodeSummary: string
  totalCancelledTickets: number
}

const TicketSummaryCard = ({
  totalTickets,
  totalAmount,
  currencyCodeSummary,
  totalCancelledTickets,
}: TicketSummaryCardProps) => {
  return (
    <div className='card mb-3' style={{maxWidth: '18rem'}}>
      <div className='card-body'>
        <h5 className='card-title'>Resumen</h5>
        <>
          <p className='card-text'>Total Tiquetes vendidos: {totalTickets}</p>
          <p className='card-text'>
            Total Vendido: {formatCurrency(totalAmount, currencyCodeSummary)}
          </p>
          <p className='card-text'>Total Tiquetes anulados: {totalCancelledTickets}</p>
        </>
      </div>
    </div>
  )
}

const TicketReportTable = ({
  ticketReportPaginated,
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
  isTicketDetailLoading,
  currencyCode,
}: TicketReportTableProps) => {
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

            <div className='col-md-3'>
              <label htmlFor='ticketId' className='form-label'>
                ID Tiquete
              </label>
              <input
                id='ticketId'
                className='form-control'
                placeholder='ID Tiquete'
                onChange={(e) => setTempFilters((prev) => ({...prev, ticketId: e.target.value}))}
                value={tempFilters.ticketId}
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
        <div style={{borderTop: '1px solid #ddd', margin: '20px 0'}}></div>
        {isLoading && <RenderLoader show={isLoading} huge={true} />}
        {!isLoading &&
          ticketReportPaginated &&
          ticketReportPaginated.currencyCode === currencyCode &&
          ticketReportPaginated.ticketsCount > 0 && (
            <>
              <TicketSummaryCard
                totalTickets={ticketReportPaginated.ticketsCount}
                currencyCodeSummary={ticketReportPaginated.currencyCode}
                totalAmount={ticketReportPaginated.totalSales}
                totalCancelledTickets={ticketReportPaginated.ticketCancelledCount}
              />
              <div className='table-responsive'>
                <table className='table table-bordered table-row-bordered table-row-gray-300 gy-6 table-hover'>
                  <thead>
                    <tr
                      className={`fw-bold text-light ${
                        currencyCode === CURRENCY_USD ? 'bg-success' : 'bg-danger'
                      }`}
                    >
                      <th className='text-center fs-4 text-white'>Fecha</th>
                      <th className='text-center fs-4 text-white'>ID Tiquete</th>
                      <th className='text-center fs-4 text-white'>Total</th>
                      <th className='text-center fs-4 text-white'>Vendedor</th>
                      <th className='text-center fs-4 text-white'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketReportPaginated.ticketsCount > 0 &&
                      ticketReportPaginated.tickets.map((ticket, index) => (
                        <tr
                          className='fw-bold fs-6 text-gray-800'
                          key={`${ticket.ticketCreatedAt}-${index}`}
                        >
                          <td className='text-center'>
                            {DateTime.fromISO(ticket.ticketCreatedAt).toFormat('yyyy-MM-dd')}
                          </td>
                          <td className='text-center'>{ticket.ticketId}</td>
                          <td className='text-center'>{ticket.ticketSoldByUserId}</td>
                          <td className='text-center'>
                            {formatCurrency(ticket.ticketTotal, currencyCode)}
                          </td>
                          <td className='text-center'>
                            <div
                              onClick={() => setTicketId(ticket.ticketId)}
                              style={{
                                cursor:
                                  isTicketDetailLoading && ticket.ticketId === ticketId
                                    ? 'not-allowed'
                                    : 'pointer',
                              }}
                            >
                              {isTicketDetailLoading ? (
                                <RenderLoader
                                  key={ticket.ticketNumber}
                                  show={isTicketDetailLoading && ticket.ticketId === ticketId}
                                />
                              ) : (
                                <i className='bi bi-zoom-in text-primary fs-2x'></i>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    {ticketReportPaginated.tickets.length === 0 && (
                      <tr>
                        <td colSpan={7} className='text-center'>
                          No results...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        {!isLoading && ticketReportPaginated && ticketReportPaginated.ticketsCount > 0 && (
          <Pagination>
            {Array.from({
              length: Math.ceil(ticketReportPaginated.ticketsCount / params.pageSize),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index === params.pageIndex}
                onClick={() => handleFilterChange('pageIndex', index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </div>
    </>
  )
}

export default TicketReportTable
