import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserDashbordComponent } from './user-dashbord.component';
import { OrderListComponent } from 'src/app/components/orders/order-list/order-list.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { OrderSummaryComponent } from 'src/app/components/order-summary/order-summary.component';
import { AddressComponent } from 'src/app/components/address/address.component';

export const buyerRoutes : Routes=[
  {path:'',component:UserDashbordComponent,
children:[
  {path:'all-products',component:MainComponent},
  {path: 'my-orders',component:OrderListComponent },
  {path: 'cart',component:CartComponent },
  {path:'checkout',component:CheckoutComponent},
  {path:'order-summary',component:OrderSummaryComponent},
  {path:'shipping-address',component:AddressComponent},
  {path:'billing-address',component:AddressComponent}
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
