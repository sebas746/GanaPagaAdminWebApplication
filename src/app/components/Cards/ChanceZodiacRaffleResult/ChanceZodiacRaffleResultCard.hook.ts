import {
  IRaffleResultChance4DigitsDetail,
  Chance4DigitsRaffleStatus,
} from '../../../../types/Chance4Digits.types'
import {useState} from 'react'
import {
  ChanceZodiacRaffleStatus,
  IRaffleResultChanceZodiacDetail,
} from '../../../../types/ChanceZodiac.types'
import {
  mapRaffleStatusColorToState,
  mapRaffleStatusToText,
  mapRaffleStatusColorTextToState,
  mapRaffleStatusToButtonText,
  mapRaffleStatusToSubmitButtonText,
} from '../../../constants/raffle-state.constants'

interface IRaffleResultHookCard extends ChanceZodiacRaffleStatus {}

export const useChanceZodiacRaffleResultCard = ({
  chanceZodiacRaffleStatus,
}: IRaffleResultHookCard) => {
  const [showRaffleResultForm, setShowRaffleResultForm] = useState(false)

  const setRaffleResultForm = () => {
    setShowRaffleResultForm(!showRaffleResultForm)
  }

  const colorState = mapRaffleStatusColorToState[chanceZodiacRaffleStatus || 'PendingDraw']
  const textState = mapRaffleStatusToText[chanceZodiacRaffleStatus || 'PendingDraw']
  const colorTextState = mapRaffleStatusColorTextToState[chanceZodiacRaffleStatus || 'PendingDraw']
  const buttonText = mapRaffleStatusToButtonText[chanceZodiacRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChanceZodiacDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && chanceZodiacRaffleStatus === 'PendingApprove') {
      if (raffle.chanceZodiacRaffleResultValue === selectedOption) {
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
