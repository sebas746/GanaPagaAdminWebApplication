import {useState} from 'react'
import {Wizard, useWizard} from 'react-use-wizard'
import {IUsersForm, IUsersResponse} from '../../../../../types/Users.types'
import UsersWizardStep1 from './UsersWizardStep1'
import UsersWizardStep2 from './UsersWizardStep2'
import {UsersActions} from '../../../../pages/users-management/users/Users.hook'

interface UsersWizardStep1Props {
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  isLoading: boolean
  action: UsersActions
}

const UsersWizard = ({initialValues, submitForm, isLoading, action}: UsersWizardStep1Props) => {
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
  return (
    <Wizard>
      <UsersWizardStep1
        initialValues={initialValues}
        isLoading={isLoading}
        submitForm={submitForm}
        setCompleteFormData={setCompleteFormData}
        completeFormData={completeFormData}
        action={action}
      />
      <UsersWizardStep2
        initialValues={initialValues}
        isLoading={isLoading}
        submitForm={submitForm}
        setCompleteFormData={setCompleteFormData}
        completeFormData={completeFormData}
        action={action}
      />
    </Wizard>
  )
}

export default UsersWizard
