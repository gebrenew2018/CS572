import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerListComponent } from './seller-list/seller-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [SellerListComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
