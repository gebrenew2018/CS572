import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
// material modules


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
    imports: [UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule

],
    exports: [],
    declarations: [
        RegistrationComponent,
        UserComponent,
        UserDetailComponent,
        LoginComponent,
        CartComponent],
    providers: [],
})
export class UserModule { }
