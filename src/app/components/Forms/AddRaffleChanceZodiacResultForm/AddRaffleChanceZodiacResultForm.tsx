import React from 'react'
import {Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useAddRaffleChanceZodiacResultForm} from './AddRaffleChanceZodiacResultForm.hook'
import {starSignList} from '../../../constants/star-sign.constants'
import {IStarSignDetailSelect} from '../../../../types/ChanceZodiac.types'

interface AddRaffleChanceZodiacResultFormProps {
  selectedOption: string
  addRaffleChanceZodiacResult: (raffleResult: string) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
}

const AddRaffleChanceZodiacResultForm = ({
  selectedOption,
  addRaffleChanceZodiacResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
}: AddRaffleChanceZodiacResultFormProps) => {
  const {formik} = useAddRaffleChanceZodiacResultForm(
    addRaffleChanceZodiacResult,
    selectedOption,
    1
  )
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.resultValue)
  var Typeahead = require('react-bootstrap-typeahead').Typeahead // CommonJS

  const starSignOptions: IStarSignDetailSelect[] = starSignList.map((option) => {
    return {
      id: option.starSignId,
      label: option.starSignName,
    }
  })

  return (
    <form className='d-flex align-items-center column-gap-4' onSubmit={formik.handleSubmit}>
      <Typeahead
        id={'starSignId'}
        onChange={(selectedStarSign: IStarSignDetailSelect[]) => {
          if (selectedStarSign.length > 0) {
            formik.handleChange({
              target: {name: 'starSignId', value: selectedStarSign[0].id},
            })
          } else {
            formik.handleChange({
              target: {name: 'starSignId', value: undefined},
            })
          }
        }}
        options={starSignOptions}
        key={starSignOptions.every((e) => e.id + 'typeahead_opt')}
        defaultSelected={selectedOption ?? undefined}
        placeholder={'Seleccionar signo...'}
        isInvalid={!!formik.errors.starSignId}
        isValid={formik.dirty && !formik.errors.starSignId}
      />
      <Form.Control
        minLength={3}
        maxLength={3}
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

export default AddRaffleChanceZodiacResultForm
