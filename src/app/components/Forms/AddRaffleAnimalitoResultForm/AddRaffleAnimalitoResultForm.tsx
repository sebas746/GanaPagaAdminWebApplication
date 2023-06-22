import React from 'react'
import {IAnimalDetail} from '../../../../types/Animalitos.types'
import {Form} from 'react-bootstrap'
import {useAddRaffleAnimalitoResultForm} from './AddRaffleAnimalitosResultForm.hook'
import Button from 'react-bootstrap/Button'

interface AddRaffleAnimalitoResultFormProps {
  options: IAnimalDetail[]
  selectedOption: string
  addRaffleAnimalitosResult: (selectedAnimal: string) => void
  setRaffleResultForm: () => void
}

const AddRaffleAnimalitoResultForm = ({
  options,
  selectedOption,
  addRaffleAnimalitosResult,
  setRaffleResultForm,
}: AddRaffleAnimalitoResultFormProps) => {
  const {formik} = useAddRaffleAnimalitoResultForm(addRaffleAnimalitosResult, selectedOption)
  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
      <Form.Select id={'animalitoId'} onChange={formik.handleChange}>
        {options.map((option) => (
          <option key={option.animalId} value={option.animalId}>
            {option.animalName}
          </option>
        ))}
      </Form.Select>
      <Button variant='primary' type='submit'>
        Ingresar
      </Button>
      <Button type='reset' variant='danger' onClick={setRaffleResultForm}>
        Cancelar
      </Button>
    </form>
  )
}

export default AddRaffleAnimalitoResultForm
