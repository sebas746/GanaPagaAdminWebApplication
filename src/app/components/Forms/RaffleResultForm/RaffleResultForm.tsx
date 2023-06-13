import React from 'react'
import DatePicker from 'react-datepicker'
import {useRaffleResultForm} from './RaffleResultForm.hook'
import Button from 'react-bootstrap/Button'
import {Form} from 'react-bootstrap'

const RaffleResultForm = () => {
  const {formik} = useRaffleResultForm()

  return (
    <div className='flex-center'>
      <form onSubmit={formik.handleSubmit}>
        <div className='d-flex align-items-end column-gap-8'>
          <div className=''>
            <label className="fs-6" htmlFor='date'>Fecha de sorteo</label>
            <DatePicker
              className='form-control'
              id='date'
              selected={formik.values.date}
              onChange={formik.handleChange}
            />
          </div>
          <div className=''>
            <label className="fs-6" htmlFor='state'>Estado del sorteo</label>
            <Form.Select id='state' onChange={formik.handleChange} value={formik.values.state}>
              <option value='1'>Todos</option>
              <option value='2'>Sin Jugar Sorteo</option>
              <option value='3'>Pendiente Resultado</option>
              <option value='4'>Ingresado y Pendiente de Aprobación</option>
              <option value='5'>Ingresado y Aprobado</option>
            </Form.Select>
          </div>
          <div>
            <Button type='submit' variant='primary' >
              Buscar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RaffleResultForm
