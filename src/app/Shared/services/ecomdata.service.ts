import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`)
      .pipe(
        catchError(error => {
          // Handle error here
          console.error('Error fetching all products:', error);
          throw error; // Rethrow the error or return a default value
        })
      );
  }

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .pipe(
        catchError(error => {
          // Handle error here
          console.error('Error fetching product details:', error);
          throw error; // Rethrow the error or return a default value
        })
      );
  }

  getCategories(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
      .pipe(
        catchError(error => {
          // Handle error here
          console.error('Error fetching categories:', error);
          throw error; // Rethrow the error or return a default value
        })
      );
  }

  getBrands(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
      .pipe(
        catchError(error => {
          // Handle error here
          console.error('Error fetching brands:', error);
          throw error; // Rethrow the error or return a default value
        })
      );
  }

  getSpecificCategory(category: string | null): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${category}`)
      .pipe(
        catchError(error => {
          // Handle error here
          console.error('Error fetching specific category:', error);
          throw error; // Rethrow the error or return a default value
        })
      );
  }
}
