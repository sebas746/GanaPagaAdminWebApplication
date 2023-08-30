import jwtDecode from 'jwt-decode'
import {useAuth} from 'oidc-react'
import {JwtToken} from '../../types/JwtToken.types'
import {UserRole} from '../../types/UserRoles.types'

export const useJwtToken = () => {
  const auth = useAuth()

  const getJwtRole = (): UserRole | null => {
    if (auth.userData?.access_token) {
      var decoded: JwtToken = jwtDecode(auth.userData?.access_token)
      if (decoded !== undefined) {
        return decoded.role
      }
    }
    return null
  }

  const getJwtDecoded = (): JwtToken | undefined => {
    if (auth.userData?.access_token) {
      var decoded: JwtToken = jwtDecode(auth.userData?.access_token)
      if (decoded !== undefined) {
        return decoded
      }
    }
  }

  return {getJwtRole, getJwtDecoded}
}
