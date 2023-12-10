import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();
  
  successMessage:string ="";
  errMessage: string ="";

  constructor(private productService:ProductService, private sharedServiceService:SharedServiceService) { 

  }


  ngOnInit(): void {
  }

  addProductForm=new FormGroup({
    
    id:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    stock: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get id(){
    return this.addProductForm.get('id');
  }

  get name(){
    return this.addProductForm.get('name');
  }

  get stock(){
    return this.addProductForm.get('stock');
  }

  get price(){
    return this.addProductForm.get('price');
  }

  get description(){
    return this.addProductForm.get('description');
  }

  addProduct(){

    this.product.id=this.id?.value;
    this.product.name=this.name?.value;
    this.product.stock=this.stock?.value;
    this.product.price=this.price?.value;
    this.product.description=this.description?.value;

    console.log(this.product);


  if(this.product.name=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Name is required";
    }
    else if(this.product.price==0 || this.product.price==null)
    {
      this.errMessage="Product could not be Added to the catalog : Product Price is required";
    }
    else if(this.product.stock==0  || this.product.stock==null)
    {
      this.errMessage="Product could not be Added to the catalog : Product Units can not be 0";
    }
    else if(this.product.description=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Description is required";
    }
    else{

      this.productService.addProduct(this.product).subscribe(data => {
       
        if(data)
        {
            this.errMessage="";
            this.successMessage="Product successfully added to the catalog";
        }
        else{
          this.successMessage="";
          this.errMessage="Product could not be Added to the catalog : Check Specification of your product";
        }
  
      })

    }

   
  }


}
