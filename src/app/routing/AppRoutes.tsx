/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout} from '../modules/auth'
import {App} from '../App'
import {UserProvider} from '../components/User/UserContext'
import {UserRole} from '../../types/UserRoles.types'
import {useJwtToken} from '../hooks/jwtToken.hook'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {getJwtRole} = useJwtToken()
  const role = getJwtRole()
  const userRoles = role ? [role] : null
  if (!userRoles) {
    return null
  }
  return (
    <UserProvider roles={userRoles}>
      <BrowserRouter basename={PUBLIC_URL}>
        <Routes>
          <Route element={<App />}>
            <Route path='error/*' element={<ErrorsPage />} />
            <Route path='logout' element={<Logout />} />
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export {AppRoutes}
