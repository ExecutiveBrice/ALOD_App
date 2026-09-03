import { HttpContextToken } from '@angular/common/http';

/** Empêche l'ajout du Bearer token aux appels d'authentification. */
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

/** Évite de rediriger vers login pour un échec volontairement traité (connexion/refresh). */
export const SKIP_AUTH_ERROR_HANDLING = new HttpContextToken<boolean>(() => false);

/** Garantit qu'une requête n'est renouvelée qu'une seule fois après un 401. */
export const AUTH_RETRY = new HttpContextToken<boolean>(() => false);
