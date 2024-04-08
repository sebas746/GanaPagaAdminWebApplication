export interface IUsersResponse {
  firstName: string
  lastName: string
  username: string
  email: string
  rolId: number
  roleName: RoleNames
  documentType: string
  documentNumber: string
  password?: string
  passwordConfirm?: string
  isActive: boolean
  description?: string
  promoterId?: number
}

export interface UsersQueryParams {
  baseUrl: string
  pageIndex: number
  pageSize: number
  email?: string
  name?: string
  documentNumber?: string
  roleName?: string
  promoterId?: string
  [key: string]: any
}

export interface IUsersForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  rolId: number
  documentType: string
  documentNumber: string
  isActive: boolean
  description?: string
  promoterId?: number
  promoterFile?: Blob
}

export interface IUsersPasswordForm {
  email: string
  password: string
  newPassword: string
}

export type RoleNames = 'Scrutiny' | 'Seller' | 'Promoter'

export const roleTranslations: Record<RoleNames, string> = {
  Scrutiny: 'Escrutinio',
  Seller: 'Vendedor',
  Promoter: 'Promotor'
}

export enum RolesEnum {
  'Seller' = '2',
  'Scrutiny' = '3',
  'Promoter' = '4'
}

export type RoleIds = '2' | '3' | '4'
export const roleIdToName: Record<RoleIds, RoleNames> = {
  '2': 'Seller',
  '3': 'Scrutiny',
  '4': 'Promoter'
}

export type documentTypeNames = 'CC' | 'CE' | 'PA'
export const documentTypeToName: Record<documentTypeNames, string> = {
  CC: 'Cédula de ciudadanía',
  CE: 'Cédula de extranjería',
  PA: 'Pasaporte',
}
