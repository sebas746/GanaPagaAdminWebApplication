import {IRaffleResultChance3DigitsDetail, RaffleStatus} from '../../../../types/Chance3Digits.types'
import {useState} from 'react'

interface IRaffleResultHookCard extends RaffleStatus {}

export const useRaffleResultCard = ({Chance3DigitsRaffleStatus}: IRaffleResultHookCard) => {
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

  const colorState = mapColorToState[Chance3DigitsRaffleStatus || 'PendingDraw']
  const textState = mapStateToText[Chance3DigitsRaffleStatus || 'PendingDraw']
  const colorTextState = mapColorTextToState[Chance3DigitsRaffleStatus || 'PendingDraw']
  const buttonText = mapStateToButtonText[Chance3DigitsRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChance3DigitsDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && Chance3DigitsRaffleStatus === 'PendingApprove') {
      if (raffle.Chance3DigitsRaffleResultValue === selectedOption) {
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
