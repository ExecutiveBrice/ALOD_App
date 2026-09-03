// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import type { AuthBackendConfig } from '../app/core/auth/auth.config';

export const environment = {
  production: false,
  /** Adresse de votre API REST de développement, sans slash final. */
  apiUrl: 'http://localhost:8000',
  /**
   * Le login suit le Swagger (`POST /auth/signin`).
   * Les champs de réponse sont configurables car le Swagger les déclare comme un objet libre.
   */
  auth: {
    loginPath: '/auth/signin',
    // Le Swagger actuel ne décrit pas d'endpoint de renouvellement.
    refreshPath: undefined,
    usernameField: 'username',
    passwordField: 'password',
    accessTokenField: 'token',
    refreshTokenField: 'refreshToken',
    refreshRequestField: 'refreshToken',
  } satisfies AuthBackendConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
