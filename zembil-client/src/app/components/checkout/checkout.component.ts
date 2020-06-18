import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: []
})
export class CheckoutComponent implements OnInit {

  constructor(private router:Router, private addressService: AddressService) { }
  billing="billing"
  shipping="shipping"
  ngOnInit(): void {
    let order = JSON.parse(localStorage.getItem('order'))
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user._id);
    
    this.addressService.getAddress(user._id,this.billing).subscribe(res=>{
      console.log(res);   
    })
    this.addressService.getAddress(user._id,this.shipping).subscribe(res=>{
   console.log(res);   
     })
  }
  placeOrder(){
    // after successfull insertion into order and make payment will navigate to summary
    this.router.navigate(['users','user-dashbord','order-summary'])
  }
}
