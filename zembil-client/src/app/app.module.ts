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
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderStatusComponent } from './components/orders/order-status/order-status.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.intercepter';
import { CheckoutComponent } from './components/checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TopNavComponent,
    AddressComponent,
    PaymentComponent,
    OrdersComponent,
    OrderStatusComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },
    AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
