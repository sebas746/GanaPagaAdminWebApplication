import {Modal, Button} from 'react-bootstrap'
import {IUsersForm, IUsersResponse} from '../../../../types/Users.types'
import UsersWizard from './WizardSteps/UsersWizard'
import {UsersActions} from '../../../pages/users-management/users/Users.hook'

interface UsersFormProps {
  isLoading: boolean
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  showFormModal: boolean
  setShowFormModal: (show: boolean) => void
  action: UsersActions
}

const UsersForm = ({
  isLoading,
  initialValues,
  submitForm,
  showFormModal,
  setShowFormModal,
  action,
}: UsersFormProps) => {
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
              initialValues={initialValues}
              submitForm={submitForm}
              isLoading={isLoading}
              action={action}
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
