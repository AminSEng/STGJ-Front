import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from './tracks/customers.component';
import {ProductsComponent} from './drivers/products.component';
import {LayoutComponent} from './layout/layout.component';
import {AddDriverFormComponent} from './add-driver-form/add-driver-form.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AssignTrajetComponent} from './assign-trajet/assign-trajet.component';
import {ViewPassengersComponent} from './view-passengers/view-passengers.component';
import {AddTrackFormComponent} from './add-track-form/add-track-form.component';
import {PassengerDashboardComponent} from './passenger-dashboard/passenger-dashboard.component';


const routes: Routes = [
  {path : 'products', component: ProductsComponent},
  {path : 'tracks', component: CustomersComponent},
  {path :'add-driver', component: AddDriverFormComponent},
  {path : 'login', component: LoginComponent},
  {path : 'register',component: RegisterComponent},
  {path : 'admin-dashboard',component: AdminDashboardComponent},
  {path : 'assign-trajet', component: AssignTrajetComponent},
  {path : 'view-passengers', component: ViewPassengersComponent},
  {path: 'add-track', component: AddTrackFormComponent},
  {path: 'passenger-dashboard',component: PassengerDashboardComponent},


  {
    path: '',
    component: LoginComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
