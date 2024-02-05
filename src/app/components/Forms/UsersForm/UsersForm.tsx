import {Modal, Button} from 'react-bootstrap'
import {IUsersForm, IUsersResponse} from '../../../../types/Users.types'
import {UsersActions} from '../../../pages/users-management/users/Users.hook'
import {useState} from 'react'
import {useUsersWizardSteps} from './WizardSteps/UsersWizardSteps.hook'
import UsersWizard from './WizardSteps/UsersWizard'
import {IpaginationUsersResponse} from '../../../../types/Pagination.types'

interface UsersFormProps {
  isLoading: boolean
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  showFormModal: boolean
  setShowFormModal: (show: boolean) => void
  action: UsersActions
  usersPaginated: IpaginationUsersResponse<IUsersResponse>
}

const UsersForm = ({
  isLoading,
  initialValues,
  submitForm,
  showFormModal,
  setShowFormModal,
  action,
  usersPaginated,
}: UsersFormProps) => {
  const [completeFormData, setCompleteFormData] = useState<IUsersForm>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    documentType: '',
    documentNumber: '',
    email: '',
    password: '',
    rolId: 0,
    isActive: true,
  })
  const [currentStep, setCurrentStep] = useState<number>(0)
  const {formik, onSubmit} = useUsersWizardSteps(
    initialValues,
    submitForm,
    setCompleteFormData,
    completeFormData,
    action,
    setCurrentStep,
    currentStep
  )
  return (
    <>
      <div className='static-modal'>
        <Modal
          animation={false}
          show={showFormModal}
          onHide={() => setShowFormModal(false)}
          size='lg' // Changed from lg to md for a more compact modal
        >
          <Modal.Header>
            <Modal.Title>{'Usuarios'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UsersWizard
              formik={formik}
              action={action}
              isLoading={isLoading}
              onSubmit={onSubmit}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              usersPaginated={usersPaginated}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowFormModal(false)}>
              {'Cerrar'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default UsersForm
