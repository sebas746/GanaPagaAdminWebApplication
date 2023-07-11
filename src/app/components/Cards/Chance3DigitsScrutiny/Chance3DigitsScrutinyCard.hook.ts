import {Chance3ScrutinyStatus} from '../../../../types/Chance3Digits.types'

export const useScrutinyChance3Digits = ({
  chanceThreeRaffleScrutinyStatus,
}: Chance3ScrutinyStatus) => {
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
    Scrutinized: 'Detalles',
  }

  const colorState = mapColorToState[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapStateToText[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState = mapColorTextToState[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText = mapStateToButtonText[chanceThreeRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
