import {RoleActionPermissions, UserRole} from '../../types/UserRoles.types'
import {usePermissions, useRoles} from '../components/User/UserContext'

export type Resource = keyof RoleActionPermissions

export const useProtectedRoute = (requiredRole: UserRole) => {
  const roles = useRoles()
  return roles.includes(requiredRole)
}

export const useHasPermission = <T extends Resource>(
  resource: T,
  action: RoleActionPermissions[T][number]
): boolean => {
  const permissions = usePermissions()

  // Use a type assertion to specify the exact type of actions.
  const resourceActions = permissions[resource] as RoleActionPermissions[T]
  if (!resourceActions) return false

  // Now TypeScript should understand the type of array it's working with.
  console.log(resourceActions)
  return false
  //return resourceActions.includes(action)
}
