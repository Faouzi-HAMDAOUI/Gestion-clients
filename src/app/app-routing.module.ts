import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientsComponent } from './components/add-clients/add-clients.component';
import { EditClientsComponent } from './components/edit-clients/edit-clients.component';
import { DtailsClientsComponent } from './components/dtails-clients/dtails-clients.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'client/add',
    component: AddClientsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'client/edit/:id',
    component: EditClientsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'client/:id',
    component: DtailsClientsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
