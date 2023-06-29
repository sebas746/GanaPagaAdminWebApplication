import React from 'react'
import {Card} from 'react-bootstrap'
import {IRaffleResultChance3DigitsDetail} from '../../../../types/Chance3Digits.types'
import Button from 'react-bootstrap/Button'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import AddRaffleChance3DigitsResultForm from '../../Forms/AddRaffleChance3DigitsResultForm/AddRaffleChance3DigitsResultForm'
import {useChance3DigitsRaffleResultCard} from './Chance3DigitsRaffleResultCard.hook'

interface Chance3DigitsRaffleResultCardProps {
  raffle: IRaffleResultChance3DigitsDetail
  addRaffleChance3DigitsResult: (resultValue: string) => void
  isLoadingState: boolean
  createdBy: string
  maxDigitsByBet: number
}

const Chance3DigitsRaffleResultCard = ({
  raffle,
  addRaffleChance3DigitsResult,
  isLoadingState,
  createdBy,
  maxDigitsByBet,
}: Chance3DigitsRaffleResultCardProps) => {
  const {
    colorState,
    colorTextState,
    textState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  } = useChance3DigitsRaffleResultCard({
    chanceThreeRaffleStatus: raffle.chanceThreeRaffleStatus,
  })

  const addRaffleChance3DigitsResultWrapper = (resultValue: string) => {
    addRaffleChance3DigitsResult(resultValue)
    // setRaffleResultForm()
  }

  const wrappedGetSubmitButtonText = (resultValue: string | undefined) => {
    return getSubmitButtonText(raffle, resultValue)
  }

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
          <div className='fw-bold me-4'>Resultado: </div>
          <ConditionalRendering isTrue={!showRaffleResultForm}>
            <span>{raffle.chanceThreeRaffleResultValue}</span>
          </ConditionalRendering>
          <ConditionalRendering isTrue={showRaffleResultForm}>
            <AddRaffleChance3DigitsResultForm
              selectedOption={raffle.chanceThreeRaffleResultValue ?? ''}
              addRaffleChance3DigitsResult={addRaffleChance3DigitsResultWrapper}
              setRaffleResultForm={setRaffleResultForm}
              wrappedGetSubmitButtonText={wrappedGetSubmitButtonText}
              isLoadingState={isLoadingState}
              maxDigitsByBet={maxDigitsByBet}
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
                disabled={createdBy === raffle.chanceThreeRaffleResultCreatedBy}
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
