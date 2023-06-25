import React from 'react'
import {
  IAnimalDetail,
  IAnimalDetailSelect,
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
  addRaffleAnimalitosResult: (selectedAnimal: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
}

const AddRaffleAnimalitoResultForm = ({
  options,
  selectedOption,
  addRaffleAnimalitosResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
}: AddRaffleAnimalitoResultFormProps) => {
  const {formik} = useAddRaffleAnimalitoResultForm(addRaffleAnimalitosResult, selectedOption)
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.animalitoId)
  var Typeahead = require('react-bootstrap-typeahead').Typeahead // CommonJS

  var options1 = [
    {id: 1, label: 'John'},
    {id: 2, label: 'Miles'},
    {id: 3, label: 'Charles'},
    {id: 4, label: 'Herbie'},
  ]

  const animalOptions: IAnimalDetailSelect[] = options.map((options) => {
    return {
      id: options.animalId,
      label: options.animalName,
    }
  })

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
        defaultValue={selectedOption}
        placerholder={'Seleccione...'}
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

export default AddRaffleAnimalitoResultForm
