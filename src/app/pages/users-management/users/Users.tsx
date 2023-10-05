import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import UsersForm from '../../../components/Forms/UsersForm/UsersForm'
import UsersTable from '../../../components/Tables/UsersTable/UsersTable'
import {useUsers} from './Users.hook'

const Users = () => {
  const {
    usersState,
    isLoading,
    setEmail,
    handleFilterChange,
    setTempFilters,
    setUsersParams,
    tempFilters,
    resetFilters,
    setShowFormModal,
    showFormModal,
    isFormLoading,
    handleClickForm,
  } = useUsers()

  return (
    <>
      <UsersTable
        usersPaginated={usersState.usersPaginated}
        setEmail={setEmail}
        params={usersState.params}
        handleFilterChange={handleFilterChange}
        isLoading={isLoading}
        setTempFilters={setTempFilters}
        setUsersParams={setUsersParams}
        tempFilters={tempFilters}
        resetFilters={resetFilters}
      />
      {usersState.currentUser && (
        <UsersForm
          initialValues={usersState.currentUser}
          setShowFormModal={setShowFormModal}
          showFormModal={showFormModal}
          isLoading={isFormLoading}
          submitForm={handleClickForm}
        />
      )}
    </>
  )
}

export default Users
