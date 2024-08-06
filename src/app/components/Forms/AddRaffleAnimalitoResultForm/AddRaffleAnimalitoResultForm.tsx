import React, {useState} from 'react'
import {
  IAnimalDetail,
  IAnimalDetailSelect,
  IAnimalitosLotteries,
} from '../../../../types/Animalitos.types'
import {useAddRaffleAnimalitoResultForm} from './AddRaffleAnimalitosResultForm.hook'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {LOTTERY_FRUITA_GANA_ID} from '../../../constants/localstorage.constants'
import Modal from 'react-bootstrap/Modal'

interface AddRaffleAnimalitoResultFormProps {
  options: IAnimalDetail[]
  selectedOption: string
  selectedFruitOption: string
  addRaffleAnimalitosResult: (selectedAnimal: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
  selectedLottery: IAnimalitosLotteries | undefined
  hideResetButton?: boolean
  showConfirmationModal?: boolean // New optional prop to show confirmation modal
}

const AddRaffleAnimalitoResultForm = ({
  options,
  selectedOption,
  selectedFruitOption,
  addRaffleAnimalitosResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
  selectedLottery,
  hideResetButton = false,
  showConfirmationModal = false, // Default value false
}: AddRaffleAnimalitoResultFormProps) => {
  const {formik} = useAddRaffleAnimalitoResultForm(
    addRaffleAnimalitosResult,
    selectedOption,
    selectedFruitOption,
    selectedLottery?.animalitosLotteryFruitCombined,
    selectedLottery?.lotteryId
  )
  const [showModal, setShowModal] = useState(false)
  const resultValue = selectedLottery?.animalitosLotteryFruitCombined
    ? `${formik.values.animalitoId}-${formik.values.fruitId}`
    : formik.values.animalitoId
  const submitButtonText = wrappedGetSubmitButtonText(resultValue)
  var Typeahead = require('react-bootstrap-typeahead').Typeahead // CommonJS

  const animalOptions: IAnimalDetailSelect[] = options
    .filter((option) => !option.animalIsFruit)
    .map((option) => {
      return {
        id: option.animalId,
        label: option.animalName,
      }
    })

  const animalIdSelected =
    options.find((op) => op.animalId === Number(selectedOption))?.animalId ?? undefined

  const animalSelected =
    options.find((op) => op.animalId === Number(selectedOption))?.animalName ?? undefined

  const animalOptionsSelected: IAnimalDetailSelect[] = []

  if (animalIdSelected !== undefined && animalSelected !== undefined) {
    animalOptionsSelected.push({id: animalIdSelected, label: animalSelected})
  }
  let fruitOptions: IAnimalDetailSelect[] = []
  let fruitIdSelected: number | undefined
  let fruitSelected: string | undefined
  let fruitOptionsSelected: IAnimalDetailSelect[] = []
  if (
    selectedLottery?.animalitosLotteryFruitCombined ||
    selectedLottery?.lotteryId === LOTTERY_FRUITA_GANA_ID
  ) {
    fruitOptions = options
      .filter((option) => option.animalIsFruit)
      .map((option) => {
        return {
          id: option.animalId,
          label: option.animalName,
        }
      })

    fruitIdSelected =
      options.find((op) => op.animalId === Number(selectedFruitOption))?.animalId ?? undefined

    fruitSelected =
      options.find((op) => op.animalId === Number(selectedFruitOption))?.animalName ?? undefined

    if (fruitIdSelected !== undefined && fruitSelected !== undefined) {
      fruitOptionsSelected.push({id: fruitIdSelected, label: fruitSelected})
    }
  }
  const selectedAnimalFruit = selectedLottery?.animalitosLotteryFruitCombined
    ? fruitOptionsSelected
    : animalOptionsSelected

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (showConfirmationModal) {
      setShowModal(true)
    } else {
      formik.handleSubmit(e)
    }
  }

  const handleConfirm = () => {
    setShowModal(false)
    formik.handleSubmit()
  }

  return (
    <>
      <form className='d-flex align-items-center column-gap-4' onSubmit={handleSubmit}>
        {selectedLottery?.lotteryId !== LOTTERY_FRUITA_GANA_ID && (
          <Typeahead
            id={'animalitoId'}
            onChange={(selectedAnimal: IAnimalDetailSelect[]) => {
              if (selectedAnimal.length > 0) {
                formik.handleChange({
                  target: {name: 'animalitoId', value: selectedAnimal[0].id},
                })
              } else {
                formik.handleChange({
                  target: {name: 'animalitoId', value: undefined},
                })
              }
            }}
            options={animalOptions}
            key={animalOptions.every((e) => e.id + 'typeahead_opt')}
            defaultSelected={animalOptionsSelected ?? undefined}
            placeholder={'Seleccionar animalito...'}
            isInvalid={!!formik.errors.animalitoId}
            isValid={formik.dirty && !formik.errors.animalitoId}
          />
        )}

        {(selectedLottery?.animalitosLotteryFruitCombined ||
          selectedLottery?.lotteryId === LOTTERY_FRUITA_GANA_ID) && (
          <Typeahead
            id={'fruitId'}
            onChange={(selectedFruit: IAnimalDetailSelect[]) => {
              if (selectedFruit.length > 0) {
                formik.handleChange({
                  target: {name: 'fruitId', value: selectedFruit[0].id},
                })
              } else {
                formik.handleChange({
                  target: {name: 'fruitId', value: undefined},
                })
              }
            }}
            options={fruitOptions}
            key={fruitOptions.every((e) => e.id + 'typeahead_opt')}
            defaultSelected={selectedAnimalFruit ?? undefined}
            placeholder={'Seleccionar fruta...'}
            isInvalid={!!formik.errors.fruitId}
            isValid={formik.dirty && !formik.errors.fruitId}
          />
        )}
        <Button
          variant='primary'
          type='submit'
          disabled={isLoadingState || !!formik.errors.fruitId}
        >
          {isLoadingState && <RenderLoader show={isLoadingState} />}
          {!isLoadingState && submitButtonText}
        </Button>
        {!hideResetButton && (
          <Button type='reset' variant='danger' onClick={setRaffleResultForm}>
            Cancelar
          </Button>
        )}
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>Está seguro de que desea confirmar la acción?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddRaffleAnimalitoResultForm
