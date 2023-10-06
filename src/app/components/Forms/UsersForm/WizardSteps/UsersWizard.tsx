import {useState} from 'react'
import {Wizard, useWizard} from 'react-use-wizard'
import {IUsersForm, IUsersResponse} from '../../../../../types/Users.types'
import UsersWizardStep1 from './UsersWizardStep1'
import UsersWizardStep2 from './UsersWizardStep2'

interface UsersWizardStep1Props {
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  isLoading: boolean
}

const UsersWizard = ({initialValues, submitForm, isLoading}: UsersWizardStep1Props) => {
  const [completeFormData, setCompleteFormData] = useState<IUsersForm>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    documentType: '',
    documentNumber: '',
    email: '',
    password: '',
    rolId: 0,
  })
  return (
    <Wizard>
      <UsersWizardStep1
        initialValues={initialValues}
        isLoading={isLoading}
        submitForm={submitForm}
        setCompleteFormData={setCompleteFormData}
        completeFormData={completeFormData}
      />
      <UsersWizardStep2
        initialValues={initialValues}
        isLoading={isLoading}
        submitForm={submitForm}
        setCompleteFormData={setCompleteFormData}
        completeFormData={completeFormData}
      />
    </Wizard>
  )
}

export default UsersWizard
