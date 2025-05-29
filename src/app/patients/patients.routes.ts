import { Routes } from '@angular/router';
import { rolGuard } from '../guards/rol.guard';

export const patientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./patients-page/patients-page.page').then(
        m => m.PatientsPagePage
    ),
  },
  {
    path: 'add',
    loadComponent: () => import('./patients-form/patients-form.page').then(
        m => m.PatientsFormPage
    ),
    canActivate: [rolGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./patient-detail/patient-detail.page').then(
        m => m.PatientDetailPage
    ),
    loadChildren: () => import('./patient-detail/patient-detail.routes').then(
        m => m.patientDetailRoutes
    ),
  }
];
