import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent implements OnInit{
  
  constructor(private toaster:ToastrService, private userService:UserService, public productService:ProductService, private router: Router,private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Product>;
  products:any;
  list:Product[];
  testArray:[];
  displayedColumns: string[]=['productName', 'unitPrice', 'quantity', 'category','isSold','actions'];
  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.toaster.info('Please Login first','Zembil Online');
      this.router.navigateByUrl('/users/signin');
    }else{
      let user = JSON.parse(localStorage.getItem('user'))
    console.log("user:"+user._id);    
    this.productService.loadProducts(user._id).subscribe(res=>{
      this.products = res;
      console.log(this.products);      
      this.dataSource = this.products.products ;
    })
    }
    
  }
  onEdit(product:Product){  
    this.productService.selectedProduct = product;
    this.router.navigate(['users','seller-dashbord','edit-product']);
  }
  onDelete(product:Product){  
    this.productService.deleteProduct(product._id).subscribe(res=>{
      if(res){
        this.toaster.info('Item succcessfully deleted','Zembil Online');
        this.router.navigate(['users','seller-dashbord','product-list']);
      }
      else{
        this.toaster.info('Item is sold you cannot delete it','Zembil Online');
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
