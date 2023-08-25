import React from 'react'
import {Modal, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {FormikProps} from 'formik'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import {mapChanceZodiacSettingsLabel} from '../../../constants/settings.constants'
import {useConfirmChanceZodiacSettings} from './ConfirmChanceZodiacSettings.hook'
import {
  IChanceZodiacLotterySetting,
  IChanceZodiacUpdateSettings,
} from '../../../../types/ChanceZodiac.types'

interface IConfirmChanceZodiacSettingsProps {
  isShowingModalConfirmation: boolean
  hideModalConfirmation: () => void
  formikVes: FormikProps<IChanceZodiacLotterySetting>
  formikUsd: FormikProps<IChanceZodiacLotterySetting>
  initialValuesVes: IChanceZodiacUpdateSettings
  initialValuesUsd: IChanceZodiacUpdateSettings
  submitForm: () => void
  isLoading: boolean
}
function ConfirmChanceZodiacSettings({
  isShowingModalConfirmation,
  hideModalConfirmation,
  formikVes,
  formikUsd,
  initialValuesVes,
  initialValuesUsd,
  submitForm,
  isLoading,
}: IConfirmChanceZodiacSettingsProps) {
  const {getChanceZodiacSettingsLabel} = useConfirmChanceZodiacSettings()

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
              {Object.keys(mapChanceZodiacSettingsLabel).map((key) => {
                const displayKey = key as keyof IChanceZodiacUpdateSettings
                if (initialValuesVes[displayKey] === formikVes.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getChanceZodiacSettingsLabel(displayKey)}</td>
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
              {Object.keys(mapChanceZodiacSettingsLabel).map((key) => {
                const displayKey = key as keyof IChanceZodiacUpdateSettings
                if (initialValuesUsd[displayKey] === formikUsd.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getChanceZodiacSettingsLabel(displayKey)}</td>
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
      title='Configuración chance zodiacal'
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

ConfirmChanceZodiacSettings.propTypes = {}

export default ConfirmChanceZodiacSettings
