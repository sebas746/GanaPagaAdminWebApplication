import {
  IRaffleResultChance4DigitsDetail,
  Chance4DigitsRaffleStatus,
} from '../../../../types/Chance4Digits.types'
import {useState} from 'react'
import {
  mapRaffleStatusColorToState,
  mapRaffleStatusToText,
  mapRaffleStatusColorTextToState,
  mapRaffleStatusToSubmitButtonText,
  mapRaffleStatusToButtonText,
} from '../../../constants/raffle-state.constants'

interface IRaffleResultHookCard extends Chance4DigitsRaffleStatus {}

export const useChance4DigitsRaffleResultCard = ({
  chanceFourRaffleStatus,
}: IRaffleResultHookCard) => {
  const [showRaffleResultForm, setShowRaffleResultForm] = useState(false)

  const setRaffleResultForm = () => {
    setShowRaffleResultForm(!showRaffleResultForm)
  }

  const colorState = mapRaffleStatusColorToState[chanceFourRaffleStatus || 'PendingDraw']
  const textState = mapRaffleStatusToText[chanceFourRaffleStatus || 'PendingDraw']
  const colorTextState = mapRaffleStatusColorTextToState[chanceFourRaffleStatus || 'PendingDraw']
  const buttonText = mapRaffleStatusToButtonText[chanceFourRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChance4DigitsDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && chanceFourRaffleStatus === 'PendingApprove') {
      if (raffle.chanceFourRaffleResultValue === selectedOption) {
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
