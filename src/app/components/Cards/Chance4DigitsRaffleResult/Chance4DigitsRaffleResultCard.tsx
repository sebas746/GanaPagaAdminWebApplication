import React from 'react'
import {Card} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import {useChance4DigitsRaffleResultCard} from './Chance4DigitsRaffleResultCard.hook'
import {IRaffleResultChance4DigitsDetail} from '../../../../types/Chance4Digits.types'
import AddRafflechance4DigitsResultForm from '../../Forms/AddRaffleChance4DigitsResultForm/AddRaffleChance4DigitsResultForm'

interface Chance4DigitsRaffleResultCardProps {
  raffle: IRaffleResultChance4DigitsDetail
  addRaffleChance4DigitsResult: (resultValue: string) => void
  isLoadingState: boolean
  createdBy: string
}

const Chance4DigitsRaffleResultCard = ({
  raffle,
  addRaffleChance4DigitsResult,
  isLoadingState,
  createdBy,
}: Chance4DigitsRaffleResultCardProps) => {
  const {
    colorState,
    colorTextState,
    textState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  } = useChance4DigitsRaffleResultCard({
    chanceFourRaffleStatus: raffle.chanceFourRaffleStatus,
  })

  const addRaffleChance4DigitsResultWrapper = (resultValue: string) => {
    addRaffleChance4DigitsResult(resultValue)
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
          <div className='fw-bold me-4'>Resultado: </div>
          <ConditionalRendering isTrue={!showRaffleResultForm}>
            <span>{raffle.chanceFourRaffleResultValue}</span>
          </ConditionalRendering>
          <ConditionalRendering isTrue={showRaffleResultForm}>
            <AddRafflechance4DigitsResultForm
              selectedOption={raffle.chanceFourRaffleResultValue ?? ''}
              addRafflechance4DigitsResult={addRaffleChance4DigitsResultWrapper}
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
                disabled={createdBy === raffle.chanceFourRaffleResultCreatedBy}
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

export default Chance4DigitsRaffleResultCard
