import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: []
})
export class NewProductComponent implements OnInit {

  constructor(public productService:ProductService,private router:Router) { }
   user;

  ngOnInit(): void {
    if (localStorage.length > 0) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.router.navigate(['users','signin'])
    }
  }
  onSubmit(productform){
    this.productService.postProduct(productform.value).subscribe(res=>{
      console.log(res);      
      this.router.navigate(['users','seller-dashbord','product-list'])
    })
  }
 
}
