import {Chance3ScrutinyStatus} from '../../../../types/Chance3Digits.types'
import {
  mapScrutinyColorToState,
  mapScrutinyStateToText,
  mapColorScrutinyTextToState,
  mapScrutinyStateToButtonText,
} from '../../../constants/raffle-state.constants'

export const useScrutinyChance3Digits = ({
  chanceThreeRaffleScrutinyStatus,
}: Chance3ScrutinyStatus) => {
  const colorState = mapScrutinyColorToState[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapScrutinyStateToText[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState =
    mapColorScrutinyTextToState[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText =
    mapScrutinyStateToButtonText[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
