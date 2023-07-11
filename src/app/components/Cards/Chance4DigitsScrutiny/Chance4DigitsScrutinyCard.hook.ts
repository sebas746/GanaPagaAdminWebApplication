import {Chance4ScrutinyStatus} from '../../../../types/Chance4Digits.types'

export const useScrutinyChance4Digits = ({
  chanceFourRaffleScrutinyStatus,
}: Chance4ScrutinyStatus) => {
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

  const colorState = mapColorToState[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapStateToText[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState = mapColorTextToState[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText = mapStateToButtonText[chanceFourRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
