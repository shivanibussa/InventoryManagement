import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-get-product-by-category',
  templateUrl: './get-product-by-category.component.html',
  styleUrls: ['./get-product-by-category.component.css']
})
export class GetProductByCategoryComponent implements OnInit {

  productList:any;
  product: Product = new Product();
  key:any="";
  headers = ["Id", "Product Name", "Product Description", "Price", "Units"];


  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    
  }

  
  categoryForm=new FormGroup({
    
    category: new FormControl('',[Validators.required])
  })

  get category(){
    return this.categoryForm.get('category');
  }

  getProductByCategory(){

    this.product.name=this.category?.value;

    this.productService.getAllProductsByCategory(this.product).subscribe(data => {
      this.productList = data.data;
    });

  }


}
