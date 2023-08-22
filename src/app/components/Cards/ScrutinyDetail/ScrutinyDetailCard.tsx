import {IScrutinyDetailResponse} from '../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../helpers/currency.helpers'
import {CurrencyCode} from '../../../../types/Currency.types'
import ScrutinyDetailInfoCurrencyCard from './components/ScrutinyDetailInfoCurrencyCard'
import {useDownloadFiles} from '../../../hooks/downloadFiles.hook'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {Card} from 'react-bootstrap'
import BackLink from '../../BackLink/BackLink'

interface ScrutinyDetailCardProps {
  scrutinyDetail: IScrutinyDetailResponse
  isLoading: boolean
  gameType: string
}

const ScrutinyDetailCard = ({scrutinyDetail, isLoading, gameType}: ScrutinyDetailCardProps) => {
  const {isLoadingDownloadFile, handleDownloadFileClick} = useDownloadFiles()

  const totalWinnersDollar =
    scrutinyDetail.scrutinies?.find((scrutiny) => scrutiny.currencyCode === CurrencyCode.USD)
      ?.totalWinners ?? 0
  const totalWinnersBolivar =
    scrutinyDetail.scrutinies?.find((scrutiny) => scrutiny.currencyCode === CurrencyCode.VES)
      ?.totalWinners ?? 0
  const raffleDate = scrutinyDetail.raffleDrawTime
    ? new Date(scrutinyDetail.raffleDrawTime).toISOString().split('T')[0]
    : ''
  return (
    <>
      {' '}
      <div className='mb-3'>
        <BackLink />
      </div>
      <div className='row row-gap-12 pb-6'>
        {!isLoading && scrutinyDetail && (
          <div className='col-sm-12 col-md-6' key={`card-raffle-${scrutinyDetail.raffleId}`}>
            <Card>
              <Card.Header className={`p-2 rounded-2 bg-success`}>
                <Card.Title className={`w-100 text-white`}>
                  <div
                    className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
                  >
                    <h5 className={`text-white`}>Lotería: {scrutinyDetail.raffleName}</h5>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p>
                  <span className='fw-bold'>Fecha sorteo:</span> {raffleDate}
                </p>
                <div className='d-flex align-items-center'>
                  <div className='fw-bold me-4 flex-grow-1'>
                    Resultado:{' '}
                    {(scrutinyDetail.raffleResultName && scrutinyDetail.raffleResultName) ||
                      scrutinyDetail.raffleResult}
                  </div>
                  <div className='dropdown'>
                    <button
                      className='btn btn-primary dropdown-toggle'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                      disabled={isLoadingDownloadFile}
                    >
                      <RenderLoader show={isLoadingDownloadFile} />
                      Exportar
                    </button>

                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                      <li>
                        <button
                          className='dropdown-item'
                          onClick={() =>
                            handleDownloadFileClick(scrutinyDetail.raffleId, gameType, 'Csv')
                          }
                        >
                          CSV
                        </button>
                      </li>
                      <li>
                        <button
                          className='dropdown-item'
                          onClick={() =>
                            handleDownloadFileClick(scrutinyDetail.raffleId, gameType, 'Pdf')
                          }
                        >
                          PDF
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <div className='row row-gap-8'>
        {!isLoading && scrutinyDetail && (
          <ScrutinyDetailInfoCurrencyCard
            header='Total vendido por moneda'
            key={`scrutiny-sales-detail-info-card${scrutinyDetail.raffleId}${scrutinyDetail.totalSalesDollar}`}
            title={'Total vendido en'}
            summaryDollar={formatCurrency(scrutinyDetail.totalSalesDollar, CurrencyCode.USD)}
            summaryBolivar={formatCurrency(scrutinyDetail.totalSalesBolivar, CurrencyCode.VES)}
            isLoading={isLoading}
          />
        )}
        {!isLoading && scrutinyDetail && scrutinyDetail.scrutinies && (
          <ScrutinyDetailInfoCurrencyCard
            header='Total ganadores por moneda'
            key={`scrutiny-sales-detail-info-card${scrutinyDetail.raffleId}-winners`}
            title={'Total ganadores en'}
            summaryDollar={totalWinnersDollar.toString()}
            summaryBolivar={totalWinnersBolivar.toString()}
            isLoading={isLoading}
          />
        )}
        {!isLoading && scrutinyDetail && scrutinyDetail.scrutinies && (
          <ScrutinyDetailInfoCurrencyCard
            header='Pago total en premios por moneda'
            key={`scrutiny-total-to-pay-detail-info-card${scrutinyDetail.raffleId}`}
            title={'Pago total premios en'}
            summaryDollar={formatCurrency(scrutinyDetail.totalToPayDollar, CurrencyCode.USD)}
            summaryBolivar={formatCurrency(scrutinyDetail.totalToPayBolivar, CurrencyCode.VES)}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  )
}

export default ScrutinyDetailCard
