import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm, Validators, FormControl, FormGroup } from '@angular/forms';
  
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  serverErrorMessages: string;
  
  userRoles = [
    { id: 1, value: "Admin" },
    { id: 2, value: "Buyer" },
    { id: 3, value: "Seller" }
  ];
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log('Successfully saved!');
        this.resetForm(form);
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

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
