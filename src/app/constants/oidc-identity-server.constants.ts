export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL, // (string): The URL of the OIDC provider.
  clientId: process.env.REACT_APP_IDENTITY_CLIENT_ID, // (string): Your client application's identifier as registered with the OIDC provider.
  redirectUri: process.env.REACT_APP_REDIRECT_URL, // The URI of your client application to receive a response from the OIDC provider.
  login: process.env.REACT_APP_AUTH_URL + '/login',
  automaticSilentRenew: false, // (boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  loadUserInfo: false, // (boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  logout: process.env.REACT_APP_REDIRECT_URL,
  // silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL, // (string): The URL for the page containing the code handling the silent renew.
  // post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
  // audience: 'https://example.com', // is there a way to specific the audience when making the jwt
  responseType: 'code', // (string, default: 'id_token'): The type of response desired from the OIDC provider.
  grantType: 'client_credentials',
  scope: 'openid profile ganapagawebadmin.read ganapagawebadmin.write offline_access', // (string, default: 'openid'): The scope being requested from the OIDC provider.
  webAuthResponseType: 'code',
}

export const METADATA_OIDC = {
  issuer: process.env.REACT_APP_AUTH_URL,
  jwksUri: process.env.REACT_APP_AUTH_URL + '/.well-known/openid-configuration/jwks',
  authorizationEndpoint: process.env.REACT_APP_AUTH_URL + '/connect/authorize',
  tokenEndpoint: process.env.REACT_APP_AUTH_URL + '/connect/token',
  userinfoEndpoint: process.env.REACT_APP_AUTH_URL + '/connect/userinfo',
  endSessionEndpoint: process.env.REACT_APP_AUTH_URL + '/connect/endsession',
  checkSessionIframe: process.env.REACT_APP_AUTH_URL + '/connect/checksession',
  revocationEndpoint: process.env.REACT_APP_AUTH_URL + '/connect/revocation',
  introspectionEndpoint: process.env.REACT_APP_AUTH_URL + '/connect/introspect',
}
