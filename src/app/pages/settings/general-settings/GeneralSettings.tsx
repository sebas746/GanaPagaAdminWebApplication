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
  } = useGeneralSettings()
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
      />
    </>
  )
}
export default GeneralSettings
