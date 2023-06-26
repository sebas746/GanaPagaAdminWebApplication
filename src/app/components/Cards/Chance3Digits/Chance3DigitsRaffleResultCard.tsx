import React from 'react'
import {Card} from 'react-bootstrap'
import {useRaffleResultCard} from './Chance3DigitsRaffleResultCard.hook'
import {
  IAnimalDetail,
  IRaffleResultChance3DigitsDetail,
} from '../../../../types/Chance3Digits.types'
import Button from 'react-bootstrap/Button'
import AddRaffleAnimalitoResultForm from '../../Forms/AddRaffleAnimalitoResultForm/AddRaffleAnimalitoResultForm'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import AddRaffleChance3DigitsResultForm from '../../Forms/AddRaffleChance3DigitsResultForm/AddRaffleChance3ResultForm'

interface RaffleResultCardProps {
  raffle: IRaffleResultChance3DigitsDetail
  animalOptions: IAnimalDetail[]
  addRaffleChance3DigitsResult: (selectedAnimal: string) => void
  isLoadingState: boolean
  createdBy: string
}

const Chance3DigitsRaffleResultCard = ({
  raffle,
  addRaffleChance3DigitsResult,
  animalOptions,
  isLoadingState,
  createdBy,
}: RaffleResultCardProps) => {
  const {
    colorState,
    colorTextState,
    textState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  } = useRaffleResultCard({
    Chance3DigitsRaffleStatus: raffle.Chance3DigitsRaffleStatus,
  })

  const addRaffleChance3DigitsResultWrapper = (selectedAnimal: string) => {
    addRaffleChance3DigitsResult(selectedAnimal)
    // setRaffleResultForm()
  }

  const wrappedGetSubmitButtonText = (selectedAnimal: string | undefined) => {
    return getSubmitButtonText(raffle, selectedAnimal)
  }

  return (
    <Card>
      <Card.Header className={`p-2 rounded-2 ${colorState}`}>
        <Card.Title className={`w-100 ${colorTextState}`}>
          <div
            className={`d-flex justify-content-between align-items-center flex-grow-1 column-gap-4`}
          >
            <h5 className={colorTextState}>{raffle.Chance3DigitsRaffleName}</h5>
            <h5 className='d-flex align-items-center'>
              <div className={`me-2 ${colorTextState}`}>Estado:</div>
              <div className={colorTextState}>{textState}</div>
            </h5>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>
          <span className='fw-bold'>Fecha sorteo:</span> {raffle.Chance3DigitsRaffleDrawTime}
        </p>
        <div className='d-flex align-items-center'>
          <div className='fw-bold me-4'>Resultado: </div>
          <ConditionalRendering isTrue={!showRaffleResultForm}>
            <span>
              {
                animalOptions.find(
                  (ap) => ap.animalId.toString() === raffle.Chance3DigitsRaffleResultValue
                )?.animalName
              }{' '}
            </span>
          </ConditionalRendering>
          <ConditionalRendering isTrue={showRaffleResultForm}>
            <AddRaffleChance3DigitsResultForm
              options={animalOptions}
              selectedOption={raffle.Chance3DigitsRaffleResultValue ?? ''}
              addRaffleChance3DigitsResult={addRaffleChance3DigitsResultWrapper}
              setRaffleResultForm={setRaffleResultForm}
              wrappedGetSubmitButtonText={wrappedGetSubmitButtonText}
              isLoadingState={isLoadingState}
            />
          </ConditionalRendering>
        </div>
        <ConditionalRendering isTrue={!showRaffleResultForm}>
          <div className='d-flex justify-content-end align-items-center'>
            {!!buttonText && (
              <Button
                className='m-1'
                variant='primary'
                onClick={setRaffleResultForm}
                disabled={createdBy === raffle.Chance3DigitsRaffleResultCreatedBy}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </ConditionalRendering>
      </Card.Body>
    </Card>
  )
}

export default Chance3DigitsRaffleResultCard
