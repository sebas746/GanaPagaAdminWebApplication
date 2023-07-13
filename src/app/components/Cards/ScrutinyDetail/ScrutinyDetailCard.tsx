import {Card} from 'react-bootstrap'
import {IScrutinyDetailResponse} from '../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../helpers/currency.helpers'

interface ScrutinyDetailCardProps {
  scrutinyDetail: IScrutinyDetailResponse
  isLoading: boolean
}

const ScrutinyDetailCard = ({scrutinyDetail, isLoading}: ScrutinyDetailCardProps) => {
  const scrutinyDollar = scrutinyDetail.scrutinies.filter((e) => e.currencyCode === 'USD')
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
            scrutinyDetail.scrutinies.map((scrutiny) => (
              <>
                <div>
                  <div className='d-flex justify-content-around align-items-center h4'>
                    <div className='p-2'>Total vendido en {scrutiny.currencyCode}:</div>{' '}
                    <div className='p-2'>
                      {formatCurrency(scrutiny.totalSales, scrutiny.currencyCode)}
                    </div>
                  </div>
                </div>
              </>
            ))}
        </Card.Body>
      </Card>
      <Card className='bg-success m-2'>
        <Card.Body>
          {!isLoading &&
            scrutinyDetail.scrutinies &&
            scrutinyDetail.scrutinies.map((scrutiny) => (
              <>
                <div>
                  <div className='d-flex justify-content-around align-items-center h4'>
                    <div className='p-2'>Total ganadores en {scrutiny.currencyCode}:</div>{' '}
                    <div className='p-2'>{scrutiny.totalWinners}</div>
                  </div>
                </div>
              </>
            ))}
        </Card.Body>
      </Card>
      <Card className='bg-success m-2'>
        <Card.Body>
          {!isLoading &&
            scrutinyDetail.scrutinies &&
            scrutinyDetail.scrutinies.map((scrutiny) => (
              <>
                <div>
                  <div className='d-flex justify-content-around align-items-center h4'>
                    <div className='p-2'>Pago total en premios en {scrutiny.currencyCode}:</div>{' '}
                    <div className='p-2'>
                      {formatCurrency(scrutiny.totalToPay, scrutiny.currencyCode)}
                    </div>
                  </div>
                </div>
              </>
            ))}
        </Card.Body>
      </Card>
    </>
  )
}

export default ScrutinyDetailCard
