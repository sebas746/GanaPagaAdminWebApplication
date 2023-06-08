interface IRaffleResultHookCard {
  state: 'no-played' | 'pending-result' | 'pending-approval' | 'approved'
}

export const useRaffleResultCard = ({state}: IRaffleResultHookCard) => {
  const mapColorToState = {
    'no-played': 'bg-secondary',
    'pending-result': 'bg-danger',
    'pending-approval': 'bg-warning',
    approved: 'bg-success',
  }

  const mapColorTextToState = {
    'no-played': 'text-dark',
    'pending-result': 'text-white',
    'pending-approval': 'text-white',
    approved: 'text-white',
  }

  const mapStateToText = {
    'no-played': 'Sin jugar sorteo',
    'pending-result': 'Pendiente resultado',
    'pending-approval': 'Pendiente de aprobación',
    approved: 'Ingresado y aprobado',
  }
  const colorState = mapColorToState[state || 'no-played']
  const textState = mapStateToText[state || 'no-played']
  const colorTextState = mapColorTextToState[state || 'no-played']

  return {
    colorState,
    textState,
    colorTextState,
  }
}
