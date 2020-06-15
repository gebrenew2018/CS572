import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})}
productForm:FormGroup= new FormGroup({
  $key : new FormControl(null),
  productName: new FormControl('',Validators.required),
  unitPrice: new FormControl('',Validators.required),
  quantity: new FormControl('',Validators.required),
  category: new FormControl('',Validators.required),
  images: new FormControl('',Validators.required),
})
  loadProducts(){
    return this.http.get(environment.apiBaseUrl+'/products'); 
  }
  postProduct(product:Product):Observable<any>{
    console.log(product);
    return this.http.post(environment.apiBaseUrl+'/products/add-product',product);
  }
}
