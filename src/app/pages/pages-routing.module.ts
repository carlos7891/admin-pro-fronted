import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchsComponent } from './searchs/searchs.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[ AuthGuard ],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title:'Dashboard' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title:'Progress' }
      },
      {
        path: 'graph1',
        component: Graph1Component,
        data: { title:'Graph' }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title:'Account settings' }
      },
      {
        path: 'promise',
        component: PromiseComponent,
        data: { title:'Promise' }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title:'Rxjs' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title:'User Profile' }
      },
      {
        path: 'search/:term',
        component: SearchsComponent,
        data: { title:'Search' }
      },

      //Maintenance
      {
        path: 'users',
        canActivate: [ AdminGuard ],
        component: UsersComponent,
        data: { title:'Users' }
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title:'Hospitals' }
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title:'Doctors' }
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title:'Doctor' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
