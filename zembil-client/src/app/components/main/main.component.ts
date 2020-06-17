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
  constructor(private router: Router,private productService: ProductService) { }

  ngOnInit(): void {
    
    // this.items = [{
    //   itemid: 1,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$23.0"
    // },
    // {
    //   itemid: 2,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/sm1.jpg",
    //   itemImage2: "../../../assets/img/sm2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$24.0"
    // },
    // {
    //   itemid: 3,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$55.0"
    // },
    // {
    //   itemid: 4,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$76.0"
    // },
    // {
    //   itemid: 5,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$34.0"
    // },
    // {
    //   itemid: 6,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$453.0"
    // },
    // {
    //   itemid: 7,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$345.0"
    // },
    // {
    //   itemid: 8,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$455.0"
    // },
    // {
    //   itemid: 9,
    //   trending:"Trending",
    //   itemImage1: "../../../assets/img/i1.jpg",
    //   itemImage2: "../../../assets/img/i2.jpg",
    //   itemname: "i-Phone 11 pro",
    //   itemprice: "$241.0"
    // }]
    this.productService.loadAllProducts().subscribe(res=>{
      console.log(res);
      this.products=res;
      console.log(this.products.products);
      this.itemss=this.products.products;
      console.log(this.itemss);
      
    });
  }
  addTocart(item){
    let cart = JSON.stringify(localStorage.getItem('mycart'))
    if(cart == null){
      localStorage.setItem('mycart',item); 
    }
    else{
      let obj = JSON.parse(cart);
      console.log(obj);   
    }
    // let cart = {
    //   _id :item._id,
    //   productName:item.productName,
    //   unitPrice:item.unitPrice,
    //   quantity:1
    // }

    // console.log(cart);
    // this.router.navigate(['users','user-dashbord','cart'],{queryParams:{_id:itemid}})
  }

}
