import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {
total:any;
  cartItems:any;
  items:Array<any>;
  id;
  userid;
  sample:Array<any>;
  constructor(private userService:UserService,private productService:ProductService,private router:Router, private route: ActivatedRoute) {
    route.queryParams.subscribe( params => { this.id = params['_id']; });
   }

  ngOnInit() {
  //   this.sample =[
  //     {
  //     name:"gebrsdfsdfe",
  //     age:20
  //     },
  //     {
  //       name:"gesdfsdfbre",
  //       age:12
  //       },
  //       {
  //         name:"sdfsf",
  //         age:23
  //         },
  // ]
    if(!this.userService.isLoggedIn())
    this.router.navigateByUrl('/users/signin');
    let user = JSON.parse(localStorage.getItem('user'));
    this.userid = user._id;

    this.productService.getCart(this.userid).subscribe((res:any[])=>{
      console.log(res);
      this.cartItems=res;
      this.items=this.cartItems.cart;
      this.total=this.cartItems.total;
      console.log(this.cartItems);

      localStorage.setItem('order',JSON.stringify(this.cartItems.cart))
    })


  }
checkout(){
  this.router.navigate(['users','user-dashbord','checkout']);
}
removeFromCart(item){
  console.log(item);

  let user = JSON.parse(localStorage.getItem('user'));
  this.userid = user._id;
  this.productService.removeFromCart(this.userid,item).subscribe(res=>{
    console.log(res);
this.ngOnInit()
});
}
}
