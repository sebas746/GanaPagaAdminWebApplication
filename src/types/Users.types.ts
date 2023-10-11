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
}

export interface UsersQueryParams {
  baseUrl: string
  pageIndex: number
  pageSize: number
  email?: string
  name?: string
  documentNumber?: string
  roleName?: string
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
}

export interface IUsersPasswordForm {
  email: string
  password: string
  newPassword: string
}

type RoleNames = 'Scrutiny' | 'Seller'

export const roleTranslations: Record<RoleNames, string> = {
  Scrutiny: 'Escrutinio',
  Seller: 'Vendedor',
}

export type RoleIds = '2' | '3'
export const roleIdToName: Record<RoleIds, RoleNames> = {
  '2': 'Seller',
  '3': 'Scrutiny',
}

export type documentTypeNames = 'CC' | 'CE' | 'PA'
export const documentTypeToName: Record<documentTypeNames, string> = {
  CC: 'Cédula de ciudadanía',
  CE: 'Cédula de extranjería',
  PA: 'Pasaporte',
}
