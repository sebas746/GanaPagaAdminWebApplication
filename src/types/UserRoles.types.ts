export enum UserRolesEnum {
  Admin = 'Admin',
  Scrutiny = 'Scrutiny',
}

export type UserRole = 'Admin' | 'Scrutiny'

export type SettingsActions =
  | 'get-general-settings'
  | 'get-general-settings-by-setting-name'
  | 'update-general-settings'
export type RaffleResultActions =
  | 'approve-raffle-result'
  | 'add-raffle-result'
  | 'get-raffle-result'
  | 'update-raffle-result'
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
    raffleResult: ['get-raffle-result'],
    raffleScrutiny: ['view-scrutiny'],
  },
  Scrutiny: {
    settings: [
      'get-general-settings',
      'get-general-settings-by-setting-name',
      'update-general-settings',
    ],
    raffleResult: [
      'approve-raffle-result',
      'add-raffle-result',
      'get-raffle-result',
      'update-raffle-result',
    ],
    raffleScrutiny: ['create-scrutiny', 'view-scrutiny'],
  },
}
