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
export type ScrutinySettings =
  | 'get-admin-emails'
  | 'get-admin-email-by-id'
  | 'add-admin-email'
  | 'update-admin-email'
  | 'delete-admin-email'

export type RoleActionPermissions = {
  settings: SettingsActions[]
  raffleResult: RaffleResultActions[]
  raffleScrutiny: RaffleScrutinyActions[]
  scrutinySettings: ScrutinySettings[]
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
    scrutinySettings: [
      'add-admin-email',
      'delete-admin-email',
      'get-admin-email-by-id',
      'get-admin-emails',
      'update-admin-email',
    ],
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
    scrutinySettings: [] as ScrutinySettings[],
  },
}
