import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { User } from '../models/user.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  form:FormGroup = new FormGroup({
    $key : new FormControl(null),
    firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    lastName: new FormControl(''),
    email: new FormControl('',Validators.email),
    password: new FormControl(''),
    role: new FormControl(0)
  });
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})}
  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/users/register',user,this.noAuthHeader);
  }
  logInUser(credentials){
    return this.http.post(environment.apiBaseUrl+'/authenticate',credentials,this.noAuthHeader);
  }
  getUserDetails(){
    return this.http.get(environment.apiBaseUrl+'/details')
  }

  // helper methods 
  setToken(token: string){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
deleteToken(){
  localStorage.removeItem('token');
}
getUserpayload(){
  var token = this.getToken();
  if(token){
    var userpayload = atob(token.split('.')[1]);
    return JSON.parse(userpayload);
  }
  else
   return null;
}
isLoggedIn(){
  var payload = this.getUserpayload();
  if(payload){
    return payload.exp > Date.now() /1000;
  }
  else
  return false;
}
}
