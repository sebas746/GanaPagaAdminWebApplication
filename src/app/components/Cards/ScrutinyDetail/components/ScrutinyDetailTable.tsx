import {KTSVG} from '../../../../../_metronic/helpers'
import {Winner} from '../../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {useTicketDetail} from '../../../Modals/TicketDetail/TicketDetail.hook'
import RenderLoader from '../../../RenderLoader/RenderLoader'

interface ScrutinyDetailTableProps {
  winners: Winner[]
}

const ScrutinyDetailTable = ({winners}: ScrutinyDetailTableProps) => {
  const {setTicketId, isTicketDetailLoading, ticketDetailState} = useTicketDetail()

  return (
    <>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 gy-6'>
            <thead>
              <tr className='fw-bold text-light bg-success'>
                <th className='text-center'>ID Tiquete</th>
                <th className='text-center'>Valor Apostado</th>
                <th className='text-center'>Moneda</th>
                <th className='text-center'>Valor Ganado</th>
                <th className='text-center'>Pagado</th>
                <th className='text-center'>Vendedor</th>
                <th className='text-center'>Punto de venta</th>
                <th className='text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => (
                <tr className='fw-bold fs-6 text-gray-800' key={winner.betId}>
                  <td className='text-center'>{winner.ticketNumber}</td>
                  <td className='text-center text-dark fw-bold text-hover-primary'>
                    {formatCurrency(winner.betValue, winner.currencyCode)}
                  </td>
                  <td className='text-center'>{winner.currencyCode}</td>
                  <td className='text-center text-dark fw-bold text-hover-primary'>
                    {formatCurrency(winner.totalToPay, winner.currencyCode)}
                  </td>
                  <td className='text-center'>
                    <span
                      className={`badge ${
                        winner.isPaid ? 'badge-light-success' : 'badge-light-warning'
                      } fs-7 fw-semibold`}
                    >
                      {winner.isPaid ? 'SI' : 'NO'}
                    </span>
                  </td>
                  <td className='text-center'>{'vendedor'}</td>
                  <td className='text-center'>{'punto de venta'}</td>
                  <td className='text-center'>
                    <div
                      onClick={() => setTicketId(winner.ticketNumber)}
                      style={{
                        cursor:
                          isTicketDetailLoading &&
                          winner.ticketNumber === ticketDetailState.ticketId
                            ? 'not-allowed'
                            : 'pointer',
                      }}
                    >
                      {isTicketDetailLoading ? (
                        <RenderLoader
                          key={winner.ticketNumber}
                          show={
                            isTicketDetailLoading &&
                            winner.ticketNumber === ticketDetailState.ticketId
                          }
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
      </div>
    </>
  )
}

export default ScrutinyDetailTable
