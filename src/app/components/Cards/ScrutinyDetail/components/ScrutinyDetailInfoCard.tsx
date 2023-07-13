import {Card} from 'react-bootstrap'
import {Scrutiny} from '../../../../../types/ScrutinyDetail.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'

interface ScrutinyDetailInfoCardProps {
  title: string
  currencyCode: string
  summary: string
  isLoading: boolean
}

const ScrutinyDetailInfoCard = ({
  title,
  currencyCode,
  summary,
  isLoading,
}: ScrutinyDetailInfoCardProps) => {
  return (
    <>
      <div>
        <div className='d-flex justify-content-start align-items-start column-gap-4 h4'>
          <div className='p-2'>
            {title} {currencyCode}:
          </div>{' '}
          <div className='p-2'>{summary}</div>
        </div>
      </div>
    </>
  )
}

export default ScrutinyDetailInfoCard
