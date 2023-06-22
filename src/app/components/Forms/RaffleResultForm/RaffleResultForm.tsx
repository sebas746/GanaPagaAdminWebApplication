import React from 'react'
import DatePicker from 'react-datepicker'
import {useRaffleResultForm} from './RaffleResultForm.hook'
import Button from 'react-bootstrap/Button'
import {Form} from 'react-bootstrap'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'

interface RaffleResultFormProps {
  raffleFormState: RaffleResultsForm
  setRaffleForm: (form: RaffleResultsForm) => void
}

const RaffleResultForm = ({raffleFormState, setRaffleForm}: RaffleResultFormProps) => {
  const {formik} = useRaffleResultForm(raffleFormState, setRaffleForm)

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
              <option value='1'>Todos</option>
              <option value='2'>Sin Jugar Sorteo</option>
              <option value='3'>Pendiente Resultado</option>
              <option value='4'>Ingresado y Pendiente de Aprobación</option>
              <option value='5'>Ingresado y Aprobado</option>
            </Form.Select>
          </div>
          <div>
            <Button type='submit' variant='primary'>
              Buscar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RaffleResultForm
