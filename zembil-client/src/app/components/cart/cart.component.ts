import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {
  items: Object[];
  id;
  fItem='me';
  constructor(private http:HttpClient, private cartService: CartService, private userService:UserService,private router:Router, private route: ActivatedRoute) {
    route.queryParams.subscribe( params => { this.id = params['_id']; });
   }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
    this.router.navigateByUrl('/users/signin');
   this.getAllCartItems();
    this.items = [{
      itemid: 1,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$23.0"
    },
    {
      itemid: 2,
      trending:"Trending",
      itemImage1: "../../../assets/img/sm1.jpg",
      itemImage2: "../../../assets/img/sm2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$24.0"
    }];
  }
  getAllCartItems() {
    this.cartService.getCartItems().subscribe(res=>{
      console.log(res);
    });

    }
checkout(){
  this.router.navigate(['users','user-dashbord','checkout']);
}
minusOne(id){

}
onChange(item){

}
addOne(productInOrder){

}
remove(item){

}
}
