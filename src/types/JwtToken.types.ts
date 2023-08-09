import {UserRole} from './UserRoles.types'

export interface JwtToken {
  iss: string
  nbf: number
  iat: number
  exp: number
  aud: string[]
  scope: string[]
  amr: string[]
  client_id: string
  sub: string
  auth_time: number
  idp: string
  role: UserRole
  preferred_username: string
  sid: string
  jti: string
}
