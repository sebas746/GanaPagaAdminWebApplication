import React from 'react'
import {Card} from 'react-bootstrap'
import {useRaffleResultCard} from './AnimalitosRaffleResultCard.hook'
import {
  IAnimalDetail,
  IAnimalitosLotteries,
  IRaffleResultAnimalitosDetail,
} from '../../../../types/Animalitos.types'
import Button from 'react-bootstrap/Button'
import AddRaffleAnimalitoResultForm from '../../Forms/AddRaffleAnimalitoResultForm/AddRaffleAnimalitoResultForm'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import HasPermission from '../../HasPermissions/HasPermissions'

interface AnimalitosRaffleResultCardProps {
  raffle: IRaffleResultAnimalitosDetail
  animalOptions: IAnimalDetail[]
  addRaffleAnimalitosResult: (selectedAnimal: string) => void
  isLoadingState: boolean
  createdBy: string
  selectedLottery: IAnimalitosLotteries | undefined
}

const AnimalitosRaffleResultCard = ({
  raffle,
  addRaffleAnimalitosResult,
  animalOptions,
  isLoadingState,
  createdBy,
  selectedLottery,
}: AnimalitosRaffleResultCardProps) => {
  const {
    colorState,
    colorTextState,
    textState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  } = useRaffleResultCard({
    animalitosRaffleStatus: raffle.animalitosRaffleStatus,
  })

  const addRaffleAnimalitosResultWrapper = (selectedAnimal: string) => {
    addRaffleAnimalitosResult(selectedAnimal)
    // setRaffleResultForm()
  }

  const wrappedGetSubmitButtonText = (selectedAnimal: string | undefined) => {
    return getSubmitButtonText(raffle, selectedAnimal)
  }

  const disableSubmitButton = () => {
    let disabled = false
    if (
      !raffle.animalitosRaffleResultLastUpdatedBy &&
      createdBy === raffle.animalitosRaffleResultCreatedBy
    ) {
      disabled = true
    } else if (
      raffle.animalitosRaffleResultLastUpdatedBy &&
      createdBy === raffle.animalitosRaffleResultLastUpdatedBy
    ) {
      disabled = true
    }
    return disabled
  }

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
          <div className='fw-bold me-4'>Resultado: </div>
          <ConditionalRendering isTrue={!showRaffleResultForm}>
            <span>
              {
                animalOptions.find(
                  (ap) => ap.animalId.toString() === raffle.animalitosRaffleResultValue
                )?.animalName
              }
              {selectedLottery?.animalitosLotteryFruitCombined &&
              raffle.animalitosRaffleResultFruitValue
                ? '-' +
                  (animalOptions.find(
                    (ap) => ap.animalId.toString() === raffle.animalitosRaffleResultFruitValue
                  )?.animalName || '')
                : ''}
            </span>
          </ConditionalRendering>
          <ConditionalRendering isTrue={showRaffleResultForm}>
            <AddRaffleAnimalitoResultForm
              options={animalOptions}
              selectedOption={raffle.animalitosRaffleResultValue ?? ''}
              selectedFruitOption={raffle.animalitosRaffleResultFruitValue ?? ''}
              addRaffleAnimalitosResult={addRaffleAnimalitosResultWrapper}
              setRaffleResultForm={setRaffleResultForm}
              wrappedGetSubmitButtonText={wrappedGetSubmitButtonText}
              isLoadingState={isLoadingState}
              selectedLottery={selectedLottery}
            />
          </ConditionalRendering>
        </div>
        <ConditionalRendering isTrue={!showRaffleResultForm}>
          <div className='d-flex justify-content-end align-items-center'>
            <HasPermission
              resource='raffleResult'
              actions={['add-raffle-result', 'update-raffle-result', 'approve-raffle-result']}
            >
              {!!buttonText && (
                <Button
                  className='m-1'
                  variant='primary'
                  onClick={setRaffleResultForm}
                  disabled={disableSubmitButton()}
                >
                  {buttonText}
                </Button>
              )}
            </HasPermission>
          </div>
        </ConditionalRendering>
      </Card.Body>
    </Card>
  )
}

export default AnimalitosRaffleResultCard
