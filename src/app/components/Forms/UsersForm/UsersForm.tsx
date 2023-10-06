import {Modal, Button, Col, Form, Row} from 'react-bootstrap'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useEffect} from 'react'
import {
  IUsersForm,
  IUsersResponse,
  documentTypeToName,
  roleIdToName,
} from '../../../../types/Users.types'
import UsersWizardStep1 from './WizardSteps/UsersWizardStep1'
import UsersWizardStep2 from './WizardSteps/UsersWizardStep2'
import UsersWizard from './WizardSteps/UsersWizard'
import {useWizard} from 'react-use-wizard'

interface UsersFormProps {
  isLoading: boolean
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  showFormModal: boolean
  setShowFormModal: (show: boolean) => void
}

const UsersForm = ({
  isLoading,
  initialValues,
  submitForm,
  showFormModal,
  setShowFormModal,
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
