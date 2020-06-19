import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private toaster:ToastrService, public userService: UserService, private router: Router) { }
  model ={
    email :'',
    password:''
  };
  serverErrorMsg :string;
  emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/users/details');
  }
  onSubmit(form) {
    this.userService.logInUser(form.value).subscribe(
      res => {
        this.toaster.success('Welcome to Online shopping.','Zembil Online');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/users/details')
      },
      err => {
        this.toaster.error('Something went wrong. please try again or contact admin.','Zembil Online');
      }
    );
  }
  onSignUp(){
    this.router.navigate(['users','signup']);
  }
}
