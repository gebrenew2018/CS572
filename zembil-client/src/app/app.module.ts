//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
// components  imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TopNavComponent } from './components/shared/top-nav/top-nav.component';

// import routes

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressComponent } from './components/address/address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderStatusComponent } from './components/orders/order-status/order-status.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.intercepter';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AccessDeniedComponent } from './components/shared/access-denied/access-denied.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { InformationComponent } from './components/shared/information/information.component';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from './services/product.service';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreditsComponent } from './components/credits/credits.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TopNavComponent,
    AddressComponent,
    OrdersComponent,
    OrderStatusComponent,
    CheckoutComponent,
    AccessDeniedComponent,
    PageNotFoundComponent,
    InformationComponent,
    OrderSummaryComponent,
    CreditsComponent
  ],
  imports: [

  BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
    ToastrModule.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },
    AuthGuard,UserService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
