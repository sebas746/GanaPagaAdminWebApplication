import React, {createContext, useContext} from 'react'
import {RoleActionPermissions, UserRole, rolePermissions} from '../../../types/UserRoles.types'

interface UserContextValue {
  roles: UserRole[]
  permissions: RoleActionPermissions
}

interface UserProviderProps {
  roles: UserRole[]
  children?: React.ReactNode
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const useRoles = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useRoles must be used within a UserProvider')
  }
  return context.roles
}

export const usePermissions = (): RoleActionPermissions => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('usePermissions must be used within a UserProvider')
  }
  return context.permissions
}

export const UserProvider: React.FC<UserProviderProps> = ({roles, children}) => {
  const permissions = rolePermissions[roles[0]] // Assuming one role per user for simplicity.

  return <UserContext.Provider value={{roles, permissions}}>{children}</UserContext.Provider>
}
