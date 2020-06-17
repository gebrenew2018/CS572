import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerRoutingModule } from './buyer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    BuyerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatButtonModule
  ]
})
export class BuyerModule { }
