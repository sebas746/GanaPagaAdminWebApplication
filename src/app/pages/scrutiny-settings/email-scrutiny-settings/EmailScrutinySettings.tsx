import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import EmailScrutinySettingsForm from '../../../components/Forms/EmailScrutinySettingsForm/EmailScrutinySettingsForm'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import EmailScrutinySettingsTable from '../../../components/Tables/ScrutinySettings/EmailScrutinySettingsTable'
import {useEmailScrutinySettings} from './EmailScrutinySettings.hook'

const EmailScrutinySettings = () => {
  const {
    emailScrutinySettingsState,
    isLoading,
    isDeleting,
    setEmailId,
    showDeleteModal,
    handleDeleteConfirmation,
    setShowDeleteModal,
    handleClickForm,
    isSaving,
    setShowFormModal,
    showFormModal,
  } = useEmailScrutinySettings()
  return (
    <>
      {!isLoading && emailScrutinySettingsState.scrutinyEmailSettings && (
        <EmailScrutinySettingsTable
          emailScrutinySettings={emailScrutinySettingsState.scrutinyEmailSettings}
          isDeleting={isDeleting}
          setEmailId={setEmailId}
        />
      )}
      <div className='mb-10'>{isLoading && <RenderLoader show={true} huge={true} />}</div>
      <ConfirmDialog
        text={`Está seguro que desea eliminar el correo ${emailScrutinySettingsState.email}?`}
        show={showDeleteModal}
        title='Confirmación eliminación correo'
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirmation}
        onHide={() => setShowDeleteModal(false)}
        size='lg'
      />
      {emailScrutinySettingsState.scrutinyEmailSetting && (
        <EmailScrutinySettingsForm
          initialValues={emailScrutinySettingsState.scrutinyEmailSetting}
          submitForm={handleClickForm}
          isLoading={isSaving}
          showFormModal={showFormModal}
          setShowFormModal={setShowFormModal}
        />
      )}
    </>
  )
}

export default EmailScrutinySettings
