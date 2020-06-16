import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SellerDashbordComponent } from './seller-dashbord.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderListComponent } from './order-list/order-list.component';

export const sellerRoutes:Routes = [
  {path:'',component:SellerDashbordComponent,
        children:[
          {path:'add-product',component:NewProductComponent},
          {path:'product-list',component:ProductListComponent},
          {path:'edit-product',component:EditProductComponent},
          {path:'order-list',component:OrderListComponent}
        ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(sellerRoutes)
  ]
})
export class SellerRoutingModule { }
