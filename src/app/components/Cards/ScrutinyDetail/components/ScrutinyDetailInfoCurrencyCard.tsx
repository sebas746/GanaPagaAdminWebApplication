import {Card} from 'react-bootstrap'
import {Scrutiny} from '../../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {CurrencyCode} from '../../../../../types/Currency.types'

interface ScrutinyDetailInfoCardProps {
  title?: string
  summaryDollar?: string
  summaryBolivar?: string
  isLoading: boolean
}

const ScrutinyDetailInfoCurrencyCard = ({
  title,
  summaryDollar,
  summaryBolivar,
  isLoading,
}: ScrutinyDetailInfoCardProps) => {
  return (
    <>
      <Card className='bg-success m-2 text-white'>
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
    </>
  )
}

export default ScrutinyDetailInfoCurrencyCard
