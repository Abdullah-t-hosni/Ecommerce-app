import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private httpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/brands');
  }

  getSpecificBrand(brandID: string | null): Observable<any> {
    return this.httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/brands/${brandID}`);
  }
}
