
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserDashbordComponent } from './user-dashbord/user-dashbord.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { AccessDeniedComponent } from '../components/shared/access-denied/access-denied.component';
import { SellerDashbordComponent } from './seller-dashbord/seller-dashbord.component';
import { DeliveryDashbordComponent } from './delivery-dashbord/delivery-dashbord.component';
import { InformationComponent } from '../components/shared/information/information.component';


export const userRoutes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: 'signup', component: RegistrationComponent },
            { path: 'signin', component: LoginComponent },
            { path: 'details', component: UserDetailComponent, canActivate:[AuthGuard] },
            {path:'user-dashbord', loadChildren: () => import('./user-dashbord/buyer.module').then(m => m.BuyerModule) },
            {path:'admin-dashbord', loadChildren: () => import('./admin-dashbord/admin.module').then(m => m.AdminModule) },
            {path:'seller-dashbord', loadChildren: () => import('../user/seller-dashbord/seller.module').then(m => m.SellerModule) },
            {path:'delivery-dashbord',component:DeliveryDashbordComponent,canActivate:[AuthGuard]},
            {path: 'access-denied', component:AccessDeniedComponent},
            {path:'information',component:InformationComponent}
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