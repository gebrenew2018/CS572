import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-dashbord',
  templateUrl: './seller-dashbord.component.html',
  styleUrls: []
})
export class SellerDashbordComponent implements OnInit {

  constructor(private userService: UserService,
               private router: Router,
               private productService: ProductService) { }

  ngOnInit(): void {
  }
  loadProducts(){
    this.router.navigateByUrl('/users/seller-dashbord/product-list');
  }
  addProduct(){
    this.router.navigateByUrl('/users/seller-dashbord/add-product');
  }
  gotoOrders(){
    this.router.navigateByUrl('/users/seller-dashbord/order-list');
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/users/signin');
  }
}
