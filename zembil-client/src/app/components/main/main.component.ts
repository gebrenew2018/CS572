import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {
  items: Object[];
  products: any;
  itemss: Object[];
  trending = "New"
  userid;
  constructor(private tost:ToastrService, private router: Router, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.loadAllProducts().subscribe(res => {
      console.log(res);
      this.products = res;
      this.itemss = this.products.products;
      console.log(this.itemss);
    });
  }
  getDetails(item){
    localStorage.setItem('item',JSON.stringify(item));
    this.router.navigate(['product-detail'])
  }
  addTocart(item) {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/users/signin');
      this.tost.error('Please Login first for online shopping.',
      'Zembil Online shopping')
    } else {
      let user = JSON.parse(localStorage.getItem('user'));
      this.userid = user._id;
      this.productService.addToCart(this.userid, item).subscribe((res:any) => {
        console.log(res.message);
        this.tost.success('Item Successfully added to cart.',
        'Zembil Online shopping')
      });
    }
  }

}
