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
      <Card className='bg-success m-2'>
        <Card.Body>
          <div>
            <div className='d-flex justify-content-start align-items-start column-gap-4 h4'>
              <div className='p-2'>
                {title} {CurrencyCode.USD}:
              </div>{' '}
              <div className='p-2'>{summaryDollar}</div>
            </div>
            <div className='d-flex justify-content-start align-items-start column-gap-4 h4'>
              <div className='p-2'>
                {title} {CurrencyCode.VES}:
              </div>{' '}
              <div className='p-2'>{summaryBolivar}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default ScrutinyDetailInfoCurrencyCard
