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
        <div className='row mb-2 fw-bold'>
          <div className='col-sm-6'></div>
          <div className='col-sm-3'>Valor Anterior</div>
          <div className='col-sm-3'>Valor Actual</div>
        </div>
        {currentSettings &&
          currentSettings.length > 0 &&
          currentSettings.map((setting, index) => (
            <div key={index} className='row mb-3'>
              <div className='col-sm-6'>{setting.generalSettingsLabel}</div>
              <div className='col-sm-3'>{setting.generalSettingsCurrentValue}</div>
              <div className='col-sm-3'>{setting.generalSettingsValue}</div>
            </div>
          ))}
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
      />
    </>
  )
}
export default GeneralSettings
