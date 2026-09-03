import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.routes').then((routes) => routes.HOME_ROUTES) },
  { path: 'events', loadChildren: () => import('./features/events/events.routes').then((routes) => routes.EVENTS_ROUTES) },
  { path: 'attendance', loadChildren: () => import('./features/attendance/attendance.routes').then((routes) => routes.ATTENDANCE_ROUTES) },
  { path: 'players', loadChildren: () => import('./features/players/players.routes').then((routes) => routes.PLAYERS_ROUTES) },
  { path: 'profile', loadChildren: () => import('./features/profile/profile.routes').then((routes) => routes.PROFILE_ROUTES) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
