import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private sharedServiceService:SharedServiceService) { }


  getAllProducts(): Observable<any> {
    
    return this.httpClient.post<any>('https://us-central1-inventory-management-99999.cloudfunctions.net/invMgmt/getAllProducts',{
      headers:new HttpHeaders(
        {
          'Authorization' : `${localStorage.getItem('token')}`
        }
      )
    });
  }

  addProduct(product:Product): Observable<any>{
    return this.httpClient.post<any>('https://us-central1-inventory-management-99999.cloudfunctions.net/invMgmt/addProduct',{
      headers:new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization' : `${localStorage.getItem('token')}`
        }
      ),
      body: product
    });
  }

  getAllProductsByCategory(category: Product): Observable<any> {
    return this.httpClient.post<any>(`https://us-central1-inventory-management-99999.cloudfunctions.net/invMgmt/getProductByName`,{
      headers:new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization' : `${localStorage.getItem('token')}`
        }
      ),
      body: category
    });
  }

  deleteProduct(product: Product): Observable<any> {
    return this.httpClient.post<any>(`https://us-central1-inventory-management-99999.cloudfunctions.net/invMgmt/deleteProduct`,{
      headers:new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization' : `${localStorage.getItem('token')}`
        }
      ),
      body: product
    });
  }

  updateProduct(product:Product,productId: any): Observable<any>{
    product.id = productId;
    return this.httpClient.post<any>(`https://us-central1-inventory-management-99999.cloudfunctions.net/invMgmt/updateProduct`,{
      headers:new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization' : `${localStorage.getItem('token')}`
        }
      ),
      body: product
    });
  }

}
