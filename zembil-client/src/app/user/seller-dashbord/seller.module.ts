import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductListComponent,NewProductComponent],
  imports: [
    SellerRoutingModule,
    CommonModule,
    MaterialModule,ReactiveFormsModule
  ]
})
export class SellerModule { }
