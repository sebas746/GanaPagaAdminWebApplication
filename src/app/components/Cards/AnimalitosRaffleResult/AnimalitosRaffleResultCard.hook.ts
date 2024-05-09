import {IAnimalitosLotteries, IRaffleResultAnimalitosDetail, RaffleStatus} from '../../../../types/Animalitos.types'
import {useState} from 'react'
import {
  mapRaffleStatusColorTextToState,
  mapRaffleStatusColorToState,
  mapRaffleStatusToButtonText,
  mapRaffleStatusToSubmitButtonText,
  mapRaffleStatusToText,
} from '../../../constants/raffle-state.constants'

interface IRaffleResultHookCard extends RaffleStatus {
  selectedLottery: IAnimalitosLotteries | undefined
}

export const useRaffleResultCard = ({animalitosRaffleStatus, selectedLottery}: IRaffleResultHookCard) => {
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
    const resultValue = selectedLottery?.animalitosLotteryFruitCombined ? `${raffle.animalitosRaffleResultValue}-${raffle.animalitosRaffleResultFruitValue}` : raffle.animalitosRaffleResultValue
    if (selectedOption !== 'undefined' && animalitosRaffleStatus === 'PendingApprove') {
      if (resultValue === selectedOption) {
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
