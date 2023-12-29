import {Form, Pagination} from 'react-bootstrap'
import {DateTime} from 'luxon'
import {CurrencyCode} from '../../../../../../types/Currency.types'
import {
  ITicketReportResponse,
  ITicketReportQueryParams,
} from '../../../../../../types/TicketReport.types'
import {formatCurrency} from '../../../../../helpers/currency.helpers'
import RenderLoader from '../../../../RenderLoader/RenderLoader'

interface TicketDetailReportTableProps {
  ticketReportPaginated: ITicketReportResponse
  params: ITicketReportQueryParams
  handleFilterChange: (filterName: keyof ITicketReportQueryParams, value: any) => void
  isLoading: boolean
  currencyCode: string
  setTicketId: (ticketId: string) => void
  ticketId: string
  isTicketDetailLoading: boolean
}

const TicketDetailReportTable = ({
  ticketReportPaginated,
  params,
  handleFilterChange,
  isLoading,
  currencyCode,
  setTicketId,
  ticketId,
  isTicketDetailLoading,
}: TicketDetailReportTableProps) => {
  return (
    <>
      {!isLoading && ticketReportPaginated && ticketReportPaginated.ticketsCount > 0 && (
        <>
          <div className='table-title text-left'>
            <h2>Reporte tiquetes en {currencyCode}</h2>
          </div>
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-300 gy-6'>
              <thead>
                <tr
                  className={`fw-bold text-light ${
                    currencyCode === CurrencyCode.USD ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  <th className='text-center'>Fecha</th>
                  <th className='text-center'>ID Tiquete</th>
                  <th className='text-center'>N° Tiquete</th>
                  <th className='text-center'>Total</th>
                  <th className='text-center'>Vendedor</th>
                  <th className='text-center'>Acciones</th>
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
                      <td className='text-center'>{ticket.ticketNumber}</td>
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
    </>
  )
}

export default TicketDetailReportTable
