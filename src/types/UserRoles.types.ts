export enum UserRolesEnum {
  Admin = 'Admin',
  Scrutiny = 'Scrutiny',
  User = 'User',
}

export type UserRole = 'Admin' | 'Scrutiny' | 'User'

export type SettingsActions =
  | 'get-general-settings'
  | 'get-general-settings-by-setting-name'
  | 'update-general-settings'
export type RaffleResultActions = 'approve-raffle' | 'add-raffle' | 'get-raffle' | 'update-raffle'
export type RaffleScrutinyActions = 'create-scrutiny' | 'view-scrutiny'

export type RoleActionPermissions = {
  settings: SettingsActions[]
  raffleResult: RaffleResultActions[]
  raffleScrutiny: RaffleScrutinyActions[]
}

export type RolePermissionsMap = {
  [role in UserRole]: RoleActionPermissions
}

export const rolePermissions: RolePermissionsMap = {
  Admin: {
    settings: [
      'get-general-settings',
      'get-general-settings-by-setting-name',
      'update-general-settings',
    ],
    raffleResult: ['get-raffle'],
    raffleScrutiny: ['view-scrutiny'],
  },
  Scrutiny: {
    settings: [
      'get-general-settings',
      'get-general-settings-by-setting-name',
      'update-general-settings',
    ],
    raffleResult: ['approve-raffle', 'add-raffle', 'get-raffle', 'update-raffle'],
    raffleScrutiny: ['create-scrutiny', 'view-scrutiny'],
  },
  User: {
    settings: [] as SettingsActions[],
    raffleResult: [] as RaffleResultActions[],
    raffleScrutiny: [] as RaffleScrutinyActions[],
  },
}