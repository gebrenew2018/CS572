import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {
  items: Object[];
  serverErrorMessages: string;
 cart:any;



  constructor(private cartService:CartService, private router: ActivatedRoute) { }

  ngOnInit(): void {
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
    },
    {
      itemid: 3,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$55.0"
    },
    {
      itemid: 4,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$76.0"
    },
    {
      itemid: 5,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$34.0"
    },
    {
      itemid: 6,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$453.0"
    },
    {
      itemid: 7,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$345.0"
    },
    {
      itemid: 8,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$455.0"
    },
    {
      itemid: 9,
      trending:"Trending",
      itemImage1: "../../../assets/img/i1.jpg",
      itemImage2: "../../../assets/img/i2.jpg",
      itemname: "i-Phone 11 pro",
      itemprice: "$241.0"
    }]
  }
  addTocart(itemid:any){
    console.log(itemid);
    itemid='5ee4f44cd97c00047ef2bd48';
  const cart=  this.cartService.addToCart(itemid).subscribe(res=>{

      console.log(res);

    });

   // this.router.navigate(['users','user-dashbord','cart'],{queryParams:{_id:itemid}})

  }

}
