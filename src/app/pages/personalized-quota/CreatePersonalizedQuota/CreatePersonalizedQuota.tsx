import React from 'react'
import {useCreatePersonalizedQuota} from './useCreatePersonalizedQuota'
import {Spinner} from 'react-bootstrap'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import {useNavigate} from 'react-router-dom'
import {formatCurrency} from '../../../helpers/currency.helpers'

import './createPersonalizedQuota.scss'

interface CreatePersonalizedBetProps {}

const CreatePersonalizedQuota = ({}: CreatePersonalizedBetProps) => {
  const {
    lotteryData,
    onChangeLottery,
    selectedLottery,
    isFetching,
    mappedAnimalitosByLottery,
    onChangeAnimal,
    onChangeQuotaUsd,
    onChangeQuotaVes,
    quotaUsd,
    quotaVes,
    selectedAnimal,
    saveAnimalQuota,
    animalitosData,
    isInsertingQuota,
  } = useCreatePersonalizedQuota()

  const navigate = useNavigate()

  const onBack = () => {
    navigate(-1)
  }

  return (
    <div className='container-fluid CreatePersonalizedQuota'>
      <div className='mb-10'>
        <div className='d-flex gap-3 mb-10'>
          <div className='col-4'>
            <label className='form-label'>Seleccione la loteria</label>
            <select className='form-select' onChange={onChangeLottery} value={selectedLottery}>
              <option value='0'>Seleccione una loteria</option>
              {lotteryData.map((lottery) => (
                <option value={lottery.lotteryId} key={`lottery-${lottery.lotteryId}`}>
                  {lottery.lotteryName}
                </option>
              ))}
            </select>
          </div>

          <div className='col-4'>
            <div className='border border-1 p-3 pb-0 rounded usdPersonalizedBox'>
              <p className='fs-4'>
                Cupo general:{' '}
                {formatCurrency(animalitosData[0]?.animalitosMaxOverallUsd ?? 0, 'USD')} USD
              </p>
              <p className='fs-4'>
                Tope por apuesta: {formatCurrency(animalitosData[0]?.maxBetByAnimalUsd ?? 0, 'USD')} USD
              </p>
            </div>
          </div>
          <div className='col-4'>
            <div className='border border-1 p-3 pb-0 rounded vesPersonalizedBox'>
              <p className='fs-4'>
                Cupo general:{' '}
                {formatCurrency(animalitosData[0]?.animalitosMaxOverallVes ?? 0, 'VES')} VES
              </p>
              <p className='fs-4'>
                Tope por apuesta: {formatCurrency(animalitosData[0]?.maxBetByAnimalVes ?? 0, 'VES')} VES
              </p>
            </div>
          </div>
        </div>
        <div className='d-flex gap-3 mb-10'>
          <div className='col-4'>
            <label className='form-label'>Seleccione el animalito</label>
            <select className='form-select' onChange={onChangeAnimal} value={selectedAnimal}>
              <option value='0'>Seleccione un animalito</option>
              {mappedAnimalitosByLottery.map((animal) => (
                <option value={animal.animalId} key={`list-animal-${animal.animalId}`}>
                  {animal.animalName}
                </option>
              ))}
            </select>
          </div>
          <ConditionalRedering isTrue={selectedAnimal !== 0}>
            <>
              <div className='col-4'>
                <label className='form-label'>Cupo personalizado USD</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={onChangeQuotaUsd}
                  value={quotaUsd}
                />
              </div>
              <div className='col-4'>
                <label className='form-label'>Cupo personalizado VES</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={onChangeQuotaVes}
                  value={quotaVes}
                />
              </div>
            </>
          </ConditionalRedering>
        </div>

        <ConditionalRedering isTrue={selectedAnimal !== 0}>
          <div className='d-flex'>
            <div className='col-4 offset-sm-8'>
              <div className='d-flex justify-content-between gap-10'>
                <button
                  className='btn btn-secondary w-50'
                  onClick={onBack}
                  disabled={isInsertingQuota}
                >
                  Regresar
                </button>
                <button
                  className='btn btn-primary w-50'
                  onClick={saveAnimalQuota}
                  disabled={isInsertingQuota}
                >
                  {isInsertingQuota && <Spinner />}
                  {!isInsertingQuota && 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        </ConditionalRedering>
      </div>
      <ConditionalRedering isTrue={isFetching}>
        <div className='d-flex justify-content-center'>
          <Spinner animation='border' variant='primary' />
        </div>
      </ConditionalRedering>
    </div>
  )
}

export default CreatePersonalizedQuota
