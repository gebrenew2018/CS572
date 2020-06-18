import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerRoutingModule } from './buyer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import {MatButtonModule} from '@angular/material/button';
import { CartComponent } from 'src/app/components/cart/cart.component';



@NgModule({
  declarations: [CartComponent],
  imports: [
    BuyerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatButtonModule
  ]
})
export class BuyerModule { }
