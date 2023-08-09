import {UserRole} from '../../types/UserRoles.types'
import {useRoles} from '../components/User/UserContext'

export const useProtectedRoute = (requiredRole: UserRole) => {
  const roles = useRoles()
  return roles.includes(requiredRole)
}
