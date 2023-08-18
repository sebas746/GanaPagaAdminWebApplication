import {RoleActionPermissions} from '../../../types/UserRoles.types'
import {usePermissions} from '../User/UserContext'

export type Resource = keyof RoleActionPermissions

export const useHasPermission = <T extends Resource>(
  resource: T,
  actions: RoleActionPermissions[T]
): boolean => {
  const permissions = usePermissions()

  const resourceActions = permissions[resource] as RoleActionPermissions[T]

  if (!resourceActions || resourceActions.length === 0) return false

  const results = actions.map((action) => (resourceActions as string[]).includes(action))

  return results.every((res) => res)
}
