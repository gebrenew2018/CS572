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

  ngOnInit(): void {
  }
  onSubmit(productform){
    console.log(productform.value);    
    this.productService.postProduct(productform.value).subscribe(res=>{
      console.log(res);      
    })
  }
}
