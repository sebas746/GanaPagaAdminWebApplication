import React from 'react'
import {Card} from 'react-bootstrap'
import {useScrutinyChance3Digits} from './Chance3DigitsScrutinyCard.hook'
import {
  IRaffleResultChance3DigitsDetail,
  Chance3DigitsRaffleScrutinyStatus,
  Chance3DigitsRaffleResultStatus,
} from '../../../../types/Chance3Digits.types'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import RenderLoader from '../../RenderLoader/RenderLoader'

interface Chance3DigitsScrutinyProps {
  addRaffleScrutinyChance3Digits: () => void
  raffle: IRaffleResultChance3DigitsDetail
  loadingAdd: boolean
  raffleId: number
}

const Chance3DigitsScrutinyCard = ({
  raffle,
  addRaffleScrutinyChance3Digits,
  loadingAdd,
  raffleId,
}: Chance3DigitsScrutinyProps) => {
  const {colorState, colorTextState, textState, buttonText} = useScrutinyChance3Digits({
    chanceThreeRaffleScrutinyStatus: raffle.chanceThreeRaffleScrutinyStatus,
  })
  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div
            className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
          >
            <h5 className={colorTextState}>{raffle.chanceThreeRaffleName}</h5>
            <h5 className='d-flex align-items-center'>
              <div className={`me-2 ${colorTextState}`}>Estado:</div>
              <div className={colorTextState}>{textState}</div>
            </h5>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          <span className='fw-bold'>Fecha sorteo:</span> {raffle.chanceThreeRaffleDrawTime}
        </p>
        <div className='d-flex align-items-center'>
          <div className='fw-bold me-4 flex-grow-1'>
            Resultado: {raffle.chanceThreeRaffleResultValue}
          </div>
          <ConditionalRedering
            isTrue={
              (raffle.chanceThreeRaffleScrutinyStatus ===
                Chance3DigitsRaffleScrutinyStatus.PendingResultApprove &&
                raffle.chanceThreeRaffleStatus === Chance3DigitsRaffleResultStatus.Approved) ||
              raffle.chanceThreeRaffleScrutinyStatus ===
                Chance3DigitsRaffleScrutinyStatus.Scrutinized
            }
          >
            <button
              className='btn btn-primary'
              onClick={addRaffleScrutinyChance3Digits}
              disabled={loadingAdd}
            >
              {buttonText}
              {loadingAdd && (
                <RenderLoader show={loadingAdd && raffle.chanceThreeRaffleId === raffleId} />
              )}
            </button>
          </ConditionalRedering>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Chance3DigitsScrutinyCard
