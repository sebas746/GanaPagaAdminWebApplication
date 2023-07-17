import {ScrutinyStatus} from '../../../../types/Animalitos.types'
import {
  mapScrutinyColorToState,
  mapScrutinyStateToText,
  mapColorScrutinyTextToState,
  mapScrutinyStateToButtonText,
} from '../../../constants/raffle-state.constants'

export const useScrutinyAnimalitos = ({animalitosRaffleScrutinyStatus}: ScrutinyStatus) => {
  const colorState = mapScrutinyColorToState[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapScrutinyStateToText[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState =
    mapColorScrutinyTextToState[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText =
    mapScrutinyStateToButtonText[animalitosRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
