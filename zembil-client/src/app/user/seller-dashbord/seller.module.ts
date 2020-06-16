import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderListComponent } from './order-list/order-list.component';



@NgModule({
  declarations: [ProductListComponent,NewProductComponent, EditProductComponent, OrderListComponent],
  imports: [
    SellerRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class SellerModule { }
