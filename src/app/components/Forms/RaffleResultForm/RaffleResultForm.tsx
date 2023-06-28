import React from 'react'
import DatePicker from 'react-datepicker'
import {useRaffleResultForm} from './RaffleResultForm.hook'
import Button from 'react-bootstrap/Button'
import {Form} from 'react-bootstrap'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import {useRaffleResultsAnimalitos} from '../../../pages/raffle-results/RaffleResultsAnimalitos/RaffleResultsAnimalitos.hook'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useRaffleResultsChance3Digits} from '../../../pages/raffle-results/RaffleResultsChance3Digits/RaffleResultsChance3Digits.hook'
import {useRaffleResultsChance4Digits} from '../../../pages/raffle-results/RaffleResultsChance4Digits/RaffleResultsChance4Digits.hook'

interface RaffleResultFormProps {
  raffleFormState: RaffleResultsForm
  setRaffleForm: (form: RaffleResultsForm) => void
}

const RaffleResultForm = ({raffleFormState, setRaffleForm}: RaffleResultFormProps) => {
  const {formik} = useRaffleResultForm(raffleFormState, setRaffleForm)
  const {isLoading} = useRaffleResultsAnimalitos()
  const {isLoadingChance3} = useRaffleResultsChance3Digits()
  const {isLoadingChance4} = useRaffleResultsChance4Digits()

  const globalIsLoading = isLoading || isLoadingChance3 || isLoadingChance4

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
              <option value='PendingDraw'>Sin Jugar Sorteo</option>
              <option value='PendingResult'>Pendiente Resultado</option>
              <option value='PendingApprove'>Ingresado y Pendiente de Aprobación</option>
              <option value='Approved'>Ingresado y Aprobado</option>
            </Form.Select>
          </div>
          <div>
            <Button type='submit' variant='primary' disabled={globalIsLoading}>
              Buscar <RenderLoader show={globalIsLoading} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RaffleResultForm
