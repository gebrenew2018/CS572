import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Product>;
  products:any;
  constructor(private prductService:ProductService) {
    this.dataSource = new MatTableDataSource();
  }

  displayedColumns: ['productName', 'unitPrice', 'quantity', 'category','isSold'];
  ngOnInit() {
    this.prductService.loadProducts().subscribe(res=>{
      this.products = res;
      this.dataSource.data = this.products;
      console.log(this.dataSource.data);
      
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
