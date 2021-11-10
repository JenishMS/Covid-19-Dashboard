import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EconomyComponent } from './components/economy/economy.component';
import { UserCountryComponent } from './components/user-country/user-country.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { AppResolver } from './services/app.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: [AppResolver],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'country',
        component: UserCountryComponent
      },
      {
        path: 'economy',
        component: EconomyComponent
      },
      {
        path: 'vaccine',
        component: VaccineComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
