import React from 'react'
import {IRaffleResultChance3DigitsDetail} from '../../../../types/Chance3Digits.types'
import {Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useAddRaffleChance3DigitsResultForm} from './AddRaffleChance3DigitsResultForm.hook'

interface AddRaffleChance3DigitsResultFormProps {
  selectedOption: string
  addRaffleChance3DigitsResult: (raffleResult: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
  maxDigitsByBet: number
}

const AddRaffleChance3DigitsResultForm = ({
  selectedOption,
  addRaffleChance3DigitsResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
  maxDigitsByBet,
}: AddRaffleChance3DigitsResultFormProps) => {
  const {formik} = useAddRaffleChance3DigitsResultForm(
    addRaffleChance3DigitsResult,
    selectedOption,
    maxDigitsByBet
  )
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.resultValue)

  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
      <Form.Control
        minLength={maxDigitsByBet}
        maxLength={maxDigitsByBet}
        max={999}
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

export default AddRaffleChance3DigitsResultForm
