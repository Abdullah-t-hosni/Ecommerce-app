import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {


  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  numOfWishItems: BehaviorSubject<number> = new BehaviorSubject(0);
  wishId: BehaviorSubject<string> = new BehaviorSubject('');



  constructor(private _HttpClient: HttpClient) {
    
    this.getWishList().subscribe({
      next: (response) => {
        this.numOfWishItems.next(response.numOfWishItems);
        this.wishId.next(response.data._id);

      },
    });
  }

  addToWishList(id: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist`, { productId: id });
  }

  getWishList(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`);
  }

  removeFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`);
  }


}
