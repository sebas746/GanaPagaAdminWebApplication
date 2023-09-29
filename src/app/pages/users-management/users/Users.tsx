import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import UsersTable from '../../../components/Tables/UsersTable/UsersTable'
import {useUsers} from './Users.hook'

const Users = () => {
  const {usersState, isLoading, setEmail, handleFilterChange} = useUsers()

  return (
    <>
      <UsersTable
        usersPaginated={usersState.usersPaginated}
        setEmail={setEmail}
        params={usersState.params}
        handleFilterChange={handleFilterChange}
        isLoading={isLoading}
      />
    </>
  )
}

export default Users
