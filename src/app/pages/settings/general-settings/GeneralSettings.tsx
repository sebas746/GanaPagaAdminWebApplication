import GeneralSettingForm from '../../../components/Forms/GeneralSettingsForm/GeneralSettingForm'
import {useGeneralSettings} from './GeneralSettings.hook'

const GeneralSettings = () => {
  const {generalSettingsState, setGeneralSettingsForm} = useGeneralSettings()
  return (
    <>
      <GeneralSettingForm
        generalSettingsFormState={generalSettingsState.generalSettings.generalSettings}
        setGeneralSettingsForm={setGeneralSettingsForm}
        isLoadingForm={generalSettingsState.isFormLoading}
      ></GeneralSettingForm>
    </>
  )
}
export default GeneralSettings
