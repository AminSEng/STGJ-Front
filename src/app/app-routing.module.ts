import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from './tracks/customers.component';
import {ProductsComponent} from './drivers/products.component';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  {path : 'products', component: ProductsComponent},
  {path : 'tracks', component: CustomersComponent},

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'customers', component: CustomersComponent },
      // add other navbar pages here
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
