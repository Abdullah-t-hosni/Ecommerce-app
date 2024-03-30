import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth/';

  constructor(private httpClient: HttpClient) { }

  forgotPassword(userEmail: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}forgotPasswords`, userEmail);
  }

  resetcode(resetCode: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}verifyResetCode`, resetCode);
  }

  resetPassword(resetPasswordForm: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}resetPassword`, resetPasswordForm);
  }
}
