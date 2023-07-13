import {Card} from 'react-bootstrap'
import {useScrutinyDetail} from './ScrutinyDetail.hook'
import ScrutinyDetailCard from '../../../components/Cards/ScrutinyDetail/ScrutinyDetailCard'

const ScrutinyDetail = () => {
  const {scrutinyDetailState, isLoading} = useScrutinyDetail()
  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='col-sm-12 col-md-6' key={`card-raffle-${scrutinyDetailState.raffleId}`}>
          <ScrutinyDetailCard
            scrutinyDetail={scrutinyDetailState.scrutinyDetail}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
export default ScrutinyDetail
