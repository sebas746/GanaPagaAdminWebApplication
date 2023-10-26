import React from 'react'
import {
  IAnimalDetail,
  IAnimalDetailSelect,
  IAnimalitosLotteries,
  IRaffleResultAnimalitosDetail,
} from '../../../../types/Animalitos.types'
import {Form} from 'react-bootstrap'
import {useAddRaffleAnimalitoResultForm} from './AddRaffleAnimalitosResultForm.hook'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {Typeahead} from 'react-bootstrap-typeahead'

interface AddRaffleAnimalitoResultFormProps {
  options: IAnimalDetail[]
  selectedOption: string
  selectedFruitOption: string
  addRaffleAnimalitosResult: (selectedAnimal: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
  selectedLottery: IAnimalitosLotteries | undefined
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
}: AddRaffleAnimalitoResultFormProps) => {
  const {formik} = useAddRaffleAnimalitoResultForm(
    addRaffleAnimalitosResult,
    selectedOption,
    selectedFruitOption,
    selectedLottery?.animalitosLotteryFruitCombined
  )
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.animalitoId)
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
  if (selectedLottery?.animalitosLotteryFruitCombined) {
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

  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
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
      {selectedLottery?.animalitosLotteryFruitCombined && (
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
          defaultSelected={fruitOptionsSelected ?? undefined}
          placeholder={'Seleccionar fruita...'}
          isInvalid={!!formik.errors.fruitId}
          isValid={formik.dirty && !formik.errors.fruitId}
        />
      )}
      <Button
        variant='primary'
        type='submit'
        disabled={isLoadingState || !!formik.errors.animalitoId}
      >
        {isLoadingState && <RenderLoader show={isLoadingState} />}
        {!isLoadingState && submitButtonText}
      </Button>
      <Button type='reset' variant='danger' onClick={setRaffleResultForm}>
        Cancelar
      </Button>
    </form>
  )
}

export default AddRaffleAnimalitoResultForm
