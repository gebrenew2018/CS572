import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: []
})
export class AdminDashbordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  loadUsers(){
    this.router.navigate(['users','admin-dashbord','sellers'])
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/users/signin');
  }
}
