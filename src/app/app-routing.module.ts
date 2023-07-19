import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginIncentivosComponent } from './components/m-incentivos/login-incentivos/login-incentivos.component';
import { IncentivosComponent } from './components/m-incentivos/incentivos/incentivos.component';



const routes: Routes = [
  { path: 'incentivosLogin', component: LoginIncentivosComponent },
  { path: 'incentivos', component: IncentivosComponent },
  { path: '', redirectTo: '/incentivosLogin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
