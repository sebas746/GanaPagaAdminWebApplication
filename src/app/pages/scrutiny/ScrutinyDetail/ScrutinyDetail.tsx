import {Card} from 'react-bootstrap'
import {useScrutinyDetail} from './ScrutinyDetail.hook'
import ScrutinyDetailCard from '../../../components/Cards/ScrutinyDetail/ScrutinyDetailCard'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import ScrutinyDetailTable from '../../../components/Cards/ScrutinyDetail/components/ScrutinyDetailTable'
import {Winner} from '../../../../types/ScrutinyDetail.types'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'

const ScrutinyDetail = () => {
  const {scrutinyDetailState, isLoading} = useScrutinyDetail()
  var winners: Winner[] = []
  if (!isLoading && scrutinyDetailState.scrutinyDetail.scrutinies) {
    winners = scrutinyDetailState.scrutinyDetail.scrutinies.flatMap(
      (scrutiny) => scrutiny.winners ?? []
    )
  }

  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='col-sm-12 col-md-4' key={`card-raffle-${scrutinyDetailState.raffleId}`}>
          <ConditionalRendering isTrue={!isLoading}>
            <ScrutinyDetailCard
              scrutinyDetail={scrutinyDetailState.scrutinyDetail}
              isLoading={isLoading}
            />
          </ConditionalRendering>
        </div>
      </div>
      <div className='mb-10'>
        <div className='col-sm-12 col-md-12' key={`card-raffle-${scrutinyDetailState.raffleId}`}>
          <ConditionalRendering isTrue={winners.length > 0}>
            <ScrutinyDetailTable winners={winners} />
          </ConditionalRendering>
        </div>
      </div>
      {isLoading && <RenderLoader show={true} huge={true} />}
    </div>
  )
}
export default ScrutinyDetail
