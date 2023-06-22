import {RaffleStatus} from '../../../../types/Animalitos.types'
import {useState} from 'react'

interface IRaffleResultHookCard extends RaffleStatus {}

export const useRaffleResultCard = ({animalitosRaffleStatus}: IRaffleResultHookCard) => {
  const [showRaffleResultForm, setShowRaffleResultForm] = useState(false)

  const setRaffleResultForm = () => {
    setShowRaffleResultForm(!showRaffleResultForm)
  }

  const mapColorToState = {
    PendingDraw: 'bg-secondary',
    PendingResult: 'bg-danger',
    PendingApprove: 'bg-warning',
    Approved: 'bg-success',
  }

  const mapColorTextToState = {
    PendingDraw: 'text-dark',
    PendingResult: 'text-white',
    PendingApprove: 'text-white',
    Approved: 'text-white',
  }

  const mapStateToText = {
    PendingDraw: 'Sin jugar sorteo',
    PendingResult: 'Pendiente resultado',
    PendingApprove: 'Pendiente de aprobación',
    Approved: 'Ingresado y aprobado',
  }
  const colorState = mapColorToState[animalitosRaffleStatus || 'PendingDraw']
  const textState = mapStateToText[animalitosRaffleStatus || 'PendingDraw']
  const colorTextState = mapColorTextToState[animalitosRaffleStatus || 'PendingDraw']

  return {
    colorState,
    textState,
    colorTextState,
    showRaffleResultForm,
    setRaffleResultForm
  }
}
