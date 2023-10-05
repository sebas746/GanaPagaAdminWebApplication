export interface IUsersResponse {
  firstName: string
  lastName: string
  username: string
  email: string
  roleName: RoleNames
  documentType: string
  documentNumber: string
  password?: string
  passwordConfirm?: string
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
}

type RoleNames = 'Scrutiny' | 'Seller'

export const roleTranslations: Record<RoleNames, string> = {
  Scrutiny: 'Escrutinio',
  Seller: 'Vendedor',
}

export type RoleIds = 1 | 2
export const roleIdToName: Record<RoleIds, RoleNames> = {
  1: 'Scrutiny',
  2: 'Seller',
}

export type documentTypeNames = 'CC' | 'CE' | 'PA'
export const documentTypeToName: Record<documentTypeNames, string> = {
  CC: 'Cédula de ciudadanía',
  CE: 'Cédula de extranjería',
  PA: 'Pasaporte',
}
