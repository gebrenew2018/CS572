import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import {NgxPaginationModule} from 'ngx-pagination'
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: []
})
export class OrderSummaryComponent implements OnInit {
ordno;
totalCharged;
orderDate;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.ordno="2345678";
    this.totalCharged="150"
    this.orderDate="6/18/2020"


  }

  goToHome(){
    this.router.navigate(['users','user-dashbord','all-products'])
  }

  Print(myForm){
    console.log(myForm);
    console.log('value is',myForm.value);
  }

  download(){
    var element = document.getElementById('target')
    html2canvas(element).then((canvas)=>{
      console.log(canvas)
      var imgData=canvas.toDataURL('img/png')
      var doc = new jspdf()
      var imgHeight = canvas.height*208/canvas.width;
      doc.addImage(imgData,0,0,208,imgHeight)
      doc.save('image.pdf')
    })

  }

}
