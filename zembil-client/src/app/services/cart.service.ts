import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})}

  constructor(private http: HttpClient) { }


  addToCart(id: string) {
    console.log(id);
    const uid="78"
      return this.http.post(environment.apiBaseUrl+'/cart/add-to-cart/'+uid,id);
    }
  //  return this.http.post(environment.apiBaseUrl+'/cart/add-to-cart',id,this.noAuthHeader);
  // }
  getCartItems() :Observable<any>{
      return this.http.get(environment.apiBaseUrl+'/cart');
    }
}
