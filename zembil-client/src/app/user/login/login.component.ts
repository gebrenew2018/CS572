import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }
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
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/users/details')
      },
      err => {
        console.log('Error"'+err);
        this.serverErrorMsg = "";
      }
    );
  }
  onSignUp(){
    this.router.navigate(['users','signup']);
  }
}
