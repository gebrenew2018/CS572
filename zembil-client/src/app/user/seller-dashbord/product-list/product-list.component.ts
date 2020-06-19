import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent implements OnInit{

  constructor(public productService:ProductService, private router: Router) { //,private toastr: ToastrService
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
    let user = JSON.parse(localStorage.getItem('user'))
    console.log("user:"+user._id);
    this.productService.loadProducts(user._id).subscribe(res=>{

      this.products = res;
      console.log(this.products);
      this.dataSource = this.products.products ;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    })
  }
  onEdit(product:Product){
    this.productService.selectedProduct = product;
    this.router.navigate(['users','seller-dashbord','edit-product']);
  }
  onDelete(product:Product){
    this.productService.deleteProduct(product._id).subscribe(res=>{
      if(res){
        console.log(res);
       // this.toastr.success('Hello world!', 'Toastr fun!');
      }
      else{
        console.log('item sold');
      }
    })
    this.router.navigate(['users','seller-dashbord','product-list']);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
