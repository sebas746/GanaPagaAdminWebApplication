import React from 'react'
import {Card} from 'react-bootstrap'
import {useRaffleResultCard} from './RaffleResultCard.hook'
import {IAnimalDetail, IRaffleResultAnimalitosDetail} from '../../../../types/Animalitos.types'
import Button from 'react-bootstrap/Button'
import AddRaffleAnimalitoResultForm from '../../Forms/AddRaffleAnimalitoResultForm/AddRaffleAnimalitoResultForm'
import ConditionalRendering from '../../../helpers/ConditionalRedering'

interface RaffleResultCardProps {
  raffle: IRaffleResultAnimalitosDetail
  animalOptions: IAnimalDetail[]
  addRaffleAnimalitosResult: (selectedAnimal: string) => void
}

const RaffleResultCard = ({
  raffle,
  addRaffleAnimalitosResult,
  animalOptions,
}: RaffleResultCardProps) => {
  const {colorState, colorTextState, textState, showRaffleResultForm, setRaffleResultForm} =
    useRaffleResultCard({
      animalitosRaffleStatus: raffle.animalitosRaffleStatus,
    })

  const addRaffleAnimalitosResultWrapper = (selectedAnimal: string) => {
    addRaffleAnimalitosResult(selectedAnimal)
    setRaffleResultForm()
  }

  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}>
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
          <div className='fw-bold me-4'>Resultado: </div>
          <ConditionalRendering isTrue={showRaffleResultForm}>
            <AddRaffleAnimalitoResultForm
              options={animalOptions}
              selectedOption={raffle.animalitosRaffleResultValue ?? '1'}
              addRaffleAnimalitosResult={addRaffleAnimalitosResultWrapper}
              setRaffleResultForm={setRaffleResultForm}
            />
          </ConditionalRendering>
        </div>
        <ConditionalRendering isTrue={!showRaffleResultForm}>
          <div className='d-flex justify-content-end align-items-center'>
            <Button variant='primary' onClick={setRaffleResultForm}>
              Ingresar Resultado
            </Button>
          </div>
        </ConditionalRendering>
      </Card.Body>
    </Card>
  )
}

export default RaffleResultCard
