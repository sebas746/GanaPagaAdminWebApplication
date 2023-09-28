export interface IUsersResponse {
  firstName: string
  lastName: string
  username: string
  email: string
  roleName?: string
  documentType: string
  documentNumber: string
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
