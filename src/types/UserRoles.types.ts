export enum UserRolesEnum {
  Admin = 'Admin',
  Scrutiny = 'Scrutiny',
  User = 'User',
}

export type UserRole = 'Admin' | 'Scrutiny' | 'User'

export type UserActions = 'create' | 'update' | 'read' | 'delete' | 'index'
export type SettingsActions =
  | 'get-general-settings'
  | 'get-general-settings-by-setting-name'
  | 'update-general-settings'
export type HomeActions = 'create' | 'update' | 'read' | 'delete' | 'index'
export type RaffleResultActions = 'index' | 'view' | 'create' | 'update' | 'approve'

export type RoleActionPermissions = {
  user: UserActions[]
  settings: SettingsActions[]
  home: HomeActions[]
  raffleResult: RaffleResultActions[]
}

export type RolePermissionsMap = {
  [role in UserRole]: RoleActionPermissions
}

export const rolePermissions: RolePermissionsMap = {
  Admin: {
    user: ['create', 'update', 'delete', 'read'],
    settings: [
      'get-general-settings',
      'get-general-settings-by-setting-name',
      'update-general-settings',
    ],
    home: ['index'],
    raffleResult: ['index', 'view'],
  },
  Scrutiny: {
    user: [] as UserActions[],
    settings: [
      'get-general-settings',
      'get-general-settings-by-setting-name',
      'update-general-settings',
    ],
    home: ['index'],
    raffleResult: ['approve', 'create', 'index', 'update', 'view'],
  },
  User: {
    user: [] as UserActions[],
    settings: [] as SettingsActions[],
    raffleResult: [] as RaffleResultActions[],
    home: ['index'],
  },
}
