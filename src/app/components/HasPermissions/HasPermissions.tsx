import React from 'react'
import {Resource, useHasPermission} from './HasPermissions.hook'
import {RoleActionPermissions} from '../../../types/UserRoles.types'

type HasPermissionProps = {
  resource: Resource
  actions: RoleActionPermissions[Resource]
  children: React.ReactNode
}

const HasPermission: React.FC<HasPermissionProps> = ({resource, actions, children}) => {
  const hasPermission = useHasPermission(resource, actions)

  return hasPermission ? <>{children}</> : null
}

export default HasPermission
