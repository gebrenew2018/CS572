import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product;
reviews:any;
  reviewObjects:Object[];
  userid;
  commenter;
  constructor( private productService: ProductService) { }

  ngOnInit(){


    let item = JSON.parse(localStorage.getItem('item'));
    this.product=item;



// this.productService.getAllReviews(this.userid, this.product._id).subscribe(res => {
//   console.log(res);
//   this.reviews = res;
//   this.reviewObjects = this.reviews.review;
//   console.log(this.reviewObjects);
// });


}
addComment(val:string){
  let user = JSON.parse(localStorage.getItem('user'));
    this.commenter=user
    console.log(user);
    console.log(this.product);
  // this.productService.addComment(val,user._id,this.product._id).subscribe(res => {
  //   console.log(res);
  // });


  }

}
