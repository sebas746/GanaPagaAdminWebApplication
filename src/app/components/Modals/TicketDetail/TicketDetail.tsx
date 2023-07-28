import {useEffect, useRef} from 'react'
import {useTicketDetail} from './TicketDetail.hook'
import {Modal} from 'bootstrap'
import {formatCurrency} from '../../../helpers/currency.helpers'
import {DateTime} from 'luxon'
import {usePdfCreator} from '../../DocumentRender/Pdf/PdfCreator.hook'

const TicketDetail = () => {
  const {
    ticketDetailState,
    setTicketModalShow,
    handleCloseTicketModal,
    refreshCount,
    isTicketDetailLoading,
  } = useTicketDetail()
  const {exportTicketPDF} = usePdfCreator()
  const modalRef = useRef<HTMLDivElement | null>(null) // correct way to create the ref

  useEffect(() => {
    if (modalRef.current) {
      const bsModal = new Modal(modalRef.current)
      modalRef.current.addEventListener('hidden.bs.modal', handleCloseTicketModal)
      if (ticketDetailState.ticketModalShow) {
        bsModal.show()
      } else {
        bsModal.hide()
      }
    }
  }, [ticketDetailState.ticketModalShow, refreshCount])

  const createdAt = ticketDetailState.ticketDetail.ticketCreatedAt
    ? new Date(ticketDetailState.ticketDetail.ticketCreatedAt).toISOString()
    : ''

  const dueDate = ticketDetailState.ticketDetail.ticketDueDate
    ? new Date(ticketDetailState.ticketDetail.ticketDueDate).toISOString().split('T')[0]
    : ''

  return (
    <>
      {!isTicketDetailLoading && ticketDetailState.ticketDetail.bets && (
        <div
          className='modal fade'
          id='ticketDetailModal'
          tabIndex={-1}
          aria-labelledby='ticketDetailModal'
          aria-hidden='true'
          ref={modalRef}
        >
          <div className='modal-dialog modal-dialog-scrollable'>
            <div
              className='modal-content'
              style={{borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}
            >
              <div className='modal-header' style={{backgroundColor: '#f8f9fa'}}>
                <h5 className='modal-title' id='exampleModalLabel' style={{fontWeight: '600'}}>
                  Detalle del tiquete # {ticketDetailState.ticketDetail.ticketId}
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body' style={{fontSize: '15px', color: '#333'}}>
                <h4 style={{fontWeight: '600', marginBottom: '15px'}}>
                  {ticketDetailState.ticketDetail.ticketCompanyName}
                </h4>
                <p>
                  Fecha:{' '}
                  {DateTime.fromISO(ticketDetailState.ticketDetail.ticketCreatedAt).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}
                </p>
                <p>Código: {ticketDetailState.ticketDetail.ticketNumber}</p>
                <p>Valido hasta: {dueDate}</p>
                <p>Moneda: {ticketDetailState.ticketDetail.currencyCode}</p>
                <p>
                  Total:{' '}
                  {formatCurrency(
                    ticketDetailState.ticketDetail.ticketTotal,
                    ticketDetailState.ticketDetail.currencyCode
                  )}
                </p>
                <div>
                  <h4>Resumen Apuestas</h4>
                  {ticketDetailState.ticketDetail.bets.map((bet, index) => (
                    <div key={index}>
                      <h6 style={{fontWeight: '600', marginTop: '15px'}}>
                        {bet.lotteryName} - {bet.raffleName}
                      </h6>
                      <ul>
                        {bet.betDetail.map((detail, index) => (
                          <li key={index}>
                            {detail.betValue},{' '}
                            {formatCurrency(
                              detail.betTotal,
                              ticketDetailState.ticketDetail.currencyCode
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className='modal-footer' style={{backgroundColor: '#f8f9fa'}}>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => exportTicketPDF(ticketDetailState.ticketDetail)}
                  style={{fontWeight: '600'}}
                >
                  Exportar
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={() => setTicketModalShow(false)}
                  style={{fontWeight: '600'}}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TicketDetail
