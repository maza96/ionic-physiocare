import { Routes } from '@angular/router';
import { logoutActivateGuard } from './guards/logout-activate.guard';
import { loginActivateGuard } from './guards/login-activate.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [logoutActivateGuard],
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.routes').then((m) => m.patientsRoutes),
    canActivate: [loginActivateGuard]
  },
  {
    path: 'physios',
    loadChildren: () =>
      import('./physios/physios.routes').then((m) => m.physiosRoutes),
  canActivate: [loginActivateGuard]
  },
  {
    path: 'person-info',
    loadComponent: () => import('./patients/patient-detail/person-info/person-info.page').then( m => m.PersonInfoPage)
  },
];
