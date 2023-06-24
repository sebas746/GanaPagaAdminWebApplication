import React from 'react'
import {IAnimalDetail, IRaffleResultAnimalitosDetail} from '../../../../types/Animalitos.types'
import {Form} from 'react-bootstrap'
import {useAddRaffleAnimalitoResultForm} from './AddRaffleAnimalitosResultForm.hook'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'

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
  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
      <Form.Select id={'animalitoId'} onChange={formik.handleChange} defaultValue={selectedOption}>
        {options.map((option) => (
          <option key={option.animalId} value={option.animalId}>
            {option.animalName}
          </option>
        ))}
      </Form.Select>
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
