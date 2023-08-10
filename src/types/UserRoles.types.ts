export type UserRole = 'Admin' | 'Scrutiny' | 'User'

export enum UserRolesEnum {
  Admin = 'Admin',
  Scrutiny = 'Scrutiny',
  User = 'User',
}

export type RoleActionPermissions = {
  user: ('create' | 'update' | 'read' | 'delete')[]
  settings: ('create' | 'update' | 'read')[]
  home: 'index'[]
}

export type RolePermissionsMap = {
  [role in UserRole]: RoleActionPermissions
}

export const rolePermissions: RolePermissionsMap = {
  Admin: {
    user: ['create', 'update', 'delete', 'read'],
    settings: [],
    home: ['index'],
  },
  Scrutiny: {
    user: [],
    settings: ['create', 'update', 'read'],
    home: ['index'],
  },
  User: {
    user: [],
    settings: [],
    home: ['index'],
  },
}
