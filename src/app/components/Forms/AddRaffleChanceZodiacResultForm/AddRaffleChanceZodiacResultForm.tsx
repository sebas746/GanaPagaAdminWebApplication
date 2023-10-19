import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useAddRaffleChanceZodiacResultForm} from './AddRaffleChanceZodiacResultForm.hook'
import {starSignList} from '../../../constants/star-sign.constants'
import {IStarSignDetailSelect} from '../../../../types/ChanceZodiac.types'
import StarSignImage from './components/StarSignImage'

interface AddRaffleChanceZodiacResultFormProps {
  resultValue: string
  starSignId: number
  addRaffleChanceZodiacResult: (raffleResult: string, starSignId: number) => void
  setRaffleResultForm: () => void
  wrappedGetSubmitButtonText: (selectedOption: string | undefined) => string | undefined
  isLoadingState: boolean
}

const AddRaffleChanceZodiacResultForm = ({
  resultValue,
  starSignId,
  addRaffleChanceZodiacResult,
  setRaffleResultForm,
  wrappedGetSubmitButtonText,
  isLoadingState,
}: AddRaffleChanceZodiacResultFormProps) => {
  const {formik} = useAddRaffleChanceZodiacResultForm(
    addRaffleChanceZodiacResult,
    resultValue,
    starSignId
  )
  const submitButtonText = wrappedGetSubmitButtonText(formik.values.resultValue)
  var Typeahead = require('react-bootstrap-typeahead').Typeahead // CommonJS

  const starSignOptions: IStarSignDetailSelect[] = starSignList.map((option) => {
    return {
      id: option.starSignId,
      label: option.starSignName,
    }
  })

  const starSignIdSelected = starSignOptions.find((op) => op.id === starSignId)?.id ?? undefined

  const starSignNameSelected =
    starSignList.find((op) => op.starSignId === starSignId)?.starSignName ?? ''

  const starSignOptionsSelected: IStarSignDetailSelect[] = []

  if (starSignId !== undefined && starSignIdSelected !== undefined) {
    starSignOptionsSelected.push({id: starSignIdSelected, label: starSignNameSelected})
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className='align-items-center py-3'>
        {/* For Form.Control */}
        <Col className='px-1'>
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
        </Col>

        {/* For Typeahead */}
        <Col className='px-1'>
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
            defaultSelected={starSignOptionsSelected ?? undefined}
            placeholder={'Seleccionar signo...'}
            isInvalid={!!formik.errors.starSignId}
            isValid={formik.dirty && !formik.errors.starSignId}
          />
        </Col>

        <Col className='px-1 d-flex gap-2'>
          <Button
            variant='primary'
            type='submit'
            disabled={isLoadingState || !!formik.errors.resultValue || !!formik.errors.starSignId}
          >
            {isLoadingState && <RenderLoader show={isLoadingState} />}
            {!isLoadingState && submitButtonText}
          </Button>
          <Button type='reset' variant='danger' onClick={setRaffleResultForm}>
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddRaffleChanceZodiacResultForm
