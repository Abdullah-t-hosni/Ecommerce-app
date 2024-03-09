import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  myToken: any = { token: localStorage.getItem('eToken'),};

  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);
  cartId: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private _HttpClient: HttpClient) {
    this.getUserCart().subscribe({
      next: (response) => {
        this.numOfCartItems.next(response.numOfCartItems);
        this.cartId.next(response.data._id);
      },
    });
  }




  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: id },
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', );
  }

  removeItem(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    );}

  updateCartQuantity(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: count },
    );
  }

  generateOnlinePayment(cartId: string, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ecommerce-app-psi-coral.vercel.app`,
      { shippingAddress: shippingAddress },
    );
  }


  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: this.myToken,
      }

    );}
}
