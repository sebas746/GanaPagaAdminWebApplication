export enum UserRolesEnum {
  Admin = 'Admin',
  Scrutiny = 'Scrutiny',
  Promoter = 'Promoter',
}

export type UserRole = 'Admin' | 'Scrutiny' | 'Promoter'

export type DashboardActions = 'dashboard'
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
export type ReportsActions = 'game-type-report'

export type PromoterActions = 'change-promoter' | 'label-promoter'

export type RoleActionPermissions = {
  dashboard: DashboardActions[]
  settings: SettingsActions[]
  raffleResult: RaffleResultActions[]
  raffleScrutiny: RaffleScrutinyActions[]
  scrutinySettings: ScrutinySettings[]
  promoter: PromoterActions[]
  reports: ReportsActions[]
}

export type RolePermissionsMap = {
  [role in UserRole]: RoleActionPermissions
}

export const rolePermissions: RolePermissionsMap = {
  Admin: {
    dashboard: ['dashboard'],
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
    reports: ['game-type-report'],
  },
  Scrutiny: {
    dashboard: [] as DashboardActions[],
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
    reports: [] as ReportsActions[],
  },
  Promoter: {
    dashboard: ['dashboard'],
    settings: [] as SettingsActions[],
    raffleResult: [] as RaffleResultActions[],
    raffleScrutiny: [] as RaffleScrutinyActions[],
    scrutinySettings: [] as ScrutinySettings[],
    promoter: ['label-promoter'] as PromoterActions[],
    reports: ['game-type-report'],
  },
}
