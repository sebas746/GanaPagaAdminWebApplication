import {Card} from 'react-bootstrap'
import {IScrutinyDetailResponse, Winner} from '../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../helpers/currency.helpers'
import ScrutinyDetailInfoCard from './components/ScrutinyDetailInfoCurrencyCard'
import ScrutinyDetailTable from './components/ScrutinyDetailTable'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import {CurrencyCode} from '../../../../types/Currency.types'
import ScrutinyDetailInfoCurrencyCard from './components/ScrutinyDetailInfoCurrencyCard'
import {useNavigate} from 'react-router-dom'

interface ScrutinyDetailCardProps {
  scrutinyDetail: IScrutinyDetailResponse
  isLoading: boolean
}

const ScrutinyDetailCard = ({scrutinyDetail, isLoading}: ScrutinyDetailCardProps) => {
  const navigate = useNavigate()

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
      <div className='btn-toolbar justify-content-between mb-4'>
        <button onClick={() => navigate(0)} className='btn btn-primary'>
          Regresar
        </button>
        <button className='btn btn-primary'>Exportar</button>
      </div>
      {!isLoading && scrutinyDetail && (
        <div className='d-flex flex-column justify-content-between align-items-start bg-light p-3 rounded shadow-sm'>
          <h4 className='mb-2'>Lotería: {scrutinyDetail.raffleName}</h4>
          <h4 className='mb-2'>Sorteo: {raffleDate}</h4>
          <h4>
            Resultado:{' '}
            {(scrutinyDetail.raffleResultName && scrutinyDetail.raffleResultName) ||
              scrutinyDetail.raffleResult}
          </h4>
        </div>
      )}
      {!isLoading && scrutinyDetail && (
        <ScrutinyDetailInfoCurrencyCard
          key={`scrutiny-sales-detail-info-card${scrutinyDetail.raffleId}${scrutinyDetail.totalSalesDollar}`}
          title={'Total vendido en'}
          summaryDollar={formatCurrency(scrutinyDetail.totalSalesDollar, CurrencyCode.USD)}
          summaryBolivar={formatCurrency(scrutinyDetail.totalSalesBolivar, CurrencyCode.VES)}
          isLoading={isLoading}
        />
      )}
      {!isLoading && scrutinyDetail && scrutinyDetail.scrutinies && (
        <ScrutinyDetailInfoCurrencyCard
          key={`scrutiny-sales-detail-info-card${scrutinyDetail.raffleId}-winners`}
          title={'Total ganadores en'}
          summaryDollar={totalWinnersDollar.toString()}
          summaryBolivar={totalWinnersBolivar.toString()}
          isLoading={isLoading}
        />
      )}
      {!isLoading && scrutinyDetail && scrutinyDetail.scrutinies && (
        <ScrutinyDetailInfoCurrencyCard
          key={`scrutiny-total-to-pay-detail-info-card${scrutinyDetail.raffleId}`}
          title={'Pago total premios en'}
          summaryDollar={formatCurrency(scrutinyDetail.totalToPayDollar, CurrencyCode.USD)}
          summaryBolivar={formatCurrency(scrutinyDetail.totalToPayBolivar, CurrencyCode.VES)}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default ScrutinyDetailCard
