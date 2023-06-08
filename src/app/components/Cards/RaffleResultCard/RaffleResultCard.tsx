import React from 'react'
import {Card} from 'react-bootstrap'
import {useRaffleResultCard} from './RaffleResultCard.hook'

interface RaffleResultCardProps {
  state: 'no-played' | 'pending-result' | 'pending-approval' | 'approved'
}

const RaffleResultCard = ({state}: RaffleResultCardProps) => {
  const {colorState, colorTextState, textState} = useRaffleResultCard({
    state,
  })

  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div className={`d-flex justify-content-between align-items-center flex-grow-1`}>
            <h4 className={colorTextState}>Guaracho 8 am</h4>
            <h4 className='d-flex align-items-center'>
              <div className={`me-2 ${colorTextState}`}>Estado:</div>
              <div className={colorTextState}>{textState}</div>
            </h4>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          <span className='fw-bold'>Fecha sorteo:</span> 12/12/2021 3:00 pm
        </p>
        <p>
          <span className='fw-bold'>Resultado: </span>
        </p>
      </Card.Body>
    </Card>
  )
}

export default RaffleResultCard
