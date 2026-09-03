import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpErrorService } from '../services/http-error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorService = inject(HttpErrorService);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      void errorService.display(error);
      return throwError(() => error);
    }),
  );
};
