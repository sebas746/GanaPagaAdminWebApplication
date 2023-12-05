import React from 'react'
import {Modal, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {
  IAnimalitosLotteryGeneralSetting,
  IAnimalitoUpdateGeneralSettings,
} from '../../../../types/Animalitos.types'
import {FormikProps} from 'formik'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import {
  mapAnimalitosGeneralSettingsLabel,
  mapAnimalitosSettingsLabel,
} from '../../../constants/settings.constants'
import {useConfirmAnimalitosGeneralSettings} from './ConfirmAnimalitosGeneralSettings.hook'

interface IConfirmAnimalitosGeneralSettingsProps {
  isShowingModalConfirmation: boolean
  hideModalConfirmation: () => void
  formikVes: FormikProps<IAnimalitosLotteryGeneralSetting>
  formikUsd: FormikProps<IAnimalitosLotteryGeneralSetting>
  initialValuesVes: IAnimalitoUpdateGeneralSettings
  initialValuesUsd: IAnimalitoUpdateGeneralSettings
  submitForm: () => void
  isLoading: boolean
}
function ConfirmAnimalitosGeneralSettings({
  isShowingModalConfirmation,
  hideModalConfirmation,
  formikVes,
  formikUsd,
  initialValuesVes,
  initialValuesUsd,
  submitForm,
  isLoading,
}: IConfirmAnimalitosGeneralSettingsProps) {
  const {getAnimalitosGeneralSettingsLabel} = useConfirmAnimalitosGeneralSettings()

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
              {Object.keys(mapAnimalitosGeneralSettingsLabel).map((key) => {
                const displayKey = key as keyof IAnimalitoUpdateGeneralSettings
                if (initialValuesVes[displayKey] === formikVes.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getAnimalitosGeneralSettingsLabel(displayKey)}</td>
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
              {Object.keys(mapAnimalitosGeneralSettingsLabel).map((key) => {
                const displayKey = key as keyof IAnimalitoUpdateGeneralSettings
                if (initialValuesUsd[displayKey] === formikUsd.values[displayKey]) {
                  return null
                }
                return (
                  <tr key={key}>
                    <td>{getAnimalitosGeneralSettingsLabel(displayKey)}</td>
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
      title='Configuración animalitos'
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

ConfirmAnimalitosGeneralSettings.propTypes = {}

export default ConfirmAnimalitosGeneralSettings
