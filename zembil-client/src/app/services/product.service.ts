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
  products:Product[]=[];
  constructor(private http: HttpClient) { }
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})}
  selectedProduct:Product;
productForm:FormGroup= new FormGroup({
  _id : new FormControl(null),
  productName: new FormControl('',Validators.required),
  unitPrice: new FormControl('',Validators.required),
  quantity: new FormControl('',Validators.required),
  category: new FormControl('',Validators.required),
  imageUrl: new FormControl('',Validators.required),
})
  loadProducts(userid:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.apiBaseUrl+'/products/'+userid); 
  }
  loadAllProducts(){
    return this.http.get(environment.apiBaseUrl+'/products'); 
  }
  postProduct(userid:string, product:any){ 
    return this.http.post(environment.apiBaseUrl+'/products/add-product/'+userid,product);
  } 
  updateProduct(product:Product){
    return this.http.put(environment.apiBaseUrl+'/products/update/'+product._id,product);
  }
  deleteProduct(productid:string){
    return this.http.delete(environment.apiBaseUrl+'/products/delete/'+productid);
  }
}
