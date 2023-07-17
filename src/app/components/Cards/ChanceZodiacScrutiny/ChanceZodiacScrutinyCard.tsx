import React from 'react'
import {Card} from 'react-bootstrap'
import {
  IRaffleResultChanceZodiacDetail,
  ChanceZodiacRaffleScrutinyStatus,
  ChanceZodiacRaffleResultStatus,
} from '../../../../types/ChanceZodiac.types'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useScrutinyChanceZodiac} from './ChanceZodiacScrutinyCard.hook'
import ConditionalRendering from '../../../helpers/ConditionalRedering'

interface ChanceZodiacScrutinyProps {
  addRaffleScrutinyChanceZodiac: () => void
  raffle: IRaffleResultChanceZodiacDetail
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyChanceZodiacDetail: () => void
}

const ChanceZodiacScrutinyCard = ({
  raffle,
  addRaffleScrutinyChanceZodiac,
  loadingAdd,
  raffleId,
  onClickScrutinyChanceZodiacDetail,
}: ChanceZodiacScrutinyProps) => {
  const {colorState, colorTextState, textState, buttonText} = useScrutinyChanceZodiac({
    chanceZodiacRaffleScrutinyStatus: raffle.chanceZodiacRaffleScrutinyStatus,
  })

  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div
            className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
          >
            <h5 className={colorTextState}>{raffle.chanceZodiacRaffleName}</h5>
            <h5 className='d-flex align-items-center'>
              <div className={`me-2 ${colorTextState}`}>Estado:</div>
              <div className={colorTextState}>{textState}</div>
            </h5>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          <span className='fw-bold'>Fecha sorteo:</span> {raffle.chanceZodiacRaffleDrawTime}
        </p>
        <div className='d-flex align-items-center'>
          <div className='fw-bold me-4 flex-grow-1'>
            <ConditionalRendering isTrue={!!raffle.chanceZodiacRaffleResultValue}>
              <span>
                {raffle.chanceZodiacRaffleResultValue}-{raffle.chanceZodiacStarSignName}
              </span>
            </ConditionalRendering>
          </div>
          <ConditionalRedering
            isTrue={
              raffle.chanceZodiacRaffleScrutinyStatus ===
                ChanceZodiacRaffleScrutinyStatus.PendingResultApprove &&
              raffle.chanceZodiacRaffleStatus === ChanceZodiacRaffleResultStatus.Approved
            }
          >
            <button
              className='btn btn-primary'
              onClick={addRaffleScrutinyChanceZodiac}
              disabled={loadingAdd}
            >
              {buttonText}
              {loadingAdd && (
                <RenderLoader show={loadingAdd && raffle.chanceZodiacRaffleId === raffleId} />
              )}
            </button>
          </ConditionalRedering>
          <ConditionalRedering
            isTrue={
              raffle.chanceZodiacRaffleScrutinyStatus ===
              ChanceZodiacRaffleScrutinyStatus.Scrutinized
            }
          >
            <button className='btn btn-primary' onClick={onClickScrutinyChanceZodiacDetail}>
              {buttonText}
            </button>
          </ConditionalRedering>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ChanceZodiacScrutinyCard
