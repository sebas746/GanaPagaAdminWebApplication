export enum UserRolesEnum {
  Admin = 'Admin',
  Scrutiny = 'Scrutiny',
  Promoter = 'Promoter',
}

export type UserRole = 'Admin' | 'Scrutiny' | 'Promoter'

export type SettingsActions =
  | 'get-general-settings'
  | 'get-general-settings-by-setting-name'
  | 'update-general-settings'
export type RaffleResultActions =
  | 'approve-raffle-result'
  | 'add-raffle-result'
  | 'get-raffle-result'
  | 'update-raffle-result'
export type RaffleScrutinyActions = 'create-scrutiny' | 'view-scrutiny' | 'recalculate-scrutiny'
export type ScrutinySettings =
  | 'get-admin-emails'
  | 'get-admin-email-by-id'
  | 'add-admin-email'
  | 'update-admin-email'
  | 'delete-admin-email'

export type PromoterActions = 'change-promoter' | 'label-promoter'

export type RoleActionPermissions = {
  settings: SettingsActions[]
  raffleResult: RaffleResultActions[]
  raffleScrutiny: RaffleScrutinyActions[]
  scrutinySettings: ScrutinySettings[]
  promoter: PromoterActions[]
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
    raffleScrutiny: ['view-scrutiny', 'recalculate-scrutiny'],
    scrutinySettings: [
      'add-admin-email',
      'delete-admin-email',
      'get-admin-email-by-id',
      'get-admin-emails',
      'update-admin-email',
    ],
    promoter: ['change-promoter'],
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
    promoter: [] as PromoterActions[],
  },
  Promoter: {
    settings: [] as SettingsActions[],
    raffleResult: [] as RaffleResultActions[],
    raffleScrutiny: [] as RaffleScrutinyActions[],
    scrutinySettings: [] as ScrutinySettings[],
    promoter: ['label-promoter'] as PromoterActions[],
  },
}
