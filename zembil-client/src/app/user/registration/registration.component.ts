import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm, Validators, FormControl, FormGroup } from '@angular/forms';
import { RolesModel } from 'src/@shop/lookup/lookupData';
import {ROLES} from 'src/@shop/const/consts';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {
  
  emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  serverErrorMessages: string;

  constructor(private toster: ToastrService, public userService: UserService, private router: Router) { }
  
  ngOnInit() {
  }

  onSubmit(form:any) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.toster.info('Please Login first','Zembil Online');
        this.router.navigateByUrl('/users/signin');
      },
      err => {
        this.toster.error('Something went wrong with the server. Please try again. or contact admin','Zembil Online');
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
