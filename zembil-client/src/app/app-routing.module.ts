import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './user/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'product-detail',component:ProductDetailComponent},
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  // { path: 'products',  }
  // { path: 'users', loadChildren: './user/user.module#UserModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
