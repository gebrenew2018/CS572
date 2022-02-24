import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private http: HttpClient) { }
  creditForm: FormGroup = new FormGroup({
    cardNumber: new FormControl('',[Validators.required]),
    month: new FormControl('',[Validators.required]),
    cww: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.required]),
  });
  noAuthHeader ={headers: new HttpHeaders({NoAuth:'True'})}

  postCredit(userid:string,credit:any){
    console.log(credit)
    return this.http.post(environment.apiBaseUrl+'/credit-card/add/'+userid,credit,this.noAuthHeader);

  }
  getAddress(userid:string){
    return this.http.get(environment.apiBaseUrl+'/credit-card/'+userid+'/',this.noAuthHeader);
  }


}
