import {UserRole} from '../../../types/UserRoles.types'
import {useRoles} from '../User/UserContext'

export const useProtectedRoute = (requiredRoles: UserRole[] | null) => {
  const roles = useRoles()
  if (!requiredRoles || roles === undefined) {
    return false
  }
  // Check if there's an intersection between user's roles and required roles
  return roles.some((role) => requiredRoles.includes(role))
}
