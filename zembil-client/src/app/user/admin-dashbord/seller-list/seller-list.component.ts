import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: []
})
export class SellerListComponent implements OnInit {
  
  constructor(private toster: ToastrService, public userService:UserService, private router: Router) {
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
    if(!this.userService.isLoggedIn()){
      this.toster.info('Please Login first','Zembil Online');
      this.router.navigateByUrl('/users/signin');
    }
   this.refreshList();
  }
  refreshList() {
    this.userService.getAllUsers().subscribe(res=>{
      this.users = res;
      this.dataSource = this.users.user ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })  }
    approve(elem){
    this.userService.approveSeller(elem._id,elem).subscribe(res=>{
      this.toster.info('Seller Approved Successfully.','Zembil Online');
      this.refreshList();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
