import {IRaffleResultAnimalitosDetail, RaffleStatus} from '../../../../types/Animalitos.types'
import {useState} from 'react'
import {
  mapRaffleStatusColorTextToState,
  mapRaffleStatusColorToState,
  mapRaffleStatusToButtonText,
  mapRaffleStatusToSubmitButtonText,
  mapRaffleStatusToText,
} from '../../../constants/raffle-state.constants'

interface IRaffleResultHookCard extends RaffleStatus {}

export const useRaffleResultCard = ({animalitosRaffleStatus}: IRaffleResultHookCard) => {
  const [showRaffleResultForm, setShowRaffleResultForm] = useState(false)

  const setRaffleResultForm = () => {
    setShowRaffleResultForm(!showRaffleResultForm)
  }

  const colorState = mapRaffleStatusColorToState[animalitosRaffleStatus || 'PendingDraw']
  const textState = mapRaffleStatusToText[animalitosRaffleStatus || 'PendingDraw']
  const colorTextState = mapRaffleStatusColorTextToState[animalitosRaffleStatus || 'PendingDraw']
  const buttonText = mapRaffleStatusToButtonText[animalitosRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultAnimalitosDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && animalitosRaffleStatus === 'PendingApprove') {
      if (raffle.animalitosRaffleResultValue === selectedOption) {
        return mapRaffleStatusToSubmitButtonText['PendingApprove']
      } else {
        return mapRaffleStatusToSubmitButtonText['Update']
      }
    }
    return mapRaffleStatusToSubmitButtonText['PendingResult']
  }

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  }
}
