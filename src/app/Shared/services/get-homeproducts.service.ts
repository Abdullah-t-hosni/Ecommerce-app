import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetHomeproductsService {
  constructor(private httpClient: HttpClient) {}

  getHomeProducts(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`);
  }

  getDetails(productId: any): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  }
}
