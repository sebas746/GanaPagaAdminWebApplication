import React from 'react'
import {useCreatePersonalizedQuota} from './useCreatePersonalizedQuota'
import {Spinner} from 'react-bootstrap'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import {useNavigate} from 'react-router-dom'

interface CreatePersonalizedBetProps {}

const CreatePersonalizedQuota = ({}: CreatePersonalizedBetProps) => {
  const {
    lotteryData,
    onChangeLottery,
    selectedLottery,
    isFetching,
    mappedAnimalitosByLottery,
    overallAnimalQuota,
    onChangeAnimal,
    onChangeQuotaUsd,
    onChangeQuotaVes,
    quotaUsd,
    quotaVes,
    selectedAnimal,
    saveAnimalQuota,
    animalitosData,
    isInsertingQuota
  } = useCreatePersonalizedQuota()

  const navigate = useNavigate()

  const onBack = () => {
    navigate(-1)
  }

  console.log({selectedAnimal})

  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='d-flex gap-3'>
          <div className='col-4 '>
            <label className='form-label'>Seleccione la loteria</label>
            <select className='form-select' onChange={onChangeLottery} value={selectedLottery}>
              <option value='0'>Seleccione una loteria</option>
              {lotteryData.map((lottery) => (
                <option value={lottery.lotteryId} key={`lottery-${lottery.lotteryId}`}>{lottery.lotteryName}</option>
              ))}
            </select>
          </div>
          <div className='col-4'>
            <label className='form-label'>Seleccione el animalito</label>
            <select className='form-select' onChange={onChangeAnimal} value={selectedAnimal}>
              <option value='0'>Seleccione un animalito</option>
              {mappedAnimalitosByLottery.map((animal) => (
                <option value={animal.animalId} key={`list-animal-${animal.animalId}`}>{animal.animalName}</option>
              ))}
            </select>
          </div>
          <div className='col-4'>
            <div className='d-flex flex-column gap-8'>
              <div className='border border-1 border-dark p-3 pb-0 rounded bg-white'>
                <p className='fs-4'>Cupo general: {animalitosData[0]?.animalitosMaxOverallUsd ?? 0}</p>
                <p className='fs-4'>Tope por apuesta: {}</p>
              </div>
              <div className='border border-1 border-dark p-3 pb-0 rounded bg-white'>
                <p className='fs-4'>Cupo general: {animalitosData[0]?.animalitosMaxOverallVes ?? 0}</p>
                <p className='fs-4'>Tope por apuesta: {}</p>
              </div>
            </div>
          </div>
        </div>
        <ConditionalRedering isTrue={selectedAnimal !== 0}>
          <div className='d-flex gap-3 mb-10'>
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
          </div>
        </ConditionalRedering>
        <ConditionalRedering isTrue={selectedAnimal !== 0}>
          <div className='d-flex'>
            <div className='col-4 offset-sm-8'>
              <div className='d-flex justify-content-between gap-10'>
                <button className='btn btn-secondary w-50' onClick={onBack} disabled={isInsertingQuota}>Regresar</button>
                <button className='btn btn-primary w-50' onClick={saveAnimalQuota} disabled={isInsertingQuota}>
                  {isInsertingQuota && (<Spinner />)}
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
