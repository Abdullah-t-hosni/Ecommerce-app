import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  logout(): void {
    localStorage.removeItem('eToken');
    this.router.navigate(['/login']);
  }

  saveUserData(): void {
    const encodeToken = localStorage.getItem('eToken');
    if (encodeToken) {
      const decodedToken = jwtDecode(encodeToken);
      this.userData.next(decodedToken);
    }
  }

  register(userData: Object): Observable<any> {
    return this.httpClient.post<any>('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
  }

  login(userData: Object): Observable<any> {
    return this.httpClient.post<any>('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
  }
}
