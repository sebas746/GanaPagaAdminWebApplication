import React from 'react'
import DatePicker from 'react-datepicker'
import {useRaffleResultForm} from './RaffleResultForm.hook'
import Button from 'react-bootstrap/Button'
import {Form} from 'react-bootstrap'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import RenderLoader from '../../RenderLoader/RenderLoader'

interface RaffleResultFormProps {
  raffleFormState: RaffleResultsForm
  setRaffleForm: (form: RaffleResultsForm) => void
  isLoading: boolean
}

const RaffleResultForm = ({raffleFormState, setRaffleForm, isLoading}: RaffleResultFormProps) => {
  const {formik} = useRaffleResultForm(raffleFormState, setRaffleForm)

  return (
    <div className='flex-center'>
      <form onSubmit={formik.handleSubmit}>
        <div className='d-flex align-items-end column-gap-8'>
          <div className='d-flex flex-column'>
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
            <label className='fs-6' htmlFor='raffleResultStateId'>
              Estado del sorteo
            </label>
            <Form.Select
              id='raffleResultStateId'
              onChange={formik.handleChange}
              value={formik.values.raffleResultStateId}
            >
              <option value=''>Todos</option>
              <option value='PendingDraw'>Sin Jugar Sorteo</option>
              <option value='PendingResult'>Pendiente Resultado</option>
              <option value='PendingApprove'>Ingresado y Pendiente de Aprobación</option>
              <option value='Approved'>Ingresado y Aprobado</option>
            </Form.Select>
          </div>
          <div>
            <Button type='submit' variant='primary' disabled={isLoading}>
              Buscar <RenderLoader show={isLoading} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RaffleResultForm
