import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './tracks/customers.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductsComponent} from './drivers/products.component';
import { NgModule } from '@angular/core';
import {AddDriverFormComponent} from './add-driver-form/add-driver-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AssignTrajetComponent } from './assign-trajet/assign-trajet.component';
import { ViewPassengersComponent } from './view-passengers/view-passengers.component';
import { PassengerDashboardComponent } from './passenger-dashboard/passenger-dashboard.component';
import { AddTrackFormComponent } from './add-track-form/add-track-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ProductsComponent,
    CustomersComponent,
    AddDriverFormComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    AssignTrajetComponent,
    ViewPassengersComponent,
    PassengerDashboardComponent,
    AddTrackFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
