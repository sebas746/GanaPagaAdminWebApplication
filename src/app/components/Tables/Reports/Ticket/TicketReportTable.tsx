import {Card, Col, Form, Pagination, Row} from 'react-bootstrap'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {DateTime} from 'luxon'
import {
  ITicketReportQueryParams,
  ITicketReportResponse,
  TicketStatusEnum,
} from '../../../../../types/TicketReport.types'
import TicketDetail from '../../../Modals/TicketDetail/TicketDetail'
import {useScrutinyDetail} from '../../../Cards/ScrutinyDetail/components/ScrutinyDetailTable.hook'
import {CURRENCY_USD} from '../../../../constants/reports.constants'
import ConditionalRendering from '../../../../helpers/ConditionalRedering'
import {useTicketReport} from '../../../../pages/reports/sales/TicketReport/TicketReport.hook'
import {useTicketRerportTable} from './TicketReportTable.hook'

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
  currencyCode: string
  totalCancelledTickets: number
  ticketsPendingCount: number
  ticketsPendingPaymentCount: number
  ticketsWinnerCount: number
  ticketLoserCount: number
}

const TicketSummaryCard = ({
  totalTickets,
  totalAmount,
  currencyCode,
  totalCancelledTickets,
  ticketsPendingCount,
  ticketsPendingPaymentCount,
  ticketsWinnerCount,
  ticketLoserCount,
}: TicketSummaryCardProps) => {
  return (
    <div className='card mb-3' style={{maxWidth: '50rem'}}>
      <div
        className={`card-header text-white ${
          currencyCode === CURRENCY_USD ? 'bg-success' : 'bg-danger'
        }`}
      >
        <h4 className='card-title text-white fw-bold'>Resultados</h4>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col'>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Tiquetes vendidos: {totalTickets}
            </p>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Vendido {currencyCode}: {formatCurrency(totalAmount, currencyCode)}
            </p>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Tiquetes anulados: {totalCancelledTickets}
            </p>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Tiquetes Pendientes: {ticketsPendingCount}
            </p>
          </div>
          <div className='col'>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Tiquetes Pendientes por Pago: {ticketsPendingPaymentCount}
            </p>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Tiquetes Ganadores: {ticketsWinnerCount}
            </p>
            <p className='card-text fw-bold fs-6 text-gray-800'>
              Total Tiquetes Perdedores: {ticketLoserCount}
            </p>
          </div>
        </div>
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
  const {stateToText, stateToColor} = useTicketRerportTable()
  const showPagination =
    !isLoading && ticketReportPaginated && ticketReportPaginated.ticketsCount > 0
  const showSummaryCard =
    !isLoading &&
    ticketReportPaginated &&
    ticketReportPaginated.currencyCode === currencyCode &&
    ticketReportPaginated.ticketsCount > 0
  return (
    <>
      <Card.Body className='py-3'>
        <div className='mb-4'>
          <Row className='mb-2'>
            {/* Initial Date Input */}
            <Col md={3}>
              <Form.Label htmlFor='initialDate'>Fecha Inicial</Form.Label>
              <Form.Control
                id='initialDate'
                type='date'
                placeholder='Fecha inicial'
                onChange={(e) => setTempFilters((prev) => ({...prev, initialDate: e.target.value}))}
                value={tempFilters.initialDate}
              />
            </Col>

            {/* End Date Input */}

            <Col md={3}>
              <Form.Label htmlFor='endDate'>Fecha Final</Form.Label>

              <Form.Control
                id='endDate'
                type='date'
                className='form-control'
                placeholder='Fecha final'
                onChange={(e) => setTempFilters((prev) => ({...prev, endDate: e.target.value}))}
                value={tempFilters.endDate}
              />
            </Col>

            <Col md={3}>
              <Form.Label htmlFor='ticketId'>ID Tiquete</Form.Label>
              <Form.Control
                id='ticketId'
                className='form-control'
                placeholder='ID Tiquete'
                onChange={(e) => setTempFilters((prev) => ({...prev, ticketId: e.target.value}))}
                value={tempFilters.ticketId}
              />
            </Col>

            {/* Role Selector */}
            <Col md={3}>
              <Form.Label htmlFor='roleSelector'>Vendedor</Form.Label>
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
            </Col>

            <Col md={3}>
              <Form.Label htmlFor='ticketStatus'>Estado del Tiquete</Form.Label>
              <Form.Select
                id='ticketStatus'
                className='form-control'
                onChange={(e) => {
                  const selectedValue = parseInt(e.target.value)
                  const updatedValue = isNaN(selectedValue) ? undefined : selectedValue
                  setTempFilters((prev) => ({...prev, ticketStatus: updatedValue}))
                }}
                value={tempFilters.ticketStatus ?? ''}
              >
                <option value=''>Todos</option>
                {Object.values(TicketStatusEnum)
                  .filter((value) => typeof value === 'number')
                  .map((value) => (
                    <option key={value} value={value}>
                      {stateToText(value)}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={12}>
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
            </Col>
          </Row>
        </div>
        <div style={{borderTop: '1px solid #ddd', margin: '20px 0'}}></div>
        <ConditionalRendering isTrue={isLoading}>
          <RenderLoader show={isLoading} huge={true} />
        </ConditionalRendering>
        {showSummaryCard && (
          <>
            <TicketSummaryCard
              totalTickets={ticketReportPaginated.ticketsCount}
              currencyCode={ticketReportPaginated.currencyCode}
              totalAmount={ticketReportPaginated.totalSales}
              totalCancelledTickets={ticketReportPaginated.ticketsCancelledCount}
              ticketsPendingCount={ticketReportPaginated.ticketsPendingCount}
              ticketsPendingPaymentCount={ticketReportPaginated.ticketsPendingPaymentCount}
              ticketsWinnerCount={ticketReportPaginated.ticketsWinnerCount}
              ticketLoserCount={ticketReportPaginated.ticketLoserCount}
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
                    <th className='text-center fs-4 text-white'>Vendedor</th>
                    <th className='text-center fs-4 text-white'>Moneda</th>
                    <th className='text-center fs-4 text-white'>Total</th>
                    <th className='text-center fs-4 text-white'>Estado</th>
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
                        <td className='text-center'>{currencyCode}</td>
                        <td className='text-center'>
                          {formatCurrency(ticket.ticketTotal, currencyCode)}
                        </td>
                        <td className={`text-center ${stateToColor(ticket.ticketStatus)}`}>
                          {stateToText(ticket.ticketStatus)}
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
                </tbody>
              </table>
            </div>
          </>
        )}
        {!isLoading &&
          ticketReportPaginated &&
          ticketReportPaginated.tickets &&
          ticketReportPaginated.tickets.length === 0 && (
            <tr>
              <td colSpan={7} className='text-center'>
                No hay resultados
              </td>
            </tr>
          )}
        {showPagination && (
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
      </Card.Body>
    </>
  )
}

export default TicketReportTable
