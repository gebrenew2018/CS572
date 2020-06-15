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
        localStorage.setItem('user', res['user']);
        if(res['user'].role == 1 && (res['user'].status ==1 || res['user'].status ==2)){
          this.router.navigateByUrl('/users/admin-dashbord');
        } else if(res['user'].role == 2 && (res['user'].status ==1 || res['user'].status ==2)){
          this.router.navigateByUrl('/users/user-dashbord');
        }else if(res['user'].role == 3 &&  res['user'].status ==1){
          this.router.navigateByUrl('/users/seller-dashbord');
        }else if(res['user'].role == 4 && (res['user'].status ==1)){
          this.router.navigateByUrl('/users/delivery-dashbord');
        } else if(res['user'].status ==3 || res['user'].status ==4 || res['user'].status ==5){
          this.userService.deleteToken();
          this.router.navigateByUrl('/users/access-denied');
        }else{
          this.userService.deleteToken();
          this.router.navigateByUrl('/users/information');
        }    
      });
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/users/signin');
  }
}
