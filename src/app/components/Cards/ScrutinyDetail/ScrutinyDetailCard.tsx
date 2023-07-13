import {Card} from 'react-bootstrap'
import {IScrutinyDetailResponse, Winner} from '../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../helpers/currency.helpers'
import ScrutinyDetailInfoCard from './components/ScrutinyDetailInfoCard'
import ScrutinyDetailTable from './components/ScrutinyDetailTable'
import ConditionalRendering from '../../../helpers/ConditionalRedering'

interface ScrutinyDetailCardProps {
  scrutinyDetail: IScrutinyDetailResponse
  isLoading: boolean
}

const ScrutinyDetailCard = ({scrutinyDetail, isLoading}: ScrutinyDetailCardProps) => {
  return (
    <>
      <div className={`d-flex flex-column justify-content-between align-items-start flex-grow-1`}>
        <h4 className='d-flex'>Lotería: {scrutinyDetail.raffleName}</h4>
        <h4 className='d-flex'>Sorteo: {scrutinyDetail.raffleResultName}</h4>
        <h4 className='d-flex'>Animalito Ganador: {scrutinyDetail.raffleResultName}</h4>
      </div>

      <Card className='bg-success m-2'>
        <Card.Body>
          {!isLoading &&
            scrutinyDetail.scrutinies &&
            scrutinyDetail.scrutinies.map((scrutiny, index) => (
              <ScrutinyDetailInfoCard
                key={`scrutiny-sales-detail-info-card${scrutiny.currencyName}${index}`}
                title={'Total vendido en'}
                currencyCode={scrutiny.currencyCode}
                summary={formatCurrency(scrutiny.totalSales, scrutiny.currencyCode)}
                isLoading={isLoading}
              />
            ))}
        </Card.Body>
      </Card>
      <Card className='bg-success m-2'>
        <Card.Body>
          {!isLoading &&
            scrutinyDetail.scrutinies &&
            scrutinyDetail.scrutinies.map((scrutiny, index) => (
              <ScrutinyDetailInfoCard
                key={`scrutiny-total-winners-detail-info-card${scrutiny.currencyName}${index}`}
                title={'Total ganadores en'}
                currencyCode={scrutiny.currencyCode}
                summary={scrutiny.totalWinners.toString()}
                isLoading={isLoading}
              />
            ))}
        </Card.Body>
      </Card>
      <Card className='bg-success m-2'>
        <Card.Body>
          {!isLoading &&
            scrutinyDetail.scrutinies &&
            scrutinyDetail.scrutinies.map((scrutiny, index) => (
              <ScrutinyDetailInfoCard
                key={`scrutiny-total-pay-detail-info-card${scrutiny.currencyName}${index}`}
                title={'Pago total premios en'}
                currencyCode={scrutiny.currencyCode}
                summary={formatCurrency(scrutiny.totalToPay, scrutiny.currencyCode)}
                isLoading={isLoading}
              />
            ))}
        </Card.Body>
      </Card>
    </>
  )
}

export default ScrutinyDetailCard
