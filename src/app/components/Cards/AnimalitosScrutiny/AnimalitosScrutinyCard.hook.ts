import {ScrutinyStatus} from '../../../../types/Animalitos.types'

export const useScrutinyAnimalitos = ({animalitosRaffleScrutinyStatus}: ScrutinyStatus) => {
  const mapColorToState = {
    PendingResultApprove: 'bg-secondary',
    PendingScrutiny: 'bg-danger',
    Scrutinized: 'bg-success',
  }

  const mapColorTextToState = {
    PendingResultApprove: 'text-white',
    PendingScrutiny: 'text-white',
    Scrutinized: 'text-white',
  }

  const mapStateToText = {
    PendingResultApprove: 'Sorteo pendiente por resultado',
    PendingScrutiny: 'Sorteo pendiente de escrutinio',
    Scrutinized: 'Sorteo con escrutinio',
  }

  const mapStateToButtonText = {
    PendingResultApprove: undefined,
    PendingScrutiny: 'Calcular',
    Scrutinized: undefined,
  }

  const colorState = mapColorToState[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapStateToText[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState = mapColorTextToState[animalitosRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText = mapStateToButtonText[animalitosRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
