import { CanActivateFn } from '@angular/router';

/** À relier à l’API d’authentification lorsque son contrat est connu. */
export const authGuard: CanActivateFn = () => true;
