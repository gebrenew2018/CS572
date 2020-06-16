import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserDashbordComponent } from './user-dashbord.component';
import { OrderListComponent } from 'src/app/components/orders/order-list/order-list.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { CartComponent } from 'src/app/components/cart/cart.component';

export const buyerRoutes : Routes=[
  {path:'',component:UserDashbordComponent,
children:[
  {path:'all-products',component:MainComponent},
  {path: 'my-orders',component:OrderListComponent },
  {path: 'cart',component:CartComponent }
]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(buyerRoutes)
  ]
})
export class BuyerRoutingModule { }
