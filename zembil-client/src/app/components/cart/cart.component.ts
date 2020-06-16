import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {
  items: Object[];
  id;
  constructor(private userService:UserService,private router:Router, private route: ActivatedRoute) {
    route.queryParams.subscribe( params => { this.id = params['_id']; });
   }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
    this.router.navigateByUrl('/users/signin');
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
checkout(){
  this.router.navigate(['users','user-dashbord','checkout']);
}
}
