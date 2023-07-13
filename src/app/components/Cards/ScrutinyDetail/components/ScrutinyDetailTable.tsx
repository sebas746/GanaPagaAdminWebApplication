import {KTSVG} from '../../../../../_metronic/helpers'
import {Winner} from '../../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'

interface ScrutinyDetailTableProps {
  winners: Winner[]
}

const ScrutinyDetailTable = ({winners}: ScrutinyDetailTableProps) => {
  return (
    <>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th>ID Tiquete</th>
                <th>Valor Apostado</th>
                <th>Moneda</th>
                <th>Valor Ganado</th>
                <th>Pagado</th>
                <th>Vendedor</th>
                <th>Punto de venta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => (
                <tr className='fw-bold fs-6 text-gray-800'>
                  <td>{winner.ticketNumber}</td>
                  <td className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {formatCurrency(winner.betValue, winner.currencyCode)}
                  </td>
                  <td>{winner.currencyCode} </td>
                  <td className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {formatCurrency(winner.totalToPay, winner.currencyCode)}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        winner.isPaid ? 'badge-light-success' : 'badge-light-warning'
                      } fs-7 fw-semibold`}
                    >
                      {winner.isPaid ? 'SI' : 'NO'}
                    </span>
                  </td>
                  <td>{'vendedor'}</td>
                  <td>{'punto de venta'}</td>
                  <td className='text-end'>
                    <button className='btn btn-bg-light btn-color-muted btn-active-color-success btn-sm px-4 me-2'>
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
