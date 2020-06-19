import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { Form, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: []
})
export class OrderListComponent implements OnInit {

  constructor(private toaster:ToastrService, private userService:UserService, private router: Router, private productService:ProductService) { 
    this.dataSource = new MatTableDataSource();
  }
  form:FormGroup;
orders:any;
dataSource: MatTableDataSource<any>;
displayedColumns: string[]=['orderId','items','totalPrice','orderedDate','status','actions'];
  ngOnInit(): void {
    if(!this.userService.isLoggedIn()){
      this.toaster.info('Please Login first','Zembil Online');
      this.router.navigateByUrl('/users/signin');
    } else{let user =JSON.parse(localStorage.getItem('user'))
     this.displayOrders();
    this.form = new FormGroup({
      status: new FormControl('')
    })}
    
  }
  displayOrders() {
    this.productService.getSellersOrders().subscribe(res=>{
      this.orders=res;    
      this.dataSource=this.orders; 
      
    })  }
  onCancel(orderId){
    console.log(orderId);
    this.productService.cancelOrder(orderId).subscribe(res=>{
      if(res){
      this.toaster.success('Order Successfully cancelled','Zembil Online');
        this.displayOrders();
    }else{
        this.toaster.warning('Something went wrong inside server. please try again','Zembil Online');
      }
      
    })
  }
  changeOrderStatus(form){
    console.log(form.value);
    this.productService.changeStatus(form.value).subscribe(res=>{
      console.log('status',res);      
    })
  }
}