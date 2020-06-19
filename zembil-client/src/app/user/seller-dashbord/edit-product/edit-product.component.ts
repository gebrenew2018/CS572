import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: []
})
export class EditProductComponent implements OnInit {

  images=[];
  editProductForm:FormGroup;
  constructor(private userService:UserService, private toaster:ToastrService, public productService:ProductService,private router:Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.toaster.info('Please Login first','Zembil Online');
      this.router.navigateByUrl('/users/signin');
    }
    else{
    // this.productService.productForm.setValue(this.productService.selectedProduct);
    this.initForm();  
  this.editProductForm.setValue({
    _id : this.productService.selectedProduct._id,
    productName: this.productService.selectedProduct.productName,
    unitPrice: this.productService.selectedProduct.unitPrice,
    quantity: this.productService.selectedProduct.quantity,
    category: '',
    imageUrl:this.productService.selectedProduct.imageUrl
})}
  } 
  initForm(){
    this.editProductForm= new FormGroup({
      _id : new FormControl(null),
      productName: new FormControl('',Validators.required),
      unitPrice: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      imageUrl: new FormControl('',Validators.required),
    })
  }
   selectImage(event){
     this.images=event.target.files;
     console.log(this.images);
  }
  onSubmit(productform){
    this.productService.updateProduct(productform.value).subscribe(res=>{
      this.toaster.success('Product Successfully Updated','Zembil Online');
      this.router.navigate(['users','seller-dashbord','product-list'])
    })
  }

}
