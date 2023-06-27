import {
  IRaffleResultChance4DigitsDetail,
  Chance4DigitsRaffleStatus,
} from '../../../../types/Chance4Digits.types'
import {useState} from 'react'

interface IRaffleResultHookCard extends Chance4DigitsRaffleStatus {}

export const useChance4DigitsRaffleResultCard = ({
  chanceFourRaffleStatus,
}: IRaffleResultHookCard) => {
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

  const mapStateToButtonText = {
    PendingDraw: undefined,
    PendingResult: 'Ingresar resultado',
    PendingApprove: 'Aprobar/Actualizar resultado',
    Approved: undefined,
  }

  const mapStateToSubmitButtonText = {
    PendingDraw: undefined,
    PendingResult: 'Guardar',
    PendingApprove: 'Aprobar',
    Approved: undefined,
    Update: 'Actualizar',
  }

  const colorState = mapColorToState[chanceFourRaffleStatus || 'PendingDraw']
  const textState = mapStateToText[chanceFourRaffleStatus || 'PendingDraw']
  const colorTextState = mapColorTextToState[chanceFourRaffleStatus || 'PendingDraw']
  const buttonText = mapStateToButtonText[chanceFourRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChance4DigitsDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && chanceFourRaffleStatus === 'PendingApprove') {
      if (raffle.chanceFourRaffleResultValue === selectedOption) {
        return mapStateToSubmitButtonText['PendingApprove']
      } else {
        return mapStateToSubmitButtonText['Update']
      }
    }
    return mapStateToSubmitButtonText['PendingResult']
  }

  return {
    colorState,
    textState,
    colorTextState,
    buttonText,
    getSubmitButtonText,
    showRaffleResultForm,
    setRaffleResultForm,
  }
}
