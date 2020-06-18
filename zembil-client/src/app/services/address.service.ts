import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }
  addressForm:FormGroup = new FormGroup({
    country: new FormControl('',[Validators.required, Validators.minLength(2)]),
    state: new FormControl('',[Validators.minLength(2)]),
    city: new FormControl('',[Validators.minLength(2)]),
    zip: new FormControl('',[Validators.required]),
    street: new FormControl('', Validators.required),
  });
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})}

  postAddress(userid:string,addressType:string,address:any){
    return this.http.post(environment.apiBaseUrl+'/address/add/'+userid+'/'+addressType,address,this.noAuthHeader);
  }
}
