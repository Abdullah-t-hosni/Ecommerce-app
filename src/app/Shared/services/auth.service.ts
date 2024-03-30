import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  UserData: BehaviorSubject<any | null> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient , private _Router: Router) {}

    logout():void {
      localStorage.removeItem('eToken');
      this._Router.navigate(['/login']);
    }

  saveUserData() {
    if (localStorage.getItem('eToken') != null) {
      let encodeToken:any = localStorage.getItem('eToken');
      let decodedToken = jwtDecode(encodeToken);
      this.UserData.next(decodedToken);
    }
  }

  setRegister(userData: Object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }

  setLogin(userData: Object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }


}
