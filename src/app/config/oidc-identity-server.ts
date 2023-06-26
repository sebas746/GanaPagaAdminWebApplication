import {IDENTITY_CONFIG} from '../constants/oidc-identity-server.constants'
import {AuthProviderProps, AuthProviderSignOutProps, User} from 'oidc-react'
import {setToken} from '../helpers/localstorage.helper'

export const oidcConfig: AuthProviderProps = {
  clientId: 'ganapagawebadmin.client',
  automaticSilentRenew: false,
  redirectUri: IDENTITY_CONFIG.redirectUri,
  responseType: IDENTITY_CONFIG.responseType,
  scope: IDENTITY_CONFIG.scope,
  authority: IDENTITY_CONFIG.authority,
  onSignIn: (user: User | null) => {
    if (user) {
      setToken(user.access_token)
      console.group('[ LOGIN: SUCCESS ]', user)
    } else {
      console.error('[ LOGIN: ERRNO ]')
    }

    window.location.hash = ''
  },
  onSignOut: (options?: AuthProviderSignOutProps) => {
    window.location.hash = ''
    console.log('[ SignOutOpts ]', options)
  },
}
