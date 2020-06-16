import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashbordComponent } from './admin-dashbord.component';
import { SellerListComponent } from './seller-list/seller-list.component';


const adminRoutes:Routes = [
  {path:'',component:AdminDashbordComponent,
        children:[
          {path:'sellers',component:SellerListComponent}
        ]}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminRoutingModule { }
