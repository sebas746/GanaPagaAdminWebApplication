import {
  IRaffleResultChance3DigitsDetail,
  Chance3DigitsRaffleStatus,
} from '../../../../types/Chance3Digits.types'
import {useState} from 'react'
import {
  mapRaffleStatusColorToState,
  mapRaffleStatusToText,
  mapRaffleStatusColorTextToState,
  mapRaffleStatusToButtonText,
  mapRaffleStatusToSubmitButtonText,
} from '../../../constants/raffle-state.constants'

interface IRaffleResultHookCard extends Chance3DigitsRaffleStatus {}

export const useChance3DigitsRaffleResultCard = ({
  chanceThreeRaffleStatus,
}: IRaffleResultHookCard) => {
  const [showRaffleResultForm, setShowRaffleResultForm] = useState(false)

  const setRaffleResultForm = () => {
    setShowRaffleResultForm(!showRaffleResultForm)
  }

  const colorState = mapRaffleStatusColorToState[chanceThreeRaffleStatus || 'PendingDraw']
  const textState = mapRaffleStatusToText[chanceThreeRaffleStatus || 'PendingDraw']
  const colorTextState = mapRaffleStatusColorTextToState[chanceThreeRaffleStatus || 'PendingDraw']
  const buttonText = mapRaffleStatusToButtonText[chanceThreeRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChance3DigitsDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && chanceThreeRaffleStatus === 'PendingApprove') {
      if (raffle.chanceThreeRaffleResultValue === selectedOption) {
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
