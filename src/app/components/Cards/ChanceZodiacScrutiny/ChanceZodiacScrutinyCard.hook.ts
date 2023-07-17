import {ChanceZodiacScrutinyStatus} from '../../../../types/ChanceZodiac.types'
import {
  mapScrutinyColorToState,
  mapScrutinyStateToText,
  mapColorScrutinyTextToState,
  mapScrutinyStateToButtonText,
} from '../../../constants/raffle-state.constants'

export const useScrutinyChanceZodiac = ({
  chanceZodiacRaffleScrutinyStatus,
}: ChanceZodiacScrutinyStatus) => {
  const colorState = mapScrutinyColorToState[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapScrutinyStateToText[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState =
    mapColorScrutinyTextToState[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText =
    mapScrutinyStateToButtonText[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
