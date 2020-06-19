import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private router:Router, private toaster: ToastrService ,private productService:ProductService) { 
    this.dataSource = new MatTableDataSource();
  }
orders:any;
dataSource: MatTableDataSource<any>;
displayedColumns: string[]=['orderId','items','totalPrice','orderedDate','status','actions'];
  ngOnInit(): void {
  
    let user =JSON.parse(localStorage.getItem('user'))
     this.productService.getOrders(user._id).subscribe(res=>{
      this.orders=res;    
      this.dataSource=this.orders; 
    })
  }

  onCancel(orderId){
    console.log(orderId);
    this.productService.cancelOrder(orderId).subscribe((res:any)=>{
      console.log(res);
      this.toaster.info(res.message,'Zembil Online')
      this.ngOnInit();
    })
  }

}
