import React from 'react'
import {Modal, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {
  IAnimalitosLotterySetting,
  IAnimalitoUpdateSettings,
} from '../../../../types/Animalitos.types'
import {FormikProps} from 'formik'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import {
  mapAnimalitosSettingsLabel,
  mapChance3DigitsSettingsLabel,
} from '../../../constants/settings.constants'
import {useConfirmChance3DigitsSettings} from './ConfirmChance3DigitsSettings.hook'
import {
  IChance3DigitsLotterySetting,
  IChance3DigitsUpdateSettings,
} from '../../../../types/Chance3Digits.types'

interface IConfirmChance3DigitsSettingsProps {
  isShowingModalConfirmation: boolean
  hideModalConfirmation: () => void
  formikVes: FormikProps<IChance3DigitsLotterySetting>
  formikUsd: FormikProps<IChance3DigitsLotterySetting>
  initialValuesVes: IChance3DigitsUpdateSettings
  initialValuesUsd: IChance3DigitsUpdateSettings
  submitForm: () => void
  isLoading: boolean
}
function ConfirmChance3DigitsSettings({
  isShowingModalConfirmation,
  hideModalConfirmation,
  formikVes,
  formikUsd,
  initialValuesVes,
  initialValuesUsd,
  submitForm,
  isLoading,
}: IConfirmChance3DigitsSettingsProps) {
  const {getChance3DigitsSettingsLabel} = useConfirmChance3DigitsSettings()

  const renderCurrentData = (
    <Stack direction='vertical' gap={4}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 gy-6'>
            <thead>
              <tr className='fw-bolder text-gray-800 fs-6 text-uppercase gs-0'>
                <th>Configuracion en Bolívares</th>
                <th>Valor Actual</th>
                <th>Nuevo Valor</th>
              </tr>
            </thead>
            <tbody className='fw-bold text-gray-600'>
              {Object.keys(mapChance3DigitsSettingsLabel).map((key) => {
                const displayKey = key as keyof IChance3DigitsUpdateSettings
                if (initialValuesVes[displayKey] === formikVes.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getChance3DigitsSettingsLabel(displayKey)}</td>
                    <td>{initialValuesVes[displayKey]}</td>
                    <td>{formikVes.values[displayKey]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 gy-6'>
            <thead>
              <tr className='fw-bolder text-gray-800 fs-6 text-uppercase gs-0'>
                <th>Configuracion en Dólares</th>
                <th>Valor Actual</th>
                <th>Nuevo Valor</th>
              </tr>
            </thead>
            <tbody className='fw-bold text-gray-600'>
              {Object.keys(mapChance3DigitsSettingsLabel).map((key) => {
                const displayKey = key as keyof IChance3DigitsUpdateSettings
                if (initialValuesUsd[displayKey] === formikUsd.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getChance3DigitsSettingsLabel(displayKey)}</td>
                    <td>{initialValuesUsd[displayKey]}</td>
                    <td>{formikUsd.values[displayKey]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Stack>
  )
  return (
    <ConfirmDialog
      title='Configuración chance 3 cifras'
      text='Está seguro que desea guardar la configuración?'
      show={isShowingModalConfirmation}
      onHide={() => hideModalConfirmation()}
      onConfirm={() => submitForm()}
      isLoading={isLoading}
      values={renderCurrentData}
      size='lg'
    />
  )
}

ConfirmChance3DigitsSettings.propTypes = {}

export default ConfirmChance3DigitsSettings
