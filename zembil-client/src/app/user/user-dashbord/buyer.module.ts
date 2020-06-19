import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerRoutingModule } from './buyer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import {MatButtonModule} from '@angular/material/button';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { OrderListComponent } from 'src/app/components/orders/order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [CartComponent,OrderListComponent],
  imports: [
    BuyerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class BuyerModule { }
