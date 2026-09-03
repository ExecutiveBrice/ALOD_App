import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { environment } from '../environments/environment';
import { provideApi } from './api/provide-api';
import { appRoutes } from './app.routes';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthSessionService } from './core/auth/auth-session.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideIonicAngular(),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor, httpErrorInterceptor])),
    provideAppInitializer(() => inject(AuthSessionService).restoreSession()),
    provideApi({ basePath: environment.apiUrl }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
