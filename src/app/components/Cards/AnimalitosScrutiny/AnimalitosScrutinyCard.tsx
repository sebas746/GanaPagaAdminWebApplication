import React from 'react'
import {Card} from 'react-bootstrap'
import {useScrutinyAnimalitos} from './AnimalitosScrutinyCard.hook'
import {
  IRaffleResultAnimalitosDetail,
  RaffleResulStatus,
  RaffleScrutinyStatus,
} from '../../../../types/Animalitos.types'
import ConditionalRedering from '../../../helpers/ConditionalRedering'

interface AnimalitosScrutinyProps {
  addRaffleScrutinyAnimalitos: () => void
  raffle: IRaffleResultAnimalitosDetail
}

const AnimalitosScrutinyCard = ({raffle, addRaffleScrutinyAnimalitos}: AnimalitosScrutinyProps) => {
  const {colorState, colorTextState, textState, buttonText} = useScrutinyAnimalitos({
    animalitosRaffleScrutinyStatus: raffle.animalitosRaffleScrutinyStatus,
  })
  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div
            className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
          >
            <h5 className={colorTextState}>{raffle.animalitosRaffleName}</h5>
            <h5 className='d-flex align-items-center'>
              <div className={`me-2 ${colorTextState}`}>Estado:</div>
              <div className={colorTextState}>{textState}</div>
            </h5>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          <span className='fw-bold'>Fecha sorteo:</span> {raffle.animalitosRaffleDrawTime}
        </p>
        <div className='d-flex align-items-center'>
          <div className='fw-bold me-4 flex-grow-1'>
            Resultado: {raffle.animalitosRaffleResultValue}
          </div>
          <ConditionalRedering
            isTrue={
              raffle.animalitosRaffleScrutinyStatus === RaffleScrutinyStatus.PendingResultApprove &&
              raffle.animalitosRaffleStatus === RaffleResulStatus.Approved
            }
          >
            <button className='btn btn-primary' onClick={addRaffleScrutinyAnimalitos}>
              {buttonText}
            </button>
          </ConditionalRedering>
        </div>
      </Card.Body>
    </Card>
  )
}

export default AnimalitosScrutinyCard
