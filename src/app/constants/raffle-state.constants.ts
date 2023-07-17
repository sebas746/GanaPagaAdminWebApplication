//scrutiny state
export const mapScrutinyColorToState = {
  PendingResultApprove: 'bg-secondary',
  PendingScrutiny: 'bg-danger',
  Scrutinized: 'bg-success',
}

export const mapColorScrutinyTextToState = {
  PendingResultApprove: 'text-white',
  PendingScrutiny: 'text-white',
  Scrutinized: 'text-white',
}

export const mapScrutinyStateToText = {
  PendingResultApprove: 'Sorteo pendiente por resultado',
  PendingScrutiny: 'Sorteo pendiente de escrutinio',
  Scrutinized: 'Sorteo con escrutinio',
}

export const mapScrutinyStateToButtonText = {
  PendingResultApprove: undefined,
  PendingScrutiny: 'Calcular',
  Scrutinized: 'Detalles',
}

//raffle result state

export const mapRaffleStatusColorToState = {
  PendingDraw: 'bg-secondary',
  PendingResult: 'bg-danger',
  PendingApprove: 'bg-warning',
  Approved: 'bg-success',
}

export const mapRaffleStatusColorTextToState = {
  PendingDraw: 'text-dark',
  PendingResult: 'text-white',
  PendingApprove: 'text-white',
  Approved: 'text-white',
}

export const mapRaffleStatusToText = {
  PendingDraw: 'Sin jugar sorteo',
  PendingResult: 'Pendiente resultado',
  PendingApprove: 'Pendiente de aprobación',
  Approved: 'Ingresado y aprobado',
}

export const mapRaffleStatusToButtonText = {
  PendingDraw: undefined,
  PendingResult: 'Ingresar resultado',
  PendingApprove: 'Aprobar/Actualizar resultado',
  Approved: undefined,
}

export const mapRaffleStatusToSubmitButtonText = {
  PendingDraw: undefined,
  PendingResult: 'Guardar',
  PendingApprove: 'Aprobar',
  Approved: undefined,
  Update: 'Actualizar',
}
