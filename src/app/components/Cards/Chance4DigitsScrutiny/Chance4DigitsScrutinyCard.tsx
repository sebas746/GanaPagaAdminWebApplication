import React from 'react'
import {Card} from 'react-bootstrap'
import {useScrutinyChance4Digits} from './Chance4DigitsScrutinyCard.hook'
import {
  IRaffleResultChance4DigitsDetail,
  Chance4DigitsRaffleScrutinyStatus,
  Chance4DigitsRaffleResultStatus,
} from '../../../../types/Chance4Digits.types'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import RenderLoader from '../../RenderLoader/RenderLoader'

interface Chance4DigitsScrutinyProps {
  addRaffleScrutinyChance4Digits: () => void
  raffle: IRaffleResultChance4DigitsDetail
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyChance4DigitsDetail: () => void
}

const Chance4DigitsScrutinyCard = ({
  raffle,
  addRaffleScrutinyChance4Digits,
  loadingAdd,
  raffleId,
  onClickScrutinyChance4DigitsDetail,
}: Chance4DigitsScrutinyProps) => {
  const {colorState, colorTextState, textState, buttonText} = useScrutinyChance4Digits({
    chanceFourRaffleScrutinyStatus: raffle.chanceFourRaffleScrutinyStatus,
  })
  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div
            className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
          >
            <h5 className={colorTextState}>{raffle.chanceFourRaffleName}</h5>
            <h5 className='d-flex align-items-center'>
              <div className={`me-2 ${colorTextState}`}>Estado:</div>
              <div className={colorTextState}>{textState}</div>
            </h5>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          <span className='fw-bold'>Fecha sorteo:</span> {raffle.chanceFourRaffleDrawTime}
        </p>
        <div className='d-flex align-items-center'>
          <div className='fw-bold me-4 flex-grow-1'>
            Resultado: {raffle.chanceFourRaffleResultValue}
          </div>
          <ConditionalRedering
            isTrue={
              raffle.chanceFourRaffleScrutinyStatus ===
                Chance4DigitsRaffleScrutinyStatus.PendingResultApprove &&
              raffle.chanceFourRaffleStatus === Chance4DigitsRaffleResultStatus.Approved
            }
          >
            <button
              className='btn btn-primary'
              onClick={addRaffleScrutinyChance4Digits}
              disabled={loadingAdd}
            >
              {buttonText}
              {loadingAdd && (
                <RenderLoader show={loadingAdd && raffle.chanceFourRaffleId === raffleId} />
              )}
            </button>
          </ConditionalRedering>
          <ConditionalRedering
            isTrue={
              raffle.chanceFourRaffleScrutinyStatus ===
              Chance4DigitsRaffleScrutinyStatus.Scrutinized
            }
          >
            <button className='btn btn-primary' onClick={onClickScrutinyChance4DigitsDetail}>
              {buttonText}
            </button>
          </ConditionalRedering>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Chance4DigitsScrutinyCard
