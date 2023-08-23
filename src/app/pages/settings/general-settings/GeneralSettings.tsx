import {Stack} from 'react-bootstrap'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import GeneralSettingForm from '../../../components/Forms/GeneralSettingsForm/GeneralSettingForm'
import {useGeneralSettings} from './GeneralSettings.hook'

const GeneralSettings = () => {
  const {
    generalSettingsState,
    setGeneralSettingsForm,
    submitIsLoading,
    isLoading,
    setShowModal,
    onConfirmSettingsUpdate,
    showModal,
    currentSettings,
  } = useGeneralSettings()
  const renderCurrentData = () => {
    return (
      <>
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
                  {currentSettings &&
                    currentSettings.length > 0 &&
                    currentSettings.map((setting, index) => (
                      <tr>
                        <td>{setting.generalSettingsLabel}</td>
                        <td>{setting.generalSettingsCurrentValue}</td>
                        <td>{setting.generalSettingsValue}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Stack>
      </>
    )
  }
  return (
    <>
      <GeneralSettingForm
        generalSettingsFormState={generalSettingsState.generalSettings.generalSettings}
        setGeneralSettingsForm={setGeneralSettingsForm}
        isLoadingForm={isLoading}
        submitIsLoading={submitIsLoading}
      />
      <ConfirmDialog
        title='Configuración general'
        text='Está seguro que desea guardar la configuración?'
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={() => onConfirmSettingsUpdate()}
        isLoading={submitIsLoading}
        values={renderCurrentData}
        size='lg'
      />
    </>
  )
}
export default GeneralSettings
