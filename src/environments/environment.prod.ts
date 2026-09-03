import type { AuthBackendConfig } from '../app/core/auth/auth.config';

export const environment = {
  production: true,
  /** À remplacer par l’URL publique de votre API REST. */
  apiUrl: 'https://api.example.com',
  auth: {
    loginPath: '/auth/signin',
    // À renseigner seulement lorsque le backend expose le renouvellement.
    refreshPath: undefined,
    usernameField: 'username',
    passwordField: 'password',
    accessTokenField: 'token',
    refreshTokenField: 'refreshToken',
    refreshRequestField: 'refreshToken',
  } satisfies AuthBackendConfig,
};
