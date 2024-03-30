import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly apiUrl = 'https://ecommerce.routemisr.com/api/v1/orders';
  private readonly tokenHeader = 'token';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set(this.tokenHeader, this.cartService.myToken);
  }

  public getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  public getSingleOrderDetails(id: string | null): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
