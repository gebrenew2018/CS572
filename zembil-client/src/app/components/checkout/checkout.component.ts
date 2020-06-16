import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: []
})
export class CheckoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  placeOrder(){
    // after successfull insertion into order and make payment will navigate to summary
    this.router.navigate(['users','user-dashbord','order-summary'])
  }
}
