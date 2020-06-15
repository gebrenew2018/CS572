import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
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
  
  onSubmit(form: NgForm) {
    this.userService.logInUser(form.value).subscribe(
      res => {
        console.log('Successfully Logged in!');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/users/details')
      },
      err => {
        this.serverErrorMsg = err.error.message;
        // if (err.status === 422) {
        //   // this.serverErrorMessages = err.error.join('<br/>')
        // }
        // else {
        //   // this.serverErrorMessages = 'Something went wrong. Please contact Admin.';
        // }
      }
    );
  }
}
