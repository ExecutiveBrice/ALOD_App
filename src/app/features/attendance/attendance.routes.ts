import { Routes } from '@angular/router';

export const ATTENDANCE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./attendance.page').then((page) => page.AttendancePage) },
];
