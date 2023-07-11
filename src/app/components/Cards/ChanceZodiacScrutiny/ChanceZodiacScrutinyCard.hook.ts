import {ChanceZodiacScrutinyStatus} from '../../../../types/ChanceZodiac.types'

export const useScrutinyChanceZodiac = ({
  chanceZodiacRaffleScrutinyStatus,
}: ChanceZodiacScrutinyStatus) => {
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

  const colorState = mapColorToState[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']
  const textState = mapStateToText[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']
  const colorTextState = mapColorTextToState[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']
  const buttonText = mapStateToButtonText[chanceZodiacRaffleScrutinyStatus || 'PendingScrutiny']

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
  }
}
