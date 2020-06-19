import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { User } from '../models/user.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { USER_STATUS } from 'src/@shop/const/consts';
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
    telephone: new FormControl('',[Validators.maxLength(12)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl(0)
  });
  
  loginForm:FormGroup = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl('', Validators.required)
  })
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})}
  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/users/register',user,this.noAuthHeader);
  }
  logInUser(credentials){    
    return this.http.post(environment.apiBaseUrl+'/users/authenticate',credentials,this.noAuthHeader);
  }
  getUserDetails(){
    return this.http.get(environment.apiBaseUrl+'/users/details')
  }
  getAllUsers(){
    return this.http.get(environment.apiBaseUrl+'/users/3/New')
  }
  approveSeller(userId:string,user:any){
    return this.http.post(environment.apiBaseUrl+'/users/'+userId+'/Active',user)
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
  localStorage.removeItem('user');
  localStorage.removeItem('order');
  localStorage.removeItem('item');
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
