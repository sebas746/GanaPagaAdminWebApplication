//scrutiny state
export const mapScrutinyColorToState = {
  PendingResultApprove: 'bg-secondary',
  PendingScrutiny: 'bg-danger',
  Scrutinized: 'bg-success',
}

export const mapColorScrutinyTextToState = {
  PendingResultApprove: 'text-dark',
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
  PendingDraw: 'bg-primary',
  PendingResult: 'bg-danger',
  PendingApprove: 'bg-warning',
  Approved: 'bg-success',
  NoTicketBets: 'bg-secondary',
}

export const mapRaffleStatusColorTextToState = {
  PendingDraw: 'text-white',
  PendingResult: 'text-white',
  PendingApprove: 'text-white',
  Approved: 'text-white',
  NoTicketBets: 'text-dark',
}

export const mapRaffleStatusToText = {
  PendingDraw: 'Sin jugar sorteo',
  PendingResult: 'Pendiente resultado',
  PendingApprove: 'Pendiente de aprobación',
  Approved: 'Ingresado y aprobado',
  NoTicketBets: 'Sorteo sin apuestas',
}

export const mapRaffleStatusToButtonText = {
  PendingDraw: undefined,
  PendingResult: 'Ingresar resultado',
  PendingApprove: 'Aprobar/Actualizar resultado',
  Approved: undefined,
  NoTicketBets: undefined,
}

export const mapRaffleStatusToSubmitButtonText = {
  PendingDraw: undefined,
  PendingResult: 'Guardar',
  PendingApprove: 'Aprobar',
  Approved: undefined,
  Update: 'Actualizar',
  NoTicketBets: undefined,
}
