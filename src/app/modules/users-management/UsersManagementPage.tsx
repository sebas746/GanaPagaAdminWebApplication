import {Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import Users from '../../pages/users-management/users/Users'

const usersManagementBreadCrumbs: Array<PageLink> = [
  {
    title: 'Gestión Usuarios',
    path: '/pages/users-management/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

function UsersManagementPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <PageTitle breadcrumbs={usersManagementBreadCrumbs}>Gestión de Usuarios</PageTitle>
              <Users />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default UsersManagementPage
