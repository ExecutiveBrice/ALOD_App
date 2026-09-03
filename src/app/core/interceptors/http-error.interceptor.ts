import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpErrorService } from '../services/http-error.service';
import { AuthSessionService } from '../auth/auth-session.service';
import { AUTH_RETRY, SKIP_AUTH, SKIP_AUTH_ERROR_HANDLING } from '../auth/auth-http.context';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorService = inject(HttpErrorService);
  const session = inject(AuthSessionService);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (request.context.get(SKIP_AUTH_ERROR_HANDLING)) {
        return throwError(() => error);
      }

      if (error.status === 401 && !request.context.get(SKIP_AUTH) && !request.context.get(AUTH_RETRY)) {
        return session.refreshAccessToken().pipe(
          catchError(() => {
            session.expireSession(request.urlWithParams);
            void errorService.display(error);
            return throwError(() => error);
          }),
          switchMap((token) => next(request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
            context: request.context.set(AUTH_RETRY, true),
          })).pipe(
            catchError((retryError: HttpErrorResponse) => {
              if (retryError.status === 401) session.expireSession(request.urlWithParams);
              void errorService.display(retryError);
              return throwError(() => retryError);
            }),
          )),
        );
      }

      if (error.status === 401) session.expireSession(request.urlWithParams);
      void errorService.display(error);
      return throwError(() => error);
    }),
  );
};
