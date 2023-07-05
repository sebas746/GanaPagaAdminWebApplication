import React from 'react'
import {Card} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import AddRafflechance4DigitsResultForm from '../../Forms/AddRaffleChance4DigitsResultForm/AddRaffleChance4DigitsResultForm'
import {IRaffleResultChanceZodiacDetail} from '../../../../types/ChanceZodiac.types'
import {useChanceZodiacRaffleResultCard} from './ChanceZodiacRaffleResultCard.hook'
import AddRaffleChanceZodiacResultForm from '../../Forms/AddRaffleChanceZodiacResultForm/AddRaffleChanceZodiacResultForm'

interface ChanceZodiacRaffleResultCardProps {
  raffle: IRaffleResultChanceZodiacDetail
  addRaffleChanceZodiacResult: (resultValue: string) => void
  isLoadingState: boolean
  createdBy: string
}

const ChanceZodiacRaffleResultCard = ({
  raffle,
  addRaffleChanceZodiacResult,
  isLoadingState,
  createdBy,
}: ChanceZodiacRaffleResultCardProps) => {
  const {
    colorState,
    colorTextState,
    textState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  } = useChanceZodiacRaffleResultCard({
    chanceZodiacRaffleStatus: raffle.chanceZodiacRaffleStatus,
  })

  const addRaffleChanceZodiacResultWrapper = (resultValue: string) => {
    addRaffleChanceZodiacResult(resultValue)
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
          <div className='fw-bold me-4'>Resultado: </div>
          <ConditionalRendering isTrue={!showRaffleResultForm}>
            <span>{raffle.chanceZodiacRaffleResultValue}</span>
          </ConditionalRendering>
          <ConditionalRendering isTrue={showRaffleResultForm}>
            <AddRaffleChanceZodiacResultForm
              selectedOption={raffle.chanceZodiacRaffleResultValue ?? ''}
              addRaffleChanceZodiacResult={addRaffleChanceZodiacResultWrapper}
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
                disabled={createdBy === raffle.chanceZodiacRaffleResultCreatedBy}
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

export default ChanceZodiacRaffleResultCard
