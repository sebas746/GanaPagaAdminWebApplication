import React from 'react'
import {Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useAddRafflechance4DigitsResultForm} from './AddRaffleChance4DigitsResultForm.hook'

interface AddRafflechance4DigitsResultFormProps {
  selectedOption: string
  addRafflechance4DigitsResult: (raffleResult: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
}

const AddRafflechance4DigitsResultForm = ({
  selectedOption,
  addRafflechance4DigitsResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
}: AddRafflechance4DigitsResultFormProps) => {
  const {formik} = useAddRafflechance4DigitsResultForm(addRafflechance4DigitsResult, selectedOption)
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.resultValue)

  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
      <Form.Control
        minLength={4}
        maxLength={4}
        max={9999}
        id='resultValue'
        defaultValue={formik.values.resultValue}
        onChange={formik.handleChange}
        autoComplete={'off'}
        isInvalid={!!formik.errors.resultValue}
        isValid={formik.dirty && !formik.errors.resultValue}
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

export default AddRafflechance4DigitsResultForm
