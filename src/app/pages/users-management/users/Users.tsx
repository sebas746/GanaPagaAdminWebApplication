import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import UsersTable from '../../../components/Tables/UsersTable/UsersTable'
import {useUsers} from './Users.hook'

const Users = () => {
  const {usersState, isLoading, setEmail, handleFilterChange} = useUsers()

  return (
    <>
      <RenderLoader show={isLoading} huge={true} />
      {!isLoading && usersState.usersPaginated && usersState.usersPaginated.totalCount > 0 && (
        <UsersTable
          usersPaginated={usersState.usersPaginated}
          setEmail={setEmail}
          params={usersState.params}
          handleFilterChange={handleFilterChange}
        />
      )}
    </>
  )
}

export default Users
