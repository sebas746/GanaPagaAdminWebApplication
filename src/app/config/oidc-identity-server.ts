import { IDENTITY_CONFIG } from '../constants/oidc-identity-server.constants';
import { AuthProviderProps, AuthProviderSignOutProps, User } from 'oidc-react';

export const oidcConfig: AuthProviderProps = {
  clientId: 'ganapagaweb.client',
  automaticSilentRenew: false,
  redirectUri: IDENTITY_CONFIG.redirectUri,
  responseType: IDENTITY_CONFIG.responseType,
  scope: IDENTITY_CONFIG.scope,
  authority: IDENTITY_CONFIG.authority,
  onSignIn: (user: User | null) => {
    if (user) {
      console.group('[ LOGIN: SUCCESS ]', user);
    } else {
      console.error('[ LOGIN: ERRNO ]');
    }
    window.location.hash = '';
  },
  onSignOut: (options?: AuthProviderSignOutProps) => {
    window.location.hash = '';
    console.log('[ SignOutOpts ]', options);
  },
};
