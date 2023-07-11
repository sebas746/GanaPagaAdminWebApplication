import {Chance4ScrutinyStatus} from '../../../../types/Chance4Digits.types'
import {
  mapScrutinyColorToState,
  mapScrutinyStateToText,
  mapColorScrutinyTextToState,
  mapScrutinyStateToButtonText,
} from '../../../constants/raffle-state.constants'

export const useScrutinyChance4Digits = ({
  chanceFourRaffleScrutinyStatus,
}: Chance4ScrutinyStatus) => {
  const colorState = mapScrutinyColorToState[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapScrutinyStateToText[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState =
    mapColorScrutinyTextToState[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText =
    mapScrutinyStateToButtonText[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
