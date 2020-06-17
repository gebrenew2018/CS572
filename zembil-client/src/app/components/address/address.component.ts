import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
address;
userid;
constructor(private router:Router,private route: ActivatedRoute, public addressService: AddressService) {
    route.queryParams.subscribe(params=>{this.address=params['address']});
    let user = JSON.parse(localStorage.getItem('user'));
    this.userid = user._id;
   }

  ngOnInit(): void {

  }

  onSubmit(addressForm){
   
    if(this.address && this.userid){
          this.addressService.postAddress(this.userid,this.address,addressForm.value).subscribe(res=>{
            this.router.navigate(['users','user-dashbord','all-products'])  
              })
            }
    else{
      this.router.navigate(['users','signin'])
    }
  }
}
