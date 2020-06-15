import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { MainComponent } from '../main/main.component';

export const productRoutes: Routes = [
  {
      path: '', component: ProductComponent,
      children: [
          { path: 'register', component: ProductRegistrationComponent },
          { path: 'list', component: ProductListComponent },
          { path: 'details', component: ProductDetailComponent }
      ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ProductRoutingModule { }
