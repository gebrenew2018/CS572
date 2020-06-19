import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import{AddressModel} from '../../models/address.model'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: []
})
export class CheckoutComponent implements OnInit {
  constructor(private router:Router, private addressService: AddressService,private productService:ProductService) { }
  billing="billing"
  shipping="shipping"
  shAddress :any;
  biAddress :any;
  Shippingaddress:AddressModel;
  BillingAddress :AddressModel;
  user;
  order;
  totalPrice;
  shippingCharge:number=0;
  tax:number=0;
  ngOnInit(): void {
this.totalPrice=JSON.parse(localStorage.getItem('total'))
    this.order = JSON.parse(localStorage.getItem('order'))
    this.user = JSON.parse(localStorage.getItem('user'))
    this.addressService.getAddress(this.user._id,this.billing).subscribe((res:any)=>{
      this.biAddress=res.address;
      let billing =JSON.stringify(this.biAddress[0]);
      let BillingAddress = JSON.parse(billing);

      console.log('json',billing);
      console.log(BillingAddress);
    })
    this.addressService.getAddress(this.user._id,this.shipping).subscribe((res:any)=>{
      this.shAddress=res.address;
      console.log(this.shAddress[0]);
         })
  }
  placeOrder(){

    console.log(this.order);
    console.log(this.user);
    this.productService.postOrder(this.user._id,this.order).subscribe((res:any)=>{
      console.log(res);
    })
    // after successfull insertion into order and make payment will navigate to summary
    this.router.navigate(['users','user-dashbord','order-summary'])
  }
}
