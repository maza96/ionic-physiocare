import { Routes } from '@angular/router';

export const patientDetailRoutes: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      import('./person-info/person-info.page').then(
        (m) => m.PersonInfoPage
      ),
  },
  {
    path: 'location',
    loadComponent: () => import('./patient-location/patient-location.page').then(
        m => m.PatientLocationPage
    ),
  },
  {
    path: 'record',
    loadComponent: () => import('./patient-record/patient-record.page').then(
        m => m.PatientRecordPage
    ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info',
  },
];
