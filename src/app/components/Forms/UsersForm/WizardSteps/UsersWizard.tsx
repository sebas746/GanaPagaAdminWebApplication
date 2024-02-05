import {Wizard} from 'react-use-wizard'
import UsersWizardStep1 from './UsersWizardStep1'
import UsersWizardStep2 from './UsersWizardStep2'
import {UsersActions} from '../../../../pages/users-management/users/Users.hook'
import {IpaginationUsersResponse} from '../../../../../types/Pagination.types'
import {IUsersResponse} from '../../../../../types/Users.types'

interface UsersWizardStep1Props {
  formik: any
  onSubmit: (nextStep: () => Promise<void>, currentStepSubmit: number) => void
  isLoading: boolean
  action: UsersActions
  setCurrentStep: (currentStep: number) => void
  currentStep: number
  usersPaginated: IpaginationUsersResponse<IUsersResponse>
}

const UsersWizard = ({
  formik,
  onSubmit,
  isLoading,
  action,
  setCurrentStep,
  currentStep,
  usersPaginated,
}: UsersWizardStep1Props) => {
  return (
    <Wizard>
      <UsersWizardStep1
        formik={formik}
        isLoading={isLoading}
        onSubmit={onSubmit}
        action={action}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
      <UsersWizardStep2
        formik={formik}
        isLoading={isLoading}
        onSubmit={onSubmit}
        action={action}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        usersPaginated={usersPaginated}
      />
    </Wizard>
  )
}

export default UsersWizard
