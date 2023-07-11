import {
  IRaffleResultChance3DigitsDetail,
  Chance3DigitsRaffleStatus,
} from '../../../../types/Chance3Digits.types'
import {useState} from 'react'

interface IRaffleResultHookCard extends Chance3DigitsRaffleStatus {}

export const useChance3DigitsRaffleResultCard = ({
  chanceThreeRaffleStatus,
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

  const colorState = mapColorToState[chanceThreeRaffleStatus || 'PendingDraw']
  const textState = mapStateToText[chanceThreeRaffleStatus || 'PendingDraw']
  const colorTextState = mapColorTextToState[chanceThreeRaffleStatus || 'PendingDraw']
  const buttonText = mapStateToButtonText[chanceThreeRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChance3DigitsDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && chanceThreeRaffleStatus === 'PendingApprove') {
      if (raffle.chanceThreeRaffleResultValue === selectedOption) {
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
