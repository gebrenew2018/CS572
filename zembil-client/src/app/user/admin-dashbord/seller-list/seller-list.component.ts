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
  users:any;
  list:User[];
  testArray:[];
  displayedColumns: string[]=['firstName', 'lastName', 'status','actions'];
  ngOnInit() {
   this.refreshList();
  }
  refreshList() {
    this.userService.getAllUsers().subscribe(res=>{
      this.users = res;
      console.log(this.users.user);      
      this.dataSource = this.users.user ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })  }
    approve(elem){
      console.log('approved');
    console.log(elem._id);
    this.userService.approveSeller(elem._id,elem).subscribe(res=>{
      console.log(res);      
    });
    this.refreshList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
