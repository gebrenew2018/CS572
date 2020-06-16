import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: []
})
export class SellerListComponent implements OnInit {
  
  constructor(public userService:UserService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User>;
  products:any;
  list:User[];
  testArray:[];
  displayedColumns: string[]=['firstName', 'lastName', 'role', 'email','status','actions'];
  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=>{
      this.products = res;
      this.dataSource = this.products.products ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  // onEdit(product:Product){  
  //   this.productService.selectedProduct = product;
  //   this.router.navigate(['users','seller-dashbord','edit-product']);
  // }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
