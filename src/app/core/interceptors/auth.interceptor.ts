import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthSessionService } from '../auth/auth-session.service';
import { SKIP_AUTH } from '../auth/auth-http.context';

/** Ajoute le jeton uniquement aux appels de l'API ALOD. */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(AuthSessionService);
  const token = session.accessToken();

  if (
    request.context.get(SKIP_AUTH)
    || !token
    || request.headers.has('Authorization')
    || !isApiRequest(request.url)
  ) {
    return next(request);
  }

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};

function isApiRequest(url: string): boolean {
  return url.startsWith(environment.apiUrl);
}
