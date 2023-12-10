import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';
import { SuccessfulDialogComponent } from '../successful-dialog/successful-dialog.component';
import { UnSuccessfulDialogComponent } from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product:Product  = new Product();
   
  successMessage:string ="";
  errMessage: string ="";

  constructor(private productService: ProductService, private dialog:MatDialog, private sharedServices:SharedServiceService) { 
  }

  ngOnInit(): void {

    this.product=this.sharedServices.getProduct();
  }

  
  updateProductForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    stock: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get name(){
    return this.updateProductForm.get('name');
  }

  get stock(){
    return this.updateProductForm.get('stock');
  }

  get price(){
    return this.updateProductForm.get('price');
  }

  get description(){
    return this.updateProductForm.get('description');
  }

  updateProduct(){

    this.product.name=this.name?.value;
    this.product.stock=this.stock?.value;
    this.product.price=this.price?.value;
    this.product.description=this.description?.value;

    

    if(this.product.id=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Id is required";
    }
    else if(this.product.name=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Name is required";
    }
    else if(this.product.price == null || this.product.price==0)
    {
      this.errMessage="Product could not be Added to the catalog : Product price is required";
    }
    else if(this.product.stock==0 || this.product.stock==null)
    {
      this.errMessage="Product could not be Added to the catalog : Product Units can not be 0";
    }
    else if(this.product.description=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Description is required";
    }
    else{
      this.productService.updateProduct(this.product, this.product.id).subscribe(data => {

        if(data)
        {
          this.openSuccessfulDialog();
        }
        else{
          this.openunSuccessfulDialog();
        }
        
      });

    }

  }
   
  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successfull");
    this.sharedServices.setdialogcontent("Product Updated Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openunSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessfull");
    this.sharedServices.setdialogcontent("Product could not be Updated !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

}
