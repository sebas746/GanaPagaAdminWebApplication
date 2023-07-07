import {
  IRaffleResultChance4DigitsDetail,
  Chance4DigitsRaffleStatus,
} from '../../../../types/Chance4Digits.types'
import {useState} from 'react'
import {
  ChanceZodiacRaffleStatus,
  IRaffleResultChanceZodiacDetail,
} from '../../../../types/ChanceZodiac.types'

interface IRaffleResultHookCard extends ChanceZodiacRaffleStatus {}

export const useChanceZodiacRaffleResultCard = ({
  chanceZodiacRaffleStatus,
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

  const colorState = mapColorToState[chanceZodiacRaffleStatus || 'PendingDraw']
  const textState = mapStateToText[chanceZodiacRaffleStatus || 'PendingDraw']
  const colorTextState = mapColorTextToState[chanceZodiacRaffleStatus || 'PendingDraw']
  const buttonText = mapStateToButtonText[chanceZodiacRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultChanceZodiacDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && chanceZodiacRaffleStatus === 'PendingApprove') {
      if (raffle.chanceZodiacRaffleResultValue === selectedOption) {
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
