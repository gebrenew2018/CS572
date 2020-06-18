import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {
  items: Object[];
  products:any;
  itemss:Object[];
  trending="New"
  userid;
  constructor(private router: Router,private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.loadAllProducts().subscribe(res=>{
      console.log(res);
      this.products=res;
      this.itemss=this.products.products;   
      console.log(this.itemss);
         
    });
  }
  addTocart(item){
    let user = JSON.parse(localStorage.getItem('user'));
    this.userid = user._id;
    this.productService.addToCart(this.userid,item).subscribe(res=>{
      console.log(res);
    });
    // this.router.navigate(['users','user-dashbord','cart'],{queryParams:{_id:itemid}})
  }

}
