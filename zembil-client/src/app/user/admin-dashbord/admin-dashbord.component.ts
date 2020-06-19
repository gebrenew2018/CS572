import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: []
})
export class AdminDashbordComponent implements OnInit {

  constructor(private toster:ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.isLoggedIn()){
      this.toster.info('Please Login first','Zembil Online');
      this.router.navigateByUrl('/users/signin');
    }
  }
  loadUsers(){
    this.router.navigate(['users','admin-dashbord','sellers'])
  }
  onLogout(){
    this.userService.deleteToken();
    this.toster.info('Please Login first','Zembil Online');
    this.router.navigateByUrl('/users/signin');
  }
}
