import { Routes } from '@angular/router';

export const PLAYERS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./players.page').then((page) => page.PlayersPage) },
];
