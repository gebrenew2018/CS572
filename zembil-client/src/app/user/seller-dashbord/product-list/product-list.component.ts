import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent implements OnInit{
  
  constructor(public productService:ProductService, private router: Router) {
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
    this.productService.loadProducts().subscribe(res=>{
      this.products = res;
      this.dataSource = this.products.products ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  onEdit(product:Product){  
    this.productService.selectedProduct = product;
    this.router.navigate(['users','seller-dashbord','edit-product']);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
