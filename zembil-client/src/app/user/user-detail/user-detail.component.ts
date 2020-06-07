import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userDetails;
  first:string;
  last:string;
  email: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserDetails().subscribe(
      res => {
        this.userDetails = res['user'];
        this.first=this.userDetails.firstName;
        this.last=this.userDetails.lastName;
        this.email=this.userDetails.email;       
        
      });
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/users/login');
  }
}
