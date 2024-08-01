import {useState} from 'react'
import {ScrutinyStatus} from '../../../../types/Animalitos.types'
import {
  mapScrutinyColorToState,
  mapScrutinyStateToText,
  mapColorScrutinyTextToState,
  mapScrutinyStateToButtonText,
} from '../../../constants/raffle-state.constants'

export const useScrutinyAnimalitos = ({animalitosRaffleScrutinyStatus}: ScrutinyStatus) => {
  const [showRaffleResultForm, setShowRaffleResultForm] = useState(false)
  const colorState = mapScrutinyColorToState[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapScrutinyStateToText[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState =
    mapColorScrutinyTextToState[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText =
    mapScrutinyStateToButtonText[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const getSubmitButtonText = () => {
    return 'Recalcular'
  }
  const setRaffleResultForm = () => {
    setShowRaffleResultForm(!showRaffleResultForm)
  }
  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
    getSubmitButtonText,
    setRaffleResultForm,
  }
}
