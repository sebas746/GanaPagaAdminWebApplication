import {Card} from 'react-bootstrap'
import {Scrutiny} from '../../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {CurrencyCode} from '../../../../../types/Currency.types'

interface ScrutinyDetailInfoCardProps {
  header: string
  title?: string
  summaryDollar?: string
  summaryBolivar?: string
  isLoading: boolean
}

const ScrutinyDetailInfoCurrencyCard = ({
  header,
  title,
  summaryDollar,
  summaryBolivar,
  isLoading,
}: ScrutinyDetailInfoCardProps) => {
  return (
    <div className='col-sm-12 col-md-6' key={`card-raffle-info-${title}`}>
      <Card>
        <Card.Header className={`p-2 rounded-2 bg-success`}>
          <Card.Title className={`w-100 text-white`}>
            <div
              className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
            >
              <h5 className={`text-white`}>{header}</h5>
            </div>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div className='d-flex justify-content-between align-items-start column-gap-2'>
            <div className='p-2'>
              {title} {CurrencyCode.USD}:
            </div>{' '}
            <div className='p-2'>{summaryDollar}</div>
          </div>
          <div className='d-flex justify-content-between align-items-start column-gap-2'>
            <div className='p-2'>
              {title} {CurrencyCode.VES}:
            </div>{' '}
            <div className='p-2'>{summaryBolivar}</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ScrutinyDetailInfoCurrencyCard
