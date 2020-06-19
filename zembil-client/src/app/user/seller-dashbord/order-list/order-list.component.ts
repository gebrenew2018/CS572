import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { Form, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: []
})
export class OrderListComponent implements OnInit {

  constructor(private productService:ProductService) { 
    this.dataSource = new MatTableDataSource();
  }
  form:FormGroup;
orders:any;
dataSource: MatTableDataSource<any>;
displayedColumns: string[]=['orderId','items','totalPrice','orderedDate','status','actions'];
  ngOnInit(): void {
  
    let user =JSON.parse(localStorage.getItem('user'))
     this.productService.getSellersOrders().subscribe(res=>{
      this.orders=res;    
     console.log( this.orders.length);
      this.dataSource=this.orders; 
      
    })
    this.form = new FormGroup({
      orderid:new FormControl(''),
      status: new FormControl('')
    })
  }
  onCancel(orderId){
    console.log(orderId);
    this.productService.cancelOrder(orderId).subscribe(res=>{
      console.log(res);
      
    })
  }
  changeOrderStatus(form){
    console.log(form.value);
    // this.productService.changeStatus(id)
  }
}