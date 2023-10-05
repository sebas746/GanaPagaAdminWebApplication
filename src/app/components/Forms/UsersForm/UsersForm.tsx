import {Modal, Button, Col, Form, Row} from 'react-bootstrap'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useEffect} from 'react'
import {
  IUsersForm,
  IUsersResponse,
  documentTypeToName,
  roleIdToName,
} from '../../../../types/Users.types'
import {useUsersForm} from './UsersForm.hook'
import StepWizard from 'react-step-wizard'

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
  const {formik, onSubmit, setCurrentStep, handleNext, handlePrevious, handleSubmit, currentStep} =
    useUsersForm(initialValues, submitForm)
  const steps = [
    {
      title: 'Step 1',
      content: () => (
        <div>
          <h2>Step 1</h2>
          <p>This is the content of step 1.</p>
        </div>
      ),
    },
    {
      title: 'Step 2',
      content: () => (
        <div>
          <h2>Step 2</h2>
          <p>This is the content of step 2.</p>
        </div>
      ),
    },
    {
      title: 'Step 3',
      content: () => (
        <div>
          <h2>Step 3</h2>
          <p>This is the content of step 3.</p>
        </div>
      ),
    },
  ]
  return (
    <>
      <StepWizard></StepWizard>
    </>
  )
}

export default UsersForm
