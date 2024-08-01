import React from 'react'
import {Card, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {useScrutinyAnimalitos} from './AnimalitosScrutinyCard.hook'
import {
  IAnimalDetail,
  IAnimalitosLotteries,
  IRaffleResultAnimalitosDetail,
  RaffleResulStatus,
  RaffleScrutinyStatus,
} from '../../../../types/Animalitos.types'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import RenderLoader from '../../RenderLoader/RenderLoader'
import HasPermission from '../../HasPermissions/HasPermissions'
import AddRaffleAnimalitoResultForm from '../../Forms/AddRaffleAnimalitoResultForm/AddRaffleAnimalitoResultForm'
import {useRaffleResultCard} from '../AnimalitosRaffleResult/AnimalitosRaffleResultCard.hook'
import {debug} from 'console'
import ConditionalRendering from '../../../helpers/ConditionalRedering'

interface AnimalitosScrutinyProps {
  addRaffleScrutinyAnimalitos: () => void
  raffle: IRaffleResultAnimalitosDetail
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyAnimalitosDetail: () => void
  animalOptions: IAnimalDetail[]
  selectedTab: number
  isLoading: boolean
  selectedLottery: IAnimalitosLotteries | undefined
  wrapRecalculateRaffleAnimalitosResult: (selectedAnimal: string) => void
}

const AnimalitosScrutinyCard = ({
  raffle,
  addRaffleScrutinyAnimalitos,
  loadingAdd,
  raffleId,
  onClickScrutinyAnimalitosDetail,
  animalOptions,
  selectedTab,
  isLoading,
  selectedLottery,
  wrapRecalculateRaffleAnimalitosResult,
}: AnimalitosScrutinyProps) => {
  const {
    colorState,
    colorTextState,
    textState,
    buttonText,
    getSubmitButtonText,
    setRaffleResultForm,
  } = useScrutinyAnimalitos({
    animalitosRaffleScrutinyStatus: raffle.animalitosRaffleScrutinyStatus,
  })

  const wrappedGetSubmitButtonText = (selectedAnimal: string | undefined) => {
    return getSubmitButtonText()
  }

  const recalculateRaffleAnimalitosResultWrapper = (selectedAnimal: string) => {
    wrapRecalculateRaffleAnimalitosResult(selectedAnimal)
    // setRaffleResultForm()
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
              <div className={colorTextState}>
                {textState}
                {raffle.animalitosRaffleScrutinyWasRecalculated && ' recalculado'}
              </div>
              <div className='me-2'>
                {raffle.animalitosRaffleScrutinyWasRecalculated && (
                  <>
                    <OverlayTrigger
                      placement='top'
                      overlay={
                        <Tooltip id={`tooltip-${raffle.animalitosRaffleName}`}>
                          El escrutinio fue recalculado{' '}
                          {raffle.animalitosRaffleScrutinyRecalculatedCount - 1}{' '}
                          {raffle.animalitosRaffleScrutinyRecalculatedCount < 2 ? 'veces' : 'vez'}.
                        </Tooltip>
                      }
                    >
                      <i
                        className='bi bi-exclamation-triangle-fill text-warning fs-4 ml-2'
                        style={{marginLeft: '8px'}}
                      ></i>
                    </OverlayTrigger>
                  </>
                )}
              </div>
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
            Resultado: {raffle.animalitosRaffleResultAnimal}
            {raffle.animalitosRaffleResultFruit ? `-${raffle?.animalitosRaffleResultFruit}` : ''}
          </div>
          <HasPermission resource='raffleScrutiny' actions={['create-scrutiny']}>
            <ConditionalRedering
              isTrue={
                raffle.animalitosRaffleScrutinyStatus ===
                  RaffleScrutinyStatus.PendingResultApprove &&
                raffle.animalitosRaffleStatus === RaffleResulStatus.Approved
              }
            >
              <button
                className='btn btn-primary'
                onClick={addRaffleScrutinyAnimalitos}
                disabled={loadingAdd}
              >
                {buttonText}
                {loadingAdd && (
                  <RenderLoader show={loadingAdd && raffle.animalitosRaffleId === raffleId} />
                )}
              </button>
            </ConditionalRedering>
          </HasPermission>
          <HasPermission resource='raffleScrutiny' actions={['recalculate-scrutiny']}>
            <ConditionalRendering
              isTrue={raffle.animalitosRaffleScrutinyStatus === RaffleScrutinyStatus.Scrutinized}
            >
              <AddRaffleAnimalitoResultForm
                options={animalOptions}
                selectedOption={raffle.animalitosRaffleResultValue ?? ''}
                selectedFruitOption={raffle.animalitosRaffleResultFruitValue ?? ''}
                addRaffleAnimalitosResult={recalculateRaffleAnimalitosResultWrapper}
                setRaffleResultForm={setRaffleResultForm}
                wrappedGetSubmitButtonText={wrappedGetSubmitButtonText}
                isLoadingState={loadingAdd}
                selectedLottery={selectedLottery}
                hideResetButton={true}
                showConfirmationModal={true}
              />
            </ConditionalRendering>
          </HasPermission>
          <HasPermission resource='raffleScrutiny' actions={['view-scrutiny']}>
            <ConditionalRedering
              isTrue={raffle.animalitosRaffleScrutinyStatus === RaffleScrutinyStatus.Scrutinized}
            >
              <button className='btn btn-success ms-2' onClick={onClickScrutinyAnimalitosDetail}>
                {buttonText}
              </button>
            </ConditionalRedering>
          </HasPermission>
        </div>
      </Card.Body>
    </Card>
  )
}

export default AnimalitosScrutinyCard
