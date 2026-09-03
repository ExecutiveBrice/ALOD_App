import { Routes } from '@angular/router';

export const EVENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./events.page').then((page) => page.EventsPage) },
];
