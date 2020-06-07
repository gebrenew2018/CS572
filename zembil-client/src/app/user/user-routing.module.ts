
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth/auth.guard';

export const userRoutes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: 'register', component: RegistrationComponent },
            { path: 'login', component: LoginComponent },
            { path: 'details', component: UserDetailComponent, canActivate:[AuthGuard] }
        ]
    }
];

@NgModule({
imports:[
    RouterModule.forChild(userRoutes)
],
exports:[RouterModule]    
})
export class UserRoutingModule{}