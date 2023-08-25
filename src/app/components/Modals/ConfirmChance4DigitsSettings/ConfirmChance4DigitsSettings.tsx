import React from 'react'
import {Modal, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {FormikProps} from 'formik'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import {mapChance4DigitsSettingsLabel} from '../../../constants/settings.constants'
import {useConfirmChance4DigitsSettings} from './ConfirmChance4DigitsSettings.hook'
import {
  IChance4DigitsLotterySetting,
  IChance4DigitsUpdateSettings,
} from '../../../../types/Chance4Digits.types'

interface IConfirmChance4DigitsSettingsProps {
  isShowingModalConfirmation: boolean
  hideModalConfirmation: () => void
  formikVes: FormikProps<IChance4DigitsLotterySetting>
  formikUsd: FormikProps<IChance4DigitsLotterySetting>
  initialValuesVes: IChance4DigitsUpdateSettings
  initialValuesUsd: IChance4DigitsUpdateSettings
  submitForm: () => void
  isLoading: boolean
}
function ConfirmChance4DigitsSettings({
  isShowingModalConfirmation,
  hideModalConfirmation,
  formikVes,
  formikUsd,
  initialValuesVes,
  initialValuesUsd,
  submitForm,
  isLoading,
}: IConfirmChance4DigitsSettingsProps) {
  const {getChance4DigitsSettingsLabel} = useConfirmChance4DigitsSettings()

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
              {Object.keys(mapChance4DigitsSettingsLabel).map((key) => {
                const displayKey = key as keyof IChance4DigitsUpdateSettings
                if (initialValuesVes[displayKey] === formikVes.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getChance4DigitsSettingsLabel(displayKey)}</td>
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
              {Object.keys(mapChance4DigitsSettingsLabel).map((key) => {
                const displayKey = key as keyof IChance4DigitsUpdateSettings
                if (initialValuesUsd[displayKey] === formikUsd.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getChance4DigitsSettingsLabel(displayKey)}</td>
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
      title='Configuración chance 4 cifras'
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

ConfirmChance4DigitsSettings.propTypes = {}

export default ConfirmChance4DigitsSettings
