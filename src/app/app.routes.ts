import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', loadChildren: () => import('./features/auth/login.routes').then((routes) => routes.LOGIN_ROUTES) },
  { path: 'home', canActivate: [authGuard], loadChildren: () => import('./features/home/home.routes').then((routes) => routes.HOME_ROUTES) },
  { path: 'events', canActivate: [authGuard], loadChildren: () => import('./features/events/events.routes').then((routes) => routes.EVENTS_ROUTES) },
  { path: 'attendance', canActivate: [authGuard], loadChildren: () => import('./features/attendance/attendance.routes').then((routes) => routes.ATTENDANCE_ROUTES) },
  { path: 'players', canActivate: [authGuard], loadChildren: () => import('./features/players/players.routes').then((routes) => routes.PLAYERS_ROUTES) },
  { path: 'profile', canActivate: [authGuard], loadChildren: () => import('./features/profile/profile.routes').then((routes) => routes.PROFILE_ROUTES) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
