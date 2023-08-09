export type UserRole = 'Admin' | 'Scrutiny' | 'User'

export type RoleActionPermissions = {
  user: ('create' | 'update' | 'delete')[]
  settings: ('create' | 'update')[]
  // ... other domains
}

export type RolePermissionsMap = {
  [role in UserRole]: RoleActionPermissions
}

export const rolePermissions: RolePermissionsMap = {
  Admin: {
    user: ['create', 'update', 'delete'],
    settings: ['create', 'update'],
    // ... other domains
  },
  Scrutiny: {
    user: ['create', 'update', 'delete'],
    settings: ['create', 'update'],
    // ... other domains
  },
  User: {
    user: ['create', 'update', 'delete'],
    settings: ['create', 'update'],
    // ... other domains
  },
  // ... other roles (make sure to define the permissions for each role)
}
