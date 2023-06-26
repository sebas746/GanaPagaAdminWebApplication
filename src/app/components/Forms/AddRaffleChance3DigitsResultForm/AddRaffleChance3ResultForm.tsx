import React from 'react'
import {
  IAnimalDetail,
  IAnimalDetailSelect,
  IRaffleResultChance3DigitsDetail,
} from '../../../../types/Chance3Digits.types'
import {Form} from 'react-bootstrap'
import {useAddRaffleAnimalitoResultForm} from './AddRaffleChance3DigitsResultForm.hook'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {Typeahead} from 'react-bootstrap-typeahead'

interface AddRaffleChance3DigitsResultFormProps {
  options: IAnimalDetail[]
  selectedOption: string
  addRaffleChance3DigitsResult: (selectedAnimal: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
}

const AddRaffleChance3DigitsResultForm = ({
  options,
  selectedOption,
  addRaffleChance3DigitsResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
}: AddRaffleChance3DigitsResultFormProps) => {
  const {formik} = useAddRaffleAnimalitoResultForm(addRaffleChance3DigitsResult, selectedOption)
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.animalitoId)
  var Typeahead = require('react-bootstrap-typeahead').Typeahead // CommonJS

  const animalOptions: IAnimalDetailSelect[] = options.map((option) => {
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

  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
      <Typeahead
        id={'animalitoId'}
        onChange={(selectedAnimal: IAnimalDetailSelect[]) => {
          if (selectedAnimal.length > 0) {
            formik.handleChange({
              target: {name: 'animalitoId', value: selectedAnimal[0].id},
            })
          }
        }}
        options={animalOptions}
        key={animalOptions.every((e) => e.id + 'typeahead_opt')}
        defaultSelected={animalOptionsSelected ?? undefined}
        placeholder={'Seleccionar animalito...'}
      />
      <Button variant='primary' type='submit' disabled={isLoadingState}>
        {isLoadingState && <RenderLoader show={isLoadingState} />}
        {!isLoadingState && submitButtonText}
      </Button>
      <Button type='reset' variant='danger' onClick={setRaffleResultForm}>
        Cancelar
      </Button>
    </form>
  )
}

export default AddRaffleChance3DigitsResultForm
