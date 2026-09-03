import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./home.page').then((page) => page.HomePage) },
];
