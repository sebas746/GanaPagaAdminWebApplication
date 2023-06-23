import {IRaffleResultAnimalitosDetail, RaffleStatus} from '../../../../types/Animalitos.types'
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

  const colorState = mapColorToState[animalitosRaffleStatus || 'PendingDraw']
  const textState = mapStateToText[animalitosRaffleStatus || 'PendingDraw']
  const colorTextState = mapColorTextToState[animalitosRaffleStatus || 'PendingDraw']
  const buttonText = mapStateToButtonText[animalitosRaffleStatus || 'PendingDraw']
  const getSubmitButtonText = (
    raffle: IRaffleResultAnimalitosDetail,
    selectedOption: string | undefined
  ) => {
    if (selectedOption !== 'undefined' && animalitosRaffleStatus === 'PendingApprove') {
      if (raffle.animalitosRaffleResultValue === selectedOption) {
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
