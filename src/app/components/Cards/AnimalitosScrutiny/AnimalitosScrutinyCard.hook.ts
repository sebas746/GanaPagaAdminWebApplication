import {ScrutinyStatus} from '../../../../types/Animalitos.types'

export const useScrutinyAnimalitos = ({ animalitosRaffleScrutinyStatus }: ScrutinyStatus) => {

  const mapColorToState = {
    PendingScrutiny: 'bg-danger',
    Scrutinized: 'bg-success',
  }

  const mapColorTextToState = {
    PendingScrutiny: 'text-white',
    Scrutinized: 'text-white',
  }

  const mapStateToText = {
    PendingScrutiny: 'Sorteo pendiente de  escrutinio',
    Scrutinized: 'Sorteo con escrutinio',
  }

  const mapStateToButtonText = {
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
    buttonText
  }
}