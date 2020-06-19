import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CreditService } from 'src/app/services/credit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  
  userId;
  
  constructor(private router:Router,private route: ActivatedRoute, public creditService: CreditService) {
    
    let user = JSON.parse(localStorage.getItem('user'));
    this.userId = user._id;
   }

  ngOnInit(): void {
  }
  onSubmit(creditForm){
   
    if(this.userId){
          this.creditService.postCredit(this.userId,creditForm.value).subscribe(res=>{
            this.router.navigate(['users','user-dashbord','all-products'])  
              })
            }
    else{
      this.router.navigate(['users','signin'])
    }
  }


}

