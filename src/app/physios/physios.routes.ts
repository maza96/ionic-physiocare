import { Routes } from '@angular/router';
import { rolGuard } from '../guards/rol.guard';

export const physiosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./physios-page/physios-page.page').then(
      m => m.PhysiosPagePage
    ),
  },
  {
    path: 'add',
    loadComponent: () => import('./physios-form/physios-form.page').then(
      m => m.PhysiosFormPage
    ),
    canActivate: [rolGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./physios-info/physios-info.page').then(
      m => m.PhysiosInfoPage
    ),
  }
];
