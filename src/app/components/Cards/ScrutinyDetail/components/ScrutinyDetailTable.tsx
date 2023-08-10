import {KTSVG} from '../../../../../_metronic/helpers'
import {Winner} from '../../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {useTicketDetail} from '../../../Modals/TicketDetail/TicketDetail.hook'
import RenderLoader from '../../../RenderLoader/RenderLoader'

interface ScrutinyDetailTableProps {
  winners: Winner[]
}

const ScrutinyDetailTable = ({winners}: ScrutinyDetailTableProps) => {
  const {setTicketId, isTicketDetailLoading} = useTicketDetail()

  return (
    <>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-striped align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bold text-light bg-primary'>
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
                  <td className='text-center text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {formatCurrency(winner.betValue, winner.currencyCode)}
                  </td>
                  <td className='text-center'>{winner.currencyCode}</td>
                  <td className='text-center text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
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
                    <button
                      className='btn btn-bg-light btn-primary btn-active-color-success btn-sm px-4 me-2'
                      onClick={() => setTicketId(winner.ticketNumber)}
                      disabled={isTicketDetailLoading}
                    >
                      {<RenderLoader show={isTicketDetailLoading} />}
                      DETALLE
                    </button>
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
