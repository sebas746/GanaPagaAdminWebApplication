import React from 'react'
import DatePicker from 'react-datepicker'
import {useScrutinyForm} from './ScrutinyForm.hook'
import Button from 'react-bootstrap/Button'
import {Form} from 'react-bootstrap'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import RenderLoader from '../../RenderLoader/RenderLoader'

interface ScrutinyFormProps {
  raffleFormState: RaffleResultsForm
  setRaffleForm: (form: RaffleResultsForm) => void
  loading: boolean
}

const ScrutinyForm = ({raffleFormState, setRaffleForm, loading}: ScrutinyFormProps) => {
  const {formik} = useScrutinyForm(raffleFormState, setRaffleForm)

  return (
    <div className='flex-center'>
      <form onSubmit={formik.handleSubmit}>
        <div className='d-flex align-items-end column-gap-8'>
          <div className=''>
            <label className='fs-6' htmlFor='date'>
              Fecha de sorteo
            </label>
            <DatePicker
              className='form-control'
              id='date'
              selected={DateTime.fromISO(formik.values.date).toJSDate()}
              onChange={(date) =>
                date &&
                formik.handleChange({
                  target: {name: 'date', value: DateTime.fromISO(date.toISOString()).toISODate()},
                })
              }
            />
          </div>
          <div className=''>
            <label className='fs-6' htmlFor='state'>
              Estado del sorteo
            </label>
            <Form.Select
              id='raffleResultStateId'
              onChange={formik.handleChange}
              value={formik.values.raffleResultStateId}
            >
              <option value=''>Todos</option>
              <option value='PendingResultApprove'>Sorteo pendiente de escrutinio</option>
              <option value='Scrutinized'>Sorteo con escrutinio</option>
            </Form.Select>
          </div>
          <div>
            <Button type='submit' variant='primary' disabled={loading}>
              Buscar <RenderLoader show={loading} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ScrutinyForm
