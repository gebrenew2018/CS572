import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerListComponent } from './seller-list/seller-list.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [SellerListComponent],
  imports: [
    AdminRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
