import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashbord',
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css'],
})
export class UserDashbordComponent implements OnInit {

  constructor(private toaster: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.toaster.info('Please Login first','Zembil Online');
      this.router.navigateByUrl('/users/signin');
    }
    else
    {
      this.router.navigate(['users','user-dashbord','all-products'])
    }
  }
  myOrders(){
    this.router.navigate(['users','user-dashbord','my-orders'])
  }
  shippingAddress(){
    this.router.navigate(['users','user-dashbord','shipping-address'],{ queryParams: { address: "shipping"} })
  }
  billingAddress(){
    this.router.navigate(['users','user-dashbord','billing-address'],{ queryParams: { address: "billing"} })
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/users/signin');
  }
}
