import React from 'react'
import {Modal, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {IAnimalitosLotterySetting, IAnimalitoUpdateSettings} from '../../../../types/Animalitos.types'
import {FormikProps} from 'formik'

interface IConfirmAnimalitosSettingsProps {
  isShowingModalConfirmation: boolean
  hideModalConfirmation: () => void
  formikVes: FormikProps<IAnimalitosLotterySetting>
  formikUsd: FormikProps<IAnimalitosLotterySetting>
  initialValuesVes: IAnimalitoUpdateSettings
  initialValuesUsd: IAnimalitoUpdateSettings
  submitForm: () => void
}
function ConfirmAnimalitosSettings({
  isShowingModalConfirmation,
  hideModalConfirmation,
  formikVes,
  formikUsd,
  initialValuesVes,
  initialValuesUsd,
  submitForm,
}: IConfirmAnimalitosSettingsProps) {
  return (
    <Modal show={isShowingModalConfirmation} size='lg'>
      <Modal.Header>
        <Modal.Title>Se van a actualizar las siguientes configuraciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={4}>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-300 gy-6'>
                <thead>
                  <tr className='fw-bolder text-gray-800 fs-6 text-uppercase gs-0'>
                    <th>Configuracion en Bolivares</th>
                    <th>Valor Antigüo</th>
                    <th>Valor Nuevo</th>
                  </tr>
                </thead>
                <tbody className='fw-bold text-gray-600'>
                  <tr>
                    <td>Cupo de apuestas</td>
                    <td>{initialValuesVes.maxBetByAnimal}</td>
                    <td>{formikVes.values.maxBetByAnimal}</td>
                  </tr>
                  <tr>
                    <td>Tasa de retorno de la apuesta</td>
                    <td>{initialValuesVes.betReturnedRate}</td>
                    <td>{formikVes.values.betReturnedRate}</td>
                  </tr>
                  <tr>
                    <td>Número máximo de animales por ticket</td>
                    <td>{initialValuesVes.maxAnimalsByTicket}</td>
                    <td>{formikVes.values.maxAnimalsByTicket}</td>
                  </tr>
                  <tr>
                    <td>Apuesta total máxima por ticket</td>
                    <td>{initialValuesVes.maxOverallAnimalitoBet}</td>
                    <td>{formikVes.values.maxOverallAnimalitoBet}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-300 gy-6'>
                <thead>
                  <tr className='fw-bolder text-gray-800 fs-6 text-uppercase gs-0'>
                    <th>Configuracion en Dolares</th>
                    <th>Valor Antigüo</th>
                    <th>Valor Nuevo</th>
                  </tr>
                </thead>
                <tbody className='fw-bold text-gray-600'>
                  <tr>
                    <td>Cupo de apuestas</td>
                    <td>{initialValuesUsd.maxBetByAnimal}</td>
                    <td>{formikUsd.values.maxBetByAnimal}</td>
                  </tr>
                  <tr>
                    <td>Tasa de retorno de la apuesta</td>
                    <td>{initialValuesUsd.betReturnedRate}</td>
                    <td>{formikUsd.values.betReturnedRate}</td>
                  </tr>
                  <tr>
                    <td>Número máximo de animales por ticket</td>
                    <td>{initialValuesUsd.maxAnimalsByTicket}</td>
                    <td>{formikUsd.values.maxAnimalsByTicket}</td>
                  </tr>
                  <tr>
                    <td>Apuesta total máxima por ticket</td>
                    <td>{initialValuesUsd.maxOverallAnimalitoBet}</td>
                    <td>{formikUsd.values.maxOverallAnimalitoBet}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={submitForm}>
          Actualizar
        </Button>
        <Button variant='secondary' onClick={hideModalConfirmation}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ConfirmAnimalitosSettings.propTypes = {}

export default ConfirmAnimalitosSettings
