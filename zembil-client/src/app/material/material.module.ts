import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from  '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule

  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
