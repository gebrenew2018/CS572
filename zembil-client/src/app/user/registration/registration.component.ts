import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm, Validators, FormControl, FormGroup } from '@angular/forms';
import { RolesModel } from 'src/@shop/lookup/lookupData';
import {ROLES} from 'src/@shop/const/consts';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {
  
  emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  serverErrorMessages: string;

  roless :Object[];
  roles : RolesModel[]=[];
  constructor(public userService: UserService, private router: Router) { }
  
  ngOnInit() {
    this.roless=[{Id:1, Description:'Seller'},
  {Id: 2, Description:'Buyer'}];
    this.initStaticData();
  }
initStaticData(){
let userRoles : RolesModel = new RolesModel();
ROLES.forEach(pair =>{
  userRoles={
    'Id':pair.Id.toString(),
    'Description':pair.Description
  };
  this.roles.push(userRoles);
})
}
  onSubmit(form) {
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log('Successfully saved!');
        this.router.navigateByUrl('/users/signin');
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>')
        }
        else {
          this.serverErrorMessages = 'Something went wrong. Please contact Admin.';
        }
      }
    );
  }

}
